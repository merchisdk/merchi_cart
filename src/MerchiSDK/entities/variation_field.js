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
import { cloneDeepWith } from 'lodash';
import { Entity } from '../entity';
import { Product } from './product';
import { FieldType } from '../constants/field_types';
var VariationField = /** @class */ (function (_super) {
    __extends(VariationField, _super);
    function VariationField() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.isSelectable = function () {
            if (_this.fieldType === undefined) {
                throw new Error('fieldType is undefined, did you forget to embed it?');
            }
            var selectable = new Set([FieldType.SELECT,
                FieldType.CHECKBOX,
                FieldType.RADIO,
                FieldType.IMAGE_SELECT,
                FieldType.COLOUR_SELECT]);
            return selectable.has(_this.fieldType);
        };
        _this.buildEmptyVariation = function () {
            var e_1, _a;
            if (_this.defaultValue === undefined) {
                throw new Error('defaultValue is undefined, did you forget to embed it?');
            }
            if (_this.variationCost === undefined) {
                var err = 'variationCost is undefined, did you forget to embed it?';
                throw new Error(err);
            }
            if (_this.options === undefined) {
                throw new Error('options is undefined, did you forget to embed it?');
            }
            var result = new _this.merchi.Variation(_this.merchi);
            result.selectableOptions = [];
            if (_this.isSelectable()) {
                var onceOffCost = 0;
                var value = [];
                try {
                    for (var _b = __values(_this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var option = _c.value;
                        if ((_this.sellerProductEditable && option.include) ||
                            (!_this.sellerProductEditable && option.default)) {
                            if (option.variationCost === undefined) {
                                throw new Error('option.variationCost is undefined, did you ' +
                                    'forget to embed it?');
                            }
                            value.push(option.id);
                            onceOffCost += option.variationCost;
                        }
                        result.selectableOptions.push(option.buildVariationOption());
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                result.value = value.join();
                result.onceOffCost = onceOffCost;
            }
            else {
                result.value = _this.defaultValue;
                result.onceOffCost = _this.variationCost;
            }
            result.unitCostTotal = 0;
            result.cost = result.onceOffCost;
            function customiser(value, index) {
                if (index === 'merchi') {
                    return value;
                }
            }
            result.variationField = cloneDeepWith(_this, customiser);
            return result;
        };
        return _this;
    }
    VariationField.resourceName = 'variation_fields';
    VariationField.singularName = 'variationField';
    VariationField.pluralName = 'variationFields';
    __decorate([
        VariationField.property({ type: Date }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "archived", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "id", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "position", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "required", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "independent", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", String)
    ], VariationField.prototype, "name", void 0);
    __decorate([
        VariationField.property({ type: String }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "placeholder", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", String)
    ], VariationField.prototype, "defaultValue", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", String)
    ], VariationField.prototype, "currency", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "fieldType", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "margin", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "variationCost", void 0);
    __decorate([
        VariationField.property({ type: 'DiscountGroup' }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "variationCostDiscountGroup", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "variationUnitCost", void 0);
    __decorate([
        VariationField.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], VariationField.prototype, "buyUnitCost", void 0);
    __decorate([
        VariationField.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], VariationField.prototype, "buyCost", void 0);
    __decorate([
        VariationField.property({ type: 'DiscountGroup' }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "variationUnitCostDiscountGroup", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Number)
    ], VariationField.prototype, "rows", void 0);
    __decorate([
        VariationField.property({ type: Number }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "fieldMin", void 0);
    __decorate([
        VariationField.property({ type: Number }),
        __metadata("design:type", Object)
    ], VariationField.prototype, "fieldMax", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowDecimal", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "sellerProductEditable", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "multipleSelect", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "showFilePreview", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFileMultiple", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFileJpeg", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFileGif", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFilePdf", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFilePng", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Boolean)
    ], VariationField.prototype, "allowFileAi", void 0);
    __decorate([
        VariationField.property(),
        __metadata("design:type", Product)
    ], VariationField.prototype, "product", void 0);
    __decorate([
        VariationField.property({ arrayType: 'Variation' }),
        __metadata("design:type", Array)
    ], VariationField.prototype, "variations", void 0);
    __decorate([
        VariationField.property({ arrayType: 'VariationFieldsOption' }),
        __metadata("design:type", Array)
    ], VariationField.prototype, "options", void 0);
    return VariationField;
}(Entity));
export { VariationField };
