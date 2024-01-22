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
import { Inventory } from './inventory';
import { VariationFieldsOption } from './variation_fields_option';
var InventoryUnitVariation = /** @class */ (function (_super) {
    __extends(InventoryUnitVariation, _super);
    function InventoryUnitVariation() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.optionId = function () {
            if (_this.variationFieldsOption === undefined) {
                throw new Error('variationFieldsOption is undefined, did you forget to embed it?');
            }
            return _this.variationFieldsOption.id;
        };
        return _this;
    }
    InventoryUnitVariation.resourceName = 'inventory_unit_variations';
    InventoryUnitVariation.singularName = 'inventoryUnitVariation';
    InventoryUnitVariation.pluralName = 'inventoryUnitVariations';
    __decorate([
        InventoryUnitVariation.property({ type: Date }),
        __metadata("design:type", Object)
    ], InventoryUnitVariation.prototype, "archived", void 0);
    __decorate([
        InventoryUnitVariation.property(),
        __metadata("design:type", Number)
    ], InventoryUnitVariation.prototype, "id", void 0);
    __decorate([
        InventoryUnitVariation.property(),
        __metadata("design:type", Inventory)
    ], InventoryUnitVariation.prototype, "inventory", void 0);
    __decorate([
        InventoryUnitVariation.property(),
        __metadata("design:type", VariationFieldsOption)
    ], InventoryUnitVariation.prototype, "variationFieldsOption", void 0);
    return InventoryUnitVariation;
}(Entity));
export { InventoryUnitVariation };
