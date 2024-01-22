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
var PhoneNumber = /** @class */ (function (_super) {
    __extends(PhoneNumber, _super);
    function PhoneNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhoneNumber.resourceName = 'phone_numbers';
    PhoneNumber.singularName = 'phoneNumber';
    PhoneNumber.pluralName = 'phoneNumbers';
    __decorate([
        PhoneNumber.property({ type: Date }),
        __metadata("design:type", Object)
    ], PhoneNumber.prototype, "archived", void 0);
    __decorate([
        PhoneNumber.property(),
        __metadata("design:type", Number)
    ], PhoneNumber.prototype, "id", void 0);
    __decorate([
        PhoneNumber.property(),
        __metadata("design:type", String)
    ], PhoneNumber.prototype, "number", void 0);
    __decorate([
        PhoneNumber.property(),
        __metadata("design:type", String)
    ], PhoneNumber.prototype, "code", void 0);
    __decorate([
        PhoneNumber.property({ arrayType: 'User' }),
        __metadata("design:type", Array)
    ], PhoneNumber.prototype, "users", void 0);
    __decorate([
        PhoneNumber.property({ arrayType: 'Company' }),
        __metadata("design:type", Array)
    ], PhoneNumber.prototype, "companies", void 0);
    __decorate([
        PhoneNumber.property({ arrayType: 'Company' }),
        __metadata("design:type", Array)
    ], PhoneNumber.prototype, "paymentCompanies", void 0);
    __decorate([
        PhoneNumber.property({ embeddedByDefault: false }),
        __metadata("design:type", String)
    ], PhoneNumber.prototype, "localFormatNumber", void 0);
    __decorate([
        PhoneNumber.property({ embeddedByDefault: false }),
        __metadata("design:type", String)
    ], PhoneNumber.prototype, "internationalFormatNumber", void 0);
    return PhoneNumber;
}(Entity));
export { PhoneNumber };
