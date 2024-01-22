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
import { Address } from './address';
import { Entity } from '../entity';
import { some } from 'lodash';
var Inventory = /** @class */ (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.isVariationFieldOptionSelected = function (option) {
            if (_this.inventoryUnitVariations === undefined) {
                throw new Error('inventoryUnitVariations is undefined, did you forget to embed it?');
            }
            return some(_this.inventoryUnitVariations.map(function (v) { return v.optionId() === option.id; }));
        };
        return _this;
    }
    Inventory.resourceName = 'inventories';
    Inventory.singularName = 'inventory';
    Inventory.pluralName = 'inventories';
    __decorate([
        Inventory.property({ type: Date }),
        __metadata("design:type", Object)
    ], Inventory.prototype, "archived", void 0);
    __decorate([
        Inventory.property(),
        __metadata("design:type", Number)
    ], Inventory.prototype, "id", void 0);
    __decorate([
        Inventory.property(),
        __metadata("design:type", Number)
    ], Inventory.prototype, "quantity", void 0);
    __decorate([
        Inventory.property(),
        __metadata("design:type", String)
    ], Inventory.prototype, "name", void 0);
    __decorate([
        Inventory.property(),
        __metadata("design:type", String)
    ], Inventory.prototype, "notes", void 0);
    __decorate([
        Inventory.property(),
        __metadata("design:type", Boolean)
    ], Inventory.prototype, "isOrphan", void 0);
    __decorate([
        Inventory.property({ arrayType: 'Product' }),
        __metadata("design:type", Array)
    ], Inventory.prototype, "products", void 0);
    __decorate([
        Inventory.property({ type: Address }),
        __metadata("design:type", Object)
    ], Inventory.prototype, "address", void 0);
    __decorate([
        Inventory.property({ arrayType: 'VariationsGroup' }),
        __metadata("design:type", Array)
    ], Inventory.prototype, "variationsGroups", void 0);
    __decorate([
        Inventory.property({ arrayType: 'Job' }),
        __metadata("design:type", Array)
    ], Inventory.prototype, "jobs", void 0);
    __decorate([
        Inventory.property({ arrayType: 'InventoryUnitVariation' }),
        __metadata("design:type", Array)
    ], Inventory.prototype, "inventoryUnitVariations", void 0);
    return Inventory;
}(Entity));
export { Inventory };
