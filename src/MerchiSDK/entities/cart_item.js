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
import { Cart } from './cart';
import { CountryTax } from './country_tax';
import { Entity } from '../entity';
import { Product } from './product';
var CartItem = /** @class */ (function (_super) {
    __extends(CartItem, _super);
    function CartItem() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.requiresShipment = function () {
            if (_this.product === undefined) {
                throw 'product is undefined, did you forget to embed it?';
            }
            if (_this.product.needsShipping === undefined) {
                throw 'needsShipping is undefined, did you forget to embed it?';
            }
            return _this.product.needsShipping;
        };
        _this.calculate = function () {
            var resource = '/cart-item-cost-estimate/';
            var data = _this.toFormData({ excludeOld: false });
            var fetchOptions = { method: 'POST', body: data };
            fetchOptions.query = [];
            fetchOptions.query.push(['skip_rights', 'y']);
            return _this.merchi.authenticatedFetch(resource, fetchOptions).
                then(function (data) {
                _this.fromJson(data, { makeDirty: true });
                return _this;
            });
        };
        return _this;
    }
    CartItem.resourceName = 'cart_items';
    CartItem.singularName = 'cartItem';
    CartItem.pluralName = 'cartItems';
    __decorate([
        CartItem.property({ type: Date }),
        __metadata("design:type", Object)
    ], CartItem.prototype, "archived", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "id", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "quantity", void 0);
    __decorate([
        CartItem.property({ type: String }),
        __metadata("design:type", Object)
    ], CartItem.prototype, "notes", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Date)
    ], CartItem.prototype, "creationDate", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", String)
    ], CartItem.prototype, "currency", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "subtotalCost", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "taxAmount", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "totalCost", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Product)
    ], CartItem.prototype, "product", void 0);
    __decorate([
        CartItem.property(),
        __metadata("design:type", Cart)
    ], CartItem.prototype, "cart", void 0);
    __decorate([
        CartItem.property({ embeddedByDefault: false }),
        __metadata("design:type", CountryTax)
    ], CartItem.prototype, "taxType", void 0);
    __decorate([
        CartItem.property({ arrayType: 'VariationsGroup' }),
        __metadata("design:type", Array)
    ], CartItem.prototype, "variationsGroups", void 0);
    __decorate([
        CartItem.property({ arrayType: 'Variation' }),
        __metadata("design:type", Array)
    ], CartItem.prototype, "variations", void 0);
    return CartItem;
}(Entity));
export { CartItem };
