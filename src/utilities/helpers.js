var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a;
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
var TransformationType;
(function (TransformationType) {
    TransformationType["CAMEL"] = "camel";
    TransformationType["UNDERSCORE"] = "underscore";
})(TransformationType || (TransformationType = {}));
var functionDict = (_a = {},
    _a[TransformationType.CAMEL] = camelCase,
    _a[TransformationType.UNDERSCORE] = snakeCase,
    _a);
function parseJsonKeyNames(jsonObject, standard) {
    var e_1, _a, e_2, _b;
    if (typeof jsonObject === 'object' && jsonObject !== null) {
        if (Array.isArray(jsonObject)) {
            try {
                for (var jsonObject_1 = __values(jsonObject), jsonObject_1_1 = jsonObject_1.next(); !jsonObject_1_1.done; jsonObject_1_1 = jsonObject_1.next()) {
                    var item = jsonObject_1_1.value;
                    parseJsonKeyNames(item, standard);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (jsonObject_1_1 && !jsonObject_1_1.done && (_a = jsonObject_1.return)) _a.call(jsonObject_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            var oldKeys = Object.keys(jsonObject);
            try {
                for (var oldKeys_1 = __values(oldKeys), oldKeys_1_1 = oldKeys_1.next(); !oldKeys_1_1.done; oldKeys_1_1 = oldKeys_1.next()) {
                    var old = oldKeys_1_1.value;
                    var newKey = functionDict[standard](old);
                    if (newKey !== old) {
                        jsonObject[newKey] = jsonObject[old];
                        delete jsonObject[old];
                        parseJsonKeyNames(jsonObject[newKey], standard);
                    }
                    else {
                        parseJsonKeyNames(jsonObject[old], standard);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (oldKeys_1_1 && !oldKeys_1_1.done && (_b = oldKeys_1.return)) _b.call(oldKeys_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    return jsonObject;
}
function parseJsonKeyCamel(jsonObject) {
    return parseJsonKeyNames(jsonObject, TransformationType.CAMEL);
}
export function unpackRecursiveJsonIter(jsonObject, options, fileIndex) {
    if (!options)
        options = {};
    var result = options.existing || new FormData();
    var prefix = options._prefix || '';
    if (!fileIndex)
        fileIndex = { value: 0 };
    var appendData = function (name, value) {
        if (prefix) {
            name = prefix + '-' + name;
        }
        if (value !== undefined && value !== null) {
            result.set(name, value.toString()); // Convert to string since FormData accepts only strings or Blobs.
        }
    };
    var processSingleEntityProperty = function (key, value) {
        var innerPrefix = key + '-0';
        if (prefix) {
            innerPrefix = prefix + '-' + innerPrefix;
        }
        unpackRecursiveJsonIter(value, { existing: result, _prefix: innerPrefix }, fileIndex);
        appendData(key + '-count', '1');
    };
    var _loop_1 = function (key) {
        if ([undefined, '', null].includes(jsonObject[key]) || key === 'rights') {
            return "continue";
        }
        if (Array.isArray(jsonObject[key])) {
            jsonObject[key].forEach(function (item, index) {
                if ((typeof item === "object" || Array.isArray(item)) && item !== null) {
                    var arrayPrefix = prefix ? "".concat(prefix, "-").concat(key, "-").concat(index) : "".concat(key, "-").concat(index);
                    unpackRecursiveJsonIter(item, { existing: result, _prefix: arrayPrefix }, fileIndex);
                }
                else {
                    appendData("".concat(key, "-").concat(index), item);
                }
            });
            appendData(key + '-count', jsonObject[key].length.toString());
        }
        else if (typeof jsonObject[key] === "object" && jsonObject[key] !== null) {
            processSingleEntityProperty(key, jsonObject[key]);
        }
        else {
            appendData(key, jsonObject[key]);
        }
    };
    for (var key in jsonObject) {
        _loop_1(key);
    }
    return result;
}
export function encodeMerchiApiData(dataDict) {
    var dataJson = parseJsonKeyCamel(dataDict);
    return unpackRecursiveJsonIter(dataJson);
}
var supportedNumbers = {
    AU: 'Australia (+61)',
    AE: 'United Arab Emirates (+971)',
    BH: 'Bahrain (+973)',
    CN: 'China (+86)',
    DK: 'Denmark (+45)',
    ES: 'Spain (+34)',
    FR: 'France (+33)',
    GB: 'United Kingdom (+44)',
    HK: 'Hong Kong (+852)',
    ID: 'Indonesia (+62)',
    IN: 'India (+91)',
    IT: 'Italy (+39)',
    KR: 'South Korea (+82)',
    NC: 'New Caledonia (+687)',
    NZ: 'New Zealand (+64)',
    OM: 'Oman (+968)',
    PH: 'Philippines (+63)',
    PT: 'Portugal (+351)',
    QA: 'Qatar (+974)',
    SE: 'Sweden (+46)',
    SG: 'Singapore (+65)',
    TH: 'Thailand (+66)',
    US: 'United States (+1)',
    ZA: 'South Africa (+27)',
};
export var phoneOptions = Object.keys(supportedNumbers).map(function (key) { return ({
    value: key,
    label: supportedNumbers[key],
}); });
export function appendStyleSheetText(css, callback) {
    if (document && document !== undefined) {
        var newStyleSheet = document.createElement('style');
        newStyleSheet.textContent = css;
        if (callback) {
            newStyleSheet.onload = callback;
        }
        document.head.appendChild(newStyleSheet);
    }
}
var optionsEmbed = {
    options: {
        linkedFile: {},
        variationCostDiscountGroup: {},
        variationUnitCostDiscountGroup: {}
    },
    variationCostDiscountGroup: {},
    variationUnitCostDiscountGroup: {},
};
var variationsEmbed = {
    selectedOptions: {},
    variationField: optionsEmbed,
    variationFiles: {}
};
var variationsGroupsEmbed = { variations: variationsEmbed };
var productWithImagesEmbed = {
    domain: { company: { defaultTaxType: {}, taxTypes: {} } },
    featureImage: {},
    groupVariationFields: { options: { linkedFile: {} } },
    images: {},
    independentVariationFields: { options: { linkedFile: {} } },
    taxType: {},
};
var cartShipmentQuote = {
    shipmentMethod: { originAddress: {}, taxType: {} },
};
export var cartEmbed = {
    cartItems: {
        product: productWithImagesEmbed,
        taxType: {},
        variations: variationsEmbed,
        variationsGroups: variationsGroupsEmbed,
    },
    client: {
        emailAddresses: {}, profilePicture: {},
    },
    clientCompany: {},
    domain: {
        company: {
            defaultTaxType: {},
            isStripeAccountEnabled: {},
            taxTypes: {},
        },
    },
    invoice: {},
    receiverAddress: {},
    shipmentGroups: {
        cartItems: { product: {} },
        quotes: cartShipmentQuote,
        selectedQuote: cartShipmentQuote,
    },
};
