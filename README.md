# merchi_cart
Merchi's cart


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)

## Installation

```bash
npm install merchi_cart

or

yarn add merchi_cart
```

### Usage
  functions:
  getMerchiCart,
  getMerchiCartValues,
  isMerchiCartFetching,

  components:
  Cart


### Props

| Name                                          | Type       | Default                                                                     | Description                           |
|-----------------------------------------------|------------|-----------------------------------------------------------------------------|---------------------------------------|
| `classNameAlertError`                         | `string?`  | `"alert alert-error alert-dismissible"`                                     | `Class for alert error`               |
| `classNameAlertInfo`                          | `string?`  | `"alert alert-info alert-dismissible"`                                      | `Class for alert info`                |
| `classNameAlertSuccess`                       | `string?`  | `"alert alert-success alert-dismissible"`                                   | `Class for alert success`             |
| `classNameAlertWarning`                       | `string?`  | `"alert alert-warning alert-dismissible"`                                   | `Class for alert warning`             |
| `classNameBtn`                                | `string?`  | `"btn"`                                                                     | `Base class for button elements`      |
| `classNameBtnBack`                            | `string?`  | `"btn-lg btn-default pull-left"`                                            | `Class for back button`               |
| `classNameBtnCartClear`                       | `string?`  | `"btn-lg btn-danger mr-auto"`                                               | `Class for clear cart button`         |
| `classNameBtnClose`                           | `string?`  | `"btn-close"`                                                               | `Class for close button element`      |
| `classNameBtnDanger`                          | `string?`  | `"btn btn-md btn-danger"`                                                   | `Class for button danger element`     |
| `classNameBtnDownloadInvoice`                 | `string?`  | `"btn btn-lg btn-primary"`                                                  | `Class for button download element`   |
| `classNameBtnLink`                            | `string?`  | `"btn-md btn-link"`                                                         | `Class for link button elements`      |
| `classNameBtnNext`                            | `string?`  | `"btn-lg btn-primary"`                                                      | `Class for next button`               |
| `classNameBtnNextComplete`                    | `string?`  | `"btn-lg btn-success"`                                                      | `Class for next button completed`     |
| `classNameBtnPay`                             | `string?`  | `"btn-lg btn-primary width-full"`                                           | `Class for pay button completed`      |
| `classNameBtnPrimary`                         | `string?`  | `"btn btn-md btn-primary"`                                                  | `Class for primary button completed`  |
| `classNameCartBody`                           | `string?`  | `"merchi-cart-body"`                                                        | `Class for cart body container`       |
| `classNameCartFooter`                         | `string?`  | `"merchi-cart-footer"`                                                      | `Class for cart footer container`     |
| `classNameCartFormGroup`                      | `string?`  | `"form-group"`                                                              | `Class for form group element`        |
| `classNameCartFormGroupCheckbox`              | `string?`  | `"form-check"`                                                              | `Class for form group checkbox`       |
| `classNameCartFormInput`                      | `string?`  | `"form-control"`                                                            | `Class for form input`                |
| `classNameCartFormLabelCheckbox`              | `string?`  | `""`                                                                        | `Class for form input checkbpx label` |
| `classNameCartFormCheckbox`                   | `string?`  | `"form-check-input"`                                                        | `Class for form input checkbpx`       |
| `classNameCartHeader`                         | `string?`  | `"merchi-cart-header"`                                                      | `Class for cart header container`     |
| `classNameCartInputError`                     | `string?`  | `"text-danger"`                                                             | `Class for form error`                |
| `classNameCartNav`                            | `string?`  | `"nav nav-tabs merchi-nav merchi-nav-fill merchi-nav-pills"`                | `Class for cart nav`                  |
| `classNameNoItems`                            | `string?`  | `"merchi-no-cart-items"`                                                    | `Class for no items in cart`          |
| `classNameCartGoogleSuggestList`              | `string?`  | `"list-group m-b-0"`                                                        | `Class for google suggest list`       |
| `classNameCartGoogleSuggestListItem`          | `string?`  | `"list-group-item cursor-pointer"`                                          | `Class for google suggest list item`  |
| `classNameCartItemFeatureImage`               | `string?`  | `"img-rounded m-10"`                                                        | `Class for cart item feature image`   |
| `classNameCartItemInfo`                       | `string?`  | `"text-muted font-weight-normal font-italic"`                               | `Class for cart item info element`    |
| `classNameCartItemInfoCell`                   | `string?`  | `"border-0 align-middle"`                                                   | `Class for cart item cell`            |
| `classNameCartItemInfoCellRight`              | `string?`  | `"border-0 align-middle text-right"`                                        | `Class for cart item cell right align`|
| `classNameCartItemInfoContainer`              | `string?`  | `"ml-3 d-inline-block align-middle"`                                        | `Class for cart item info container`  |
| `classNameCartRow`                            | `string?`  | `"merchi-row"`                                                              | `Class for row element`               |
| `classNameCartRowColumn`                      | `string?`  | `"merchi-column"`                                                           | `Class for row column element`        |
| `classNameTableContainer`                     | `string?`  | `"table-responsive"`                                                        | `Class for cart table container`      |
| `classNameCartTab`                            | `string?`  | `"merchi-tab-content"`                                                      | `Class for cart tab container`        |
| `classNameCartTabItem`                        | `string?`  | `"nav-item merchi-nav-item"`                                                | `Class for cart tab item`             |
| `classNameCartTabItemLink`                    | `string?`  | `"nav-link merchi-nav-link"`                                                | `Class for cart tab item link         |` 
| `classNameCartTitle`                          | `string?`  | `"merchi-cart-title"`                                                       | `Class for cart Title container`      |
| `classNameCartTotalContainer`                 | `string?`  | `"merchi-cart-total-container"`                                             | `Class for totals container elements` |
| `classNameCartTotalItem`                      | `string?`  | `"merchi-cart-total-item"`                                                  | `Class for totals item elements`      |
| `classNameCartTotalItemPrice`                 | `string?`  | `"merchi-cart-total-item-price"`                                            | `Class for totals item price elements`|
| `classNameClearCartContainer`                 | `string?`  | `"merchi-cart-clear-container"`                                             | `Class cart clear container`          |
| `classNameClearCartText`                      | `string?`  | `"merchi-cart-clear-text"`                                                  | `Class cart clear text container`     |
| `classNameListClientInfo`                     | `string?`  | `"merchi-cart-client-info-list"`                                            | `Class for client info list`          |
| `classNameListContainer`                      | `string?`  | `"pb-2"`                                                                    | `Class for list conatiner element`    |
| `classNameListItem`                           | `string?`  | `"list-group-item"`                                                         | `Class for list item elements`        |
| `classNameList`                               | `string?`  | `"list-group"`                                                              | `Class for list elements`             |
| `classNameListInline`                         | `string?`  | `"list-inline"`                                                             | `Class for list inline elements`      |
| `classNameListUnstyles`                       | `string?`  | `"list-unstyled"`                                                           | `Class for list unstyled elements`    |
| `classNameLoadingTemplate`                    | `string?`  | `"merchi-loading-template"`                                                 | `Class for loading elements`          |
| `classNameLoadingTemplateContainer`           | `string?`  | `"merchi-loading-template-container"`                                       | `Class for loading container elements`|
| `classNameShipmentOption`                     | `string?`  | `"merchi-shipment-option"`                                                  | `Class for shipment option element`   |
| `classNameTable`                              | `string?`  | `"table table-bordered"`                                                    | `Class for table elements`            |
| `classNameVariationsList`                     | `string?`  | `"list-unstyled list-inline"`                                               | `Class for variation info`            |
| `customSuccessMessage`                        | `string?`  | `undefined`                                                                 | `A message to display on payment success` |
| `domainId`                                    | `number`   | `undefined`                                                                 | `The merchi domain/store id for the cart` |
| `includeTheme`                                | `boolean?` | `false`                                                                     | `If true will fetch and apply the store theme to the page` |
| `initialiseCart`                              | `boolean?` | `true`                                                                      | `If true will initial fetch cart and set cart function on window`|
| `onClickClose`                                | `() => void?`| `() => console.log('close merchi cart!')`                                 | `a function to close the cart`        |
| `productFormClassNames`                       | `obj`      | `{}`                                                                        | `An object to be passsed to the merchi_product_form `|
| `showUserTermsAndConditions`                  | `boolean?` | `true`                                                                      | `Display the user t&cs for Merchi`    |
| `urlApi`                                      | `string?`  | `'https://api.merchi.co/v6/'`                                               | `URL to connect to the Merchi API`    |
| `urlFrontend`                                 | `string?`  | `'https://merchi.co/'`                                                      | `URL to redirect users to a frontend` |
| `urlTrackingPage`                             | `string?`  | `undefined`                                                                 | `URL used on the thankyou page for tracking`|
