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
import { Address } from './address';
import { Company } from './company';
import { Domain } from './domain';
import { Entity } from '../entity';
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.requiresShipment = function () {
            var e_1, _a;
            if (_this.cartItems === undefined) {
                throw 'cartItems is undefined, did you forget to embed it?';
            }
            try {
                for (var _b = __values(_this.cartItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cartItem = _c.value;
                    if (cartItem.requiresShipment()) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        return _this;
    }
    Cart.resourceName = 'carts';
    Cart.singularName = 'cart';
    Cart.pluralName = 'carts';
    __decorate([
        Cart.property({ type: Date }),
        __metadata("design:type", Object)
    ], Cart.prototype, "archived", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "id", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Date)
    ], Cart.prototype, "creationDate", void 0);
    __decorate([
        Cart.property({ type: Date }),
        __metadata("design:type", Object)
    ], Cart.prototype, "ip", void 0);
    __decorate([
        Cart.property({ type: String }),
        __metadata("design:type", Object)
    ], Cart.prototype, "token", void 0);
    __decorate([
        Cart.property({ type: String }),
        __metadata("design:type", Object)
    ], Cart.prototype, "receiverNotes", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", String)
    ], Cart.prototype, "currency", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "cartItemsSubtotalCost", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "cartItemsTaxAmount", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "cartItemsTotalCost", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "shipmentTotalCost", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "subtotalCost", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "taxAmount", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Number)
    ], Cart.prototype, "totalCost", void 0);
    __decorate([
        Cart.property({ type: 'User' }),
        __metadata("design:type", Object)
    ], Cart.prototype, "client", void 0);
    __decorate([
        Cart.property({ type: Company }),
        __metadata("design:type", Object)
    ], Cart.prototype, "clientCompany", void 0);
    __decorate([
        Cart.property(),
        __metadata("design:type", Domain)
    ], Cart.prototype, "domain", void 0);
    __decorate([
        Cart.property({ type: 'Invoice' }),
        __metadata("design:type", Object)
    ], Cart.prototype, "invoice", void 0);
    __decorate([
        Cart.property({ type: Address }),
        __metadata("design:type", Object)
    ], Cart.prototype, "receiverAddress", void 0);
    __decorate([
        Cart.property({ arrayType: 'CartItem' }),
        __metadata("design:type", Array)
    ], Cart.prototype, "cartItems", void 0);
    __decorate([
        Cart.property({ arrayType: 'CartShipmentGroup' }),
        __metadata("design:type", Array)
    ], Cart.prototype, "shipmentGroups", void 0);
    return Cart;
}(Entity));
export { Cart };
