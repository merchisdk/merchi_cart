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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Company } from './company';
import { Entity } from '../entity';
import { MerchiFile } from './file';
import { Theme } from './theme';
import { DomainType } from '../constants/domain_types';
var Domain = /** @class */ (function (_super) {
    __extends(Domain, _super);
    function Domain() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.defaultTaxType = function () {
            if (_this.company === undefined) {
                throw new Error('company is undefined, did you forget to embed it?');
            }
            if (_this.company.defaultTaxType === undefined) {
                var err = 'company.defaultTaxType is undefined, did you forget to' +
                    ' embed it?';
                throw new Error(err);
            }
            return _this.company.defaultTaxType;
        };
        _this.getActiveTheme = function () {
            if (_this.activeTheme === undefined) {
                throw new Error('activeTheme is undefined, did you forget to embed it?');
            }
            return _this.activeTheme;
        };
        return _this;
    }
    Domain.resourceName = 'domains';
    Domain.singularName = 'domain';
    Domain.pluralName = 'domains';
    __decorate([
        Domain.property({ type: Date }),
        __metadata("design:type", Object)
    ], Domain.prototype, "archived", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Number)
    ], Domain.prototype, "id", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "domain", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "country", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "currency", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "callToActions", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Array)
    ], Domain.prototype, "callToActionDetails", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "isMaster", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "internalUseNotes", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "internalUseAiContext", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "aiContext", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Number)
    ], Domain.prototype, "domainType", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "subDomain", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "emailDomain", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", String)
    ], Domain.prototype, "smsName", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "showDomainPublicly", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "publicAccessRestricted", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "showDomainToAccessibleEntitiesOnly", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "enableEmailNotifications", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "enableSmsNotifications", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Array)
    ], Domain.prototype, "mailgunRecords", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "enableNotifications", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "trackingCodeGoogleConversion", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "trackingCodeGoogleGlobal", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "apiSecret", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "webflowApiKey", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "shopifyShopUrl", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Boolean)
    ], Domain.prototype, "shopifyIsActive", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "qrShopQrCode", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", String)
    ], Domain.prototype, "unltdAiApiOrganizationId", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", String)
    ], Domain.prototype, "unltdAiApiSecretKey", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialBitchute", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialDiscord", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialFacebook", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialGoogle", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialInstagram", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialLinkedin", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialRumble", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialTelegram", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialTiktok", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialX", void 0);
    __decorate([
        Domain.property({ type: String }),
        __metadata("design:type", Object)
    ], Domain.prototype, "socialYoutube", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Company)
    ], Domain.prototype, "ownedBy", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Company)
    ], Domain.prototype, "company", void 0);
    __decorate([
        Domain.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Domain.prototype, "logo", void 0);
    __decorate([
        Domain.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Domain.prototype, "favicon", void 0);
    __decorate([
        Domain.property(),
        __metadata("design:type", Theme)
    ], Domain.prototype, "activeTheme", void 0);
    __decorate([
        Domain.property({ arrayType: 'InternalTag' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "internalTags", void 0);
    __decorate([
        Domain.property({ arrayType: 'DomainTag' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "tags", void 0);
    __decorate([
        Domain.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "canSupply", void 0);
    __decorate([
        Domain.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "suppliedBy", void 0);
    __decorate([
        Domain.property({ arrayType: 'User' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "accessibleClients", void 0);
    __decorate([
        Domain.property({ arrayType: 'Company' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "accessibleClientCompanies", void 0);
    __decorate([
        Domain.property({ arrayType: 'Menu' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "menus", void 0);
    __decorate([
        Domain.property({ arrayType: 'Session' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "sessions", void 0);
    __decorate([
        Domain.property({ arrayType: 'Category' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "categories", void 0);
    __decorate([
        Domain.property({ arrayType: 'Notification' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "notifications", void 0);
    __decorate([
        Domain.property({ arrayType: 'Product' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "products", void 0);
    __decorate([
        Domain.property({ arrayType: 'SupplyDomain' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "supplyProducts", void 0);
    __decorate([
        Domain.property({ arrayType: 'Job' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "jobs", void 0);
    __decorate([
        Domain.property({ arrayType: 'User' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "jobsAssignees", void 0);
    __decorate([
        Domain.property({ arrayType: 'Cart' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "carts", void 0);
    __decorate([
        Domain.property({ arrayType: 'EnrolledDomain' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "enrollments", void 0);
    __decorate([
        Domain.property({ arrayType: 'Invoice' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "invoices", void 0);
    __decorate([
        Domain.property({ arrayType: 'DomainInvitation' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "domainInvitations", void 0);
    __decorate([
        Domain.property({ arrayType: 'SeoDomainPage' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "seoDomainPages", void 0);
    __decorate([
        Domain.property({ arrayType: 'Theme' }),
        __metadata("design:type", Array)
    ], Domain.prototype, "themes", void 0);
    return Domain;
}(Entity));
export { Domain };
