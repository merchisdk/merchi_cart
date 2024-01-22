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
import { Entity } from '../entity';
import { MerchiFile } from './file';
import { User } from './user';
import { ThemeStatus } from '../constants/theme_status';
var Theme = /** @class */ (function (_super) {
    __extends(Theme, _super);
    function Theme() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.canBeActivated = function () {
            var validStatus = ThemeStatus.VALID_BUT_NOT_UPDATED;
            if (_this.mainCssStatus === undefined || _this.emailCssStatus === undefined) {
                throw new Error('status is unknown');
            }
            return _this.mainCssStatus >= validStatus &&
                _this.emailCssStatus >= validStatus;
        };
        _this.isActiveOnDomain = function (domainId) {
            var domain = _this.domain;
            if (domain === undefined) {
                throw new Error('domain is unknown');
            }
            if (domain === null) {
                return false;
            }
            var activeTheme = domain.activeTheme;
            if (activeTheme === undefined) {
                throw new Error('activeTheme is unknown');
            }
            return domain.id == domainId && activeTheme.id === _this.id;
        };
        return _this;
    }
    Theme.resourceName = 'themes';
    Theme.singularName = 'theme';
    Theme.pluralName = 'themes';
    __decorate([
        Theme.property({ type: Date }),
        __metadata("design:type", Object)
    ], Theme.prototype, "archived", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Number)
    ], Theme.prototype, "id", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Number)
    ], Theme.prototype, "foundation", void 0);
    __decorate([
        Theme.property({ arrayType: 'InternalTag' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "internalTags", void 0);
    __decorate([
        Theme.property({ arrayType: 'Component' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "components", void 0);
    __decorate([
        Theme.property({ arrayType: 'Component' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "contextComponents", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Number)
    ], Theme.prototype, "mainCssStatus", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "mainCssErrorMessage", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Number)
    ], Theme.prototype, "emailCssStatus", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "emailCssErrorMessage", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "name", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "description", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "jsBundle", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "headerTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "headerError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "headerHtml", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "footerTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "footerError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "footerHtml", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "indexPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "indexPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "indexHtml", void 0);
    __decorate([
        Theme.property({ arrayType: 'Menu' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "menus", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "productsPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "productsPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "productsHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "domainInvitePageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "domainInvitePageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "domainInviteHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "resetPasswordPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "resetPasswordPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "passwordResetHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "passwordChangePageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "passwordChangePageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "passwordChangeHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "jobDraftingPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "jobDraftingPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "jobDraftingHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "jobQuoteRequestedPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "jobQuoteRequestedPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "jobQuoteRequestedHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "invoicePageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "invoicePageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "invoiceHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "loginPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "loginPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "loginPageHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "errorPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "errorPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "errorPageHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "userProfilePageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "userProfilePageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "userProfileHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "productPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "productPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "productHtml", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "invoicePaidPageTemplate", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "invoicePaidPageError", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", String)
    ], Theme.prototype, "invoicePaidHtml", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Date)
    ], Theme.prototype, "lastUpdated", void 0);
    __decorate([
        Theme.property(),
        __metadata("design:type", Boolean)
    ], Theme.prototype, "public", void 0);
    __decorate([
        Theme.property({ type: String }),
        __metadata("design:type", String)
    ], Theme.prototype, "aiContext", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "mainCss", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "mainCssTemplateUsing", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "mainCssTemplateEditing", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "emailCss", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "emailCssTemplateUsing", void 0);
    __decorate([
        Theme.property({ embeddedByDefault: false, type: String }),
        __metadata("design:type", Object)
    ], Theme.prototype, "emailCssTemplateEditing", void 0);
    __decorate([
        Theme.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "cssImageFiles", void 0);
    __decorate([
        Theme.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Theme.prototype, "featureImage", void 0);
    __decorate([
        Theme.property({ type: 'Domain' }),
        __metadata("design:type", Object)
    ], Theme.prototype, "domain", void 0);
    __decorate([
        Theme.property({ type: User }),
        __metadata("design:type", Object)
    ], Theme.prototype, "author", void 0);
    __decorate([
        Theme.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "images", void 0);
    __decorate([
        Theme.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "domains", void 0);
    __decorate([
        Theme.property({ arrayType: 'Page' }),
        __metadata("design:type", Array)
    ], Theme.prototype, "pages", void 0);
    __decorate([
        Theme.property({ type: Number }),
        __metadata("design:type", Object)
    ], Theme.prototype, "defaultForDomainType", void 0);
    return Theme;
}(Entity));
export { Theme };
