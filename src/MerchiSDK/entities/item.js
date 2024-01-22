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
import { CountryTax } from './country_tax';
import { Entity } from '../entity';
import { Invoice } from './invoice';
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.totalCost = function () {
            if (_this.quantity === undefined) {
                throw 'quantity is undefined, did you forget to embed it?';
            }
            if (_this.cost === undefined) {
                throw 'cost is undefined, did you forget to embed it?';
            }
            var quantity = _this.quantity === null ? 0 : _this.quantity;
            return quantity * _this.cost;
        };
        return _this;
    }
    Item.resourceName = 'items';
    Item.singularName = 'item';
    Item.pluralName = 'items';
    __decorate([
        Item.property({ type: Date }),
        __metadata("design:type", Object)
    ], Item.prototype, "archived", void 0);
    __decorate([
        Item.property(),
        __metadata("design:type", Number)
    ], Item.prototype, "id", void 0);
    __decorate([
        Item.property({ type: Number }),
        __metadata("design:type", Object)
    ], Item.prototype, "quantity", void 0);
    __decorate([
        Item.property(),
        __metadata("design:type", String)
    ], Item.prototype, "description", void 0);
    __decorate([
        Item.property(),
        __metadata("design:type", Number)
    ], Item.prototype, "cost", void 0);
    __decorate([
        Item.property({ type: Number }),
        __metadata("design:type", Object)
    ], Item.prototype, "taxAmount", void 0);
    __decorate([
        Item.property({ type: CountryTax }),
        __metadata("design:type", Object)
    ], Item.prototype, "taxType", void 0);
    __decorate([
        Item.property({ type: Invoice }),
        __metadata("design:type", Object)
    ], Item.prototype, "invoice", void 0);
    return Item;
}(Entity));
export { Item };
