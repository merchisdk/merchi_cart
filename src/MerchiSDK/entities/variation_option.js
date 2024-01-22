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
var VariationOption = /** @class */ (function (_super) {
    __extends(VariationOption, _super);
    function VariationOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariationOption.singularName = 'variationOption';
    VariationOption.pluralName = 'variationOptions';
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "optionId", void 0);
    __decorate([
        VariationOption.property({ type: String }),
        __metadata("design:type", Object)
    ], VariationOption.prototype, "value", void 0);
    __decorate([
        VariationOption.property({ type: String }),
        __metadata("design:type", Object)
    ], VariationOption.prototype, "colour", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "position", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Boolean)
    ], VariationOption.prototype, "available", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Boolean)
    ], VariationOption.prototype, "default", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Boolean)
    ], VariationOption.prototype, "include", void 0);
    __decorate([
        VariationOption.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], VariationOption.prototype, "linkedFile", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", String)
    ], VariationOption.prototype, "fieldName", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "quantity", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", String)
    ], VariationOption.prototype, "currency", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "onceOffCost", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "unitCost", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "unitCostTotal", void 0);
    __decorate([
        VariationOption.property(),
        __metadata("design:type", Number)
    ], VariationOption.prototype, "totalCost", void 0);
    return VariationOption;
}(Entity));
export { VariationOption };
