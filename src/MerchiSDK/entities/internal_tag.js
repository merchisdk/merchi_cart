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
var InternalTag = /** @class */ (function (_super) {
    __extends(InternalTag, _super);
    function InternalTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalTag.resourceName = 'internal_tags';
    InternalTag.singularName = 'internalTag';
    InternalTag.pluralName = 'internalTags';
    __decorate([
        InternalTag.property(),
        __metadata("design:type", Number)
    ], InternalTag.prototype, "id", void 0);
    __decorate([
        InternalTag.property(),
        __metadata("design:type", Number)
    ], InternalTag.prototype, "colour", void 0);
    __decorate([
        InternalTag.property(),
        __metadata("design:type", String)
    ], InternalTag.prototype, "name", void 0);
    __decorate([
        InternalTag.property(),
        __metadata("design:type", String)
    ], InternalTag.prototype, "description", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Company' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "companies", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Domain' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "domains", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Job' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "jobs", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Product' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "products", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Invoice' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "invoices", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Shipment' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "shipments", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'Theme' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "themes", void 0);
    __decorate([
        InternalTag.property({ arrayType: 'User' }),
        __metadata("design:type", Array)
    ], InternalTag.prototype, "users", void 0);
    return InternalTag;
}(Entity));
export { InternalTag };
