import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Merchi } from 'merchi_sdk_ts';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Controller } from 'react-hook-form';
import InputText from './InputText';
import {
  addressInOneLine,
  googlePlacesResultAsNewAddress,
} from '../utilities/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faTimes,
  faEdit,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Collapse } from '../components';
import { useCartContext } from '../CartProvider';

const merchi = new Merchi();

interface Suggestion {
  placeId: string;
  description: string;
  structuredFormatting: any;
  types: string[];
  matchedSubstrings: any[];
}

interface Props {
  defaultAddress?: any;
  labelGeoSuggest?: string;
  hookForm: any;
  name: string;
  placeholder?: string;
  updateAddress: (address: any) => void;
}

export function InputsAddress({
  defaultAddress = {},
  labelGeoSuggest = 'Address',
  hookForm,
  name,
  placeholder = 'Search your address',
  updateAddress,
}: Props) {
  const {
    classNameCartFormGroup,
    classNameCartFormInput,
    classNameCartRow,
    classNameCartRowColumn,
    classNameCartGoogleSuggestList,
    classNameCartGoogleSuggestListItem,
  } = useCartContext();

  const [inputValue, setInputValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const suggestionsRef = React.useRef<HTMLDivElement>(null);

  const {
    control,
    formState: { errors, isValid, submitCount },
    setValue,
    getValues,
    reset,
    watch,
  } = hookForm;
  const inputName = (_name: string) => `${name ? `${name}.` : ''}${_name}`;
  const selectedCountry = watch(inputName('country'));

  function onChangeCountryState() {
    const values = getValues();
    updateAddress(name ? values[name] : values);
  }

  const [addressFieldsOpen, setAddressFieldsOpen] = useState(false);
  const toggleAddressFieldsOpen = () => setAddressFieldsOpen(!addressFieldsOpen);

  useEffect(() => {
    if (!isValid && !addressFieldsOpen && submitCount > 0) {
      toggleAddressFieldsOpen();
    }
  }, [isValid, submitCount]);

  useEffect(() => {
    if (!defaultAddress?.lineOne) return;

    const nextAddress = { ...defaultAddress };
    setInputValue(addressInOneLine(nextAddress));
    reset(
      name
        ? { ...getValues(), [name]: nextAddress }
        : { ...getValues(), ...nextAddress },
      { keepSubmitCount: true },
    );
  }, [defaultAddress?.lineOne, defaultAddress?.city, defaultAddress?.postcode]);

  async function searchAddresses(query: string) {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const response = await merchi.authenticatedFetch('/addresses/place-search/', {
        method: 'GET',
        query: [['q', query]],
      });

      if (response.status === 'success') {
        setSuggestions(response.results || []);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Error searching addresses:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  }

  const debouncedSearch = useMemo(() => debounce(searchAddresses, 500), []);

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  }

  async function handleSuggestionSelect(suggestion: Suggestion) {
    function applyDescriptionOnly() {
      setInputValue(suggestion.description);
      updateAddress({
        city: '',
        country: '',
        lineOne: suggestion.description,
        lineTwo: '',
        postcode: '',
        state: '',
      });
    }

    setLoading(true);
    try {
      const response = await merchi.authenticatedFetch('/addresses/place-details/', {
        method: 'GET',
        query: [['place_id', suggestion.placeId]],
      });

      const parsedAddress = response.status === 'success'
        ? googlePlacesResultAsNewAddress(response.result)
        : null;

      if (parsedAddress) {
        setInputValue(addressInOneLine(parsedAddress));
        updateAddress(parsedAddress);
      } else {
        applyDescriptionOnly();
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      applyDescriptionOnly();
    } finally {
      setLoading(false);
      setShowSuggestions(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  }

  function handleInputBlur() {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 200);
  }

  function handleInputFocus() {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }

  function clearInput(e: React.MouseEvent) {
    e.preventDefault();
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    updateAddress({
      city: '',
      country: '',
      lineOne: '',
      lineTwo: '',
      postcode: '',
      state: '',
    });
  }

  const hasErrors = !!Object.keys(errors || {}).length;

  const addressForm = (
    <>
      <InputText
        control={control}
        label="Address line one"
        name={inputName('lineOne')}
        placeholder="123 Fake st"
        rules={{ required: 'Address line one is required.' }}
      />
      <InputText
        control={control}
        label="Continue address"
        name={inputName('lineTwo')}
        placeholder="Continue address..."
      />
      <div className={classNameCartRow}>
        <div className={classNameCartRowColumn}>
          <InputText
            control={control}
            label="City / Province"
            name={inputName('city')}
            placeholder="City"
            rules={{ required: 'City / Province is required.' }}
          />
        </div>
        <div className={classNameCartRowColumn}>
          <InputText
            control={control}
            label="Post / Zip code"
            name={inputName('postcode')}
            placeholder="90210"
          />
        </div>
      </div>
      <div className={classNameCartRow}>
        <div className={classNameCartRowColumn}>
          <div className={classNameCartFormGroup}>
            <label>Country</label>
            <Controller
              name={inputName('country')}
              control={control}
              defaultValue={defaultAddress && defaultAddress.country}
              render={({ field }: any) => (
                <CountryDropdown
                  {...field}
                  classes={classNameCartFormInput}
                  onChange={(val) => {
                    setValue(inputName('country'), val);
                    setValue(inputName('state'), '');
                    field.onChange(val);
                    onChangeCountryState();
                  }}
                  valueType="short"
                />
              )}
            />
          </div>
        </div>
        <div className={classNameCartRowColumn}>
          <div className={classNameCartFormGroup}>
            <label>State / Region</label>
            <Controller
              name={inputName('state')}
              control={control}
              defaultValue={defaultAddress && defaultAddress.state}
              render={({ field }: any) => (
                <RegionDropdown
                  {...field}
                  countryValueType="short"
                  country={selectedCountry}
                  classes={classNameCartFormInput}
                  onChange={(val) => {
                    setValue(inputName('state'), val);
                    field.onChange(val);
                    onChangeCountryState();
                  }}
                  valueType="short"
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={classNameCartFormGroup}>
        <label>{labelGeoSuggest}</label>
        <div className="merchi-cart-address-search" style={{ position: 'relative' }}>
          <input
            autoComplete="new-password"
            ref={inputRef}
            type="text"
            name="address-suggestion"
            className={classNameCartFormInput}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            style={{ paddingRight: loading || inputValue ? '40px' : undefined }}
          />
          {loading && (
            <div
              className="merchi-cart-address-search__spinner"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          )}
          {inputValue && !loading && (
            <button
              type="button"
              className="btn btn-sm merchi-cart-address-search__clear"
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
                padding: '2px 5px',
              }}
              onClick={clearInput}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className={classNameCartGoogleSuggestList}
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.placeId}
                  className={`${classNameCartGoogleSuggestListItem}${
                    index === selectedIndex ? ' active' : ''
                  }`}
                  role="option"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleSuggestionSelect(suggestion);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <strong>
                    {suggestion.structuredFormatting?.main_text ||
                      suggestion.description}
                  </strong>
                  {suggestion.structuredFormatting?.secondary_text && (
                    <div className="text-muted small">
                      {suggestion.structuredFormatting.secondary_text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Collapse isOpen={addressFieldsOpen}>{addressForm}</Collapse>
      <div className="d-flex align-items-center">
        {hasErrors && (
          <div className="text-danger">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid address!
          </div>
        )}
        <a
          className={`ml-auto btn btn-sm btn-link ${
            hasErrors ? 'text-danger' : ''
          }`}
          onClick={toggleAddressFieldsOpen}
        >
          <FontAwesomeIcon icon={addressFieldsOpen ? faTimes : faEdit} />{' '}
          {addressFieldsOpen ? 'Close' : 'Edit fields'}
        </a>
      </div>
    </>
  );
}

export default InputsAddress;
