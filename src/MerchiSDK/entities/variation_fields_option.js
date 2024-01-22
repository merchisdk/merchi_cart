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
import { VariationField } from './variation_field';
var VariationFieldsOption = /** @class */ (function (_super) {
    __extends(VariationFieldsOption, _super);
    function VariationFieldsOption() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.totalCost = function (quantity) {
            if (_this.variationCost === undefined) {
                throw new Error('variationCost is unknown');
            }
            if (_this.variationUnitCost === undefined) {
                throw new Error('variationUnitCost is unknown');
            }
            return _this.variationCost + _this.variationUnitCost * quantity;
        };
        _this.buildVariationOption = function () {
            var result = new _this.merchi.VariationOption(_this.merchi);
            result.optionId = _this.id;
            result.include = _this.include;
            result.value = _this.value;
            result.position = _this.position;
            result.default = _this.default;
            result.colour = _this.colour;
            result.linkedFile = _this.linkedFile;
            result.quantity = 0;
            result.currency = _this.currency;
            result.unitCost = _this.variationUnitCost;
            result.unitCostTotal = 0;
            result.onceOffCost = _this.variationCost;
            result.totalCost = _this.variationCost;
            return result;
        };
        return _this;
    }
    VariationFieldsOption.resourceName = 'variation_fields_options';
    VariationFieldsOption.singularName = 'variationFieldsOption';
    VariationFieldsOption.pluralName = 'variationFieldsOptions';
    __decorate([
        VariationFieldsOption.property({ type: Date }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "archived", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "id", void 0);
    __decorate([
        VariationFieldsOption.property({ type: String }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "value", void 0);
    __decorate([
        VariationFieldsOption.property({ type: String }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "colour", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", String)
    ], VariationFieldsOption.prototype, "currency", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Boolean)
    ], VariationFieldsOption.prototype, "default", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Boolean)
    ], VariationFieldsOption.prototype, "include", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "position", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "variationCost", void 0);
    __decorate([
        VariationFieldsOption.property({ type: 'DiscountGroup' }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "variationCostDiscountGroup", void 0);
    __decorate([
        VariationFieldsOption.property(),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "variationUnitCost", void 0);
    __decorate([
        VariationFieldsOption.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "buyUnitCost", void 0);
    __decorate([
        VariationFieldsOption.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], VariationFieldsOption.prototype, "buyCost", void 0);
    __decorate([
        VariationFieldsOption.property({ type: 'DiscountGroup' }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "variationUnitCostDiscountGroup", void 0);
    __decorate([
        VariationFieldsOption.property({ type: VariationField }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "variationField", void 0);
    __decorate([
        VariationFieldsOption.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], VariationFieldsOption.prototype, "linkedFile", void 0);
    __decorate([
        VariationFieldsOption.property({ arrayType: 'Variation' }),
        __metadata("design:type", Array)
    ], VariationFieldsOption.prototype, "selectedByVariations", void 0);
    __decorate([
        VariationFieldsOption.property({ arrayType: 'InventoryUnitVariation' }),
        __metadata("design:type", Array)
    ], VariationFieldsOption.prototype, "inventoryUnitVariations", void 0);
    return VariationFieldsOption;
}(Entity));
export { VariationFieldsOption };
