var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity } from '../entity';
import { MerchiFile } from './file';
import { User } from './user';
import { SubscriptionPlan } from './subscription_plan';
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Company.resourceName = 'companies';
    Company.singularName = 'company';
    Company.pluralName = 'companies';
    __decorate([
        Company.property({ type: Date }),
        __metadata("design:type", Object)
    ], Company.prototype, "archived", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Number)
    ], Company.prototype, "id", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", String)
    ], Company.prototype, "name", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", String)
    ], Company.prototype, "callToActions", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Array)
    ], Company.prototype, "callToActionDetails", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "website", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "ownershipUnconfirmed", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "taxNumber", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "taxNumberType", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "paypalAccount", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "paypalPassword", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "paypalSignature", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isPaypalValid", void 0);
    __decorate([
        Company.property({ embeddedByDefault: false }),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isStripeAccountEnabled", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", String)
    ], Company.prototype, "stripeAccountId", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "stripeCustomerId", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "sendleActive", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "sendleApiKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "sendleId", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "unltdAiApiOrganizationId", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "unltdAiApiSecretKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "internalUseNotes", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "internalUseAiContext", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", String)
    ], Company.prototype, "aiContext", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isNew", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "subscriptionOutstanding", void 0);
    __decorate([
        Company.property({ type: Date }),
        __metadata("design:type", Object)
    ], Company.prototype, "trialEndDate", void 0);
    __decorate([
        Company.property({ type: Date }),
        __metadata("design:type", Object)
    ], Company.prototype, "trialEndDateUpdated", void 0);
    __decorate([
        Company.property({ type: 'User' }),
        __metadata("design:type", User)
    ], Company.prototype, "trialEndDateSetBy", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isBlocked", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isTesting", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "squareAccessToken", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "squareRefreshToken", void 0);
    __decorate([
        Company.property({ type: Date }),
        __metadata("design:type", Object)
    ], Company.prototype, "squareExpiresAt", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "squareIsValid", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "squareMerchantId", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "squareWebLocationId", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "stripePublishableTestKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "stripeApiTestKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "stripePublishableKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "stripeApiKey", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "stripeConnectDisabled", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isPayingCompany", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isStripeValid", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptSquare", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptStripe", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptPaypal", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptUtrust", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "utrustApiKey", void 0);
    __decorate([
        Company.property({ type: String }),
        __metadata("design:type", Object)
    ], Company.prototype, "utrustWebhookKey", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "isUtrustValid", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptBankTransfer", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", Boolean)
    ], Company.prototype, "acceptPhonePayment", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", String)
    ], Company.prototype, "defaultCurrency", void 0);
    __decorate([
        Company.property(),
        __metadata("design:type", String)
    ], Company.prototype, "country", void 0);
    __decorate([
        Company.property({ arrayType: 'InternalTag' }),
        __metadata("design:type", Array)
    ], Company.prototype, "internalTags", void 0);
    __decorate([
        Company.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Company.prototype, "logo", void 0);
    __decorate([
        Company.property({ type: 'CountryTax' }),
        __metadata("design:type", Object)
    ], Company.prototype, "defaultTaxType", void 0);
    __decorate([
        Company.property({ arrayType: 'AutomaticPaymentRelationship' }),
        __metadata("design:type", Array)
    ], Company.prototype, "automaticPaymentRelationships", void 0);
    __decorate([
        Company.property({ arrayType: 'CountryTax' }),
        __metadata("design:type", Array)
    ], Company.prototype, "taxTypes", void 0);
    __decorate([
        Company.property({ arrayType: 'PaymentDevice' }),
        __metadata("design:type", Array)
    ], Company.prototype, "paymentDevices", void 0);
    __decorate([
        Company.property({ type: SubscriptionPlan }),
        __metadata("design:type", Object)
    ], Company.prototype, "subscriptionPlan", void 0);
    __decorate([
        Company.property({ arrayType: 'EmailAddress' }),
        __metadata("design:type", Array)
    ], Company.prototype, "_emailAddresses", void 0);
    __decorate([
        Company.property({ arrayType: 'PhoneNumber' }),
        __metadata("design:type", Array)
    ], Company.prototype, "_paymentPhoneNumbers", void 0);
    __decorate([
        Company.property({ arrayType: 'PhoneNumber' }),
        __metadata("design:type", Array)
    ], Company.prototype, "_phoneNumbers", void 0);
    __decorate([
        Company.property({ arrayType: 'Address' }),
        __metadata("design:type", Array)
    ], Company.prototype, "_addresses", void 0);
    __decorate([
        Company.property({ arrayType: 'UserCompany' }),
        __metadata("design:type", Array)
    ], Company.prototype, "_users", void 0);
    __decorate([
        Company.property({ arrayType: 'Shipment' }),
        __metadata("design:type", Array)
    ], Company.prototype, "shipmentsAsSender", void 0);
    __decorate([
        Company.property({ arrayType: 'Shipment' }),
        __metadata("design:type", Array)
    ], Company.prototype, "shipmentsAsReceiver", void 0);
    __decorate([
        Company.property({ arrayType: 'Product' }),
        __metadata("design:type", Array)
    ], Company.prototype, "savedProducts", void 0);
    __decorate([
        Company.property({ arrayType: 'Bank' }),
        __metadata("design:type", Array)
    ], Company.prototype, "banks", void 0);
    __decorate([
        Company.property({ arrayType: 'UserCompany' }),
        __metadata("design:type", Array)
    ], Company.prototype, "userCompanies", void 0);
    __decorate([
        Company.property({ arrayType: 'CompanyInvitation' }),
        __metadata("design:type", Array)
    ], Company.prototype, "companyInvitations", void 0);
    __decorate([
        Company.property({ arrayType: 'Job' }),
        __metadata("design:type", Array)
    ], Company.prototype, "appliedJobs", void 0);
    __decorate([
        Company.property({ arrayType: 'Cart' }),
        __metadata("design:type", Array)
    ], Company.prototype, "carts", void 0);
    __decorate([
        Company.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], Company.prototype, "domains", void 0);
    __decorate([
        Company.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], Company.prototype, "accessibleDomainsAsClientCompany", void 0);
    __decorate([
        Company.property({ arrayType: 'EmailAddress' }),
        __metadata("design:type", Array)
    ], Company.prototype, "emailAddresses", void 0);
    __decorate([
        Company.property({ arrayType: 'PhoneNumber' }),
        __metadata("design:type", Array)
    ], Company.prototype, "phoneNumbers", void 0);
    __decorate([
        Company.property({ arrayType: 'PhoneNumber' }),
        __metadata("design:type", Array)
    ], Company.prototype, "paymentPhoneNumbers", void 0);
    __decorate([
        Company.property({ arrayType: 'Invoice' }),
        __metadata("design:type", Array)
    ], Company.prototype, "invoicesHas", void 0);
    __decorate([
        Company.property({ arrayType: 'Invoice' }),
        __metadata("design:type", Array)
    ], Company.prototype, "subscriptionInvoices", void 0);
    __decorate([
        Company.property({ arrayType: 'Address' }),
        __metadata("design:type", Array)
    ], Company.prototype, "addresses", void 0);
    return Company;
}(Entity));
export { Company };
