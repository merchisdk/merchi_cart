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
import { ShipmentMethod } from './shipment_method';
import { Entity } from '../entity';
import { ShipmentService } from '../constants/shipment_services';
var CartShipmentQuote = /** @class */ (function (_super) {
    __extends(CartShipmentQuote, _super);
    function CartShipmentQuote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartShipmentQuote.resourceName = 'cart_shipment_quotes';
    CartShipmentQuote.singularName = 'cartShipmentQuote';
    CartShipmentQuote.pluralName = 'cartShipmentQuotes';
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", Number)
    ], CartShipmentQuote.prototype, "id", void 0);
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", String)
    ], CartShipmentQuote.prototype, "name", void 0);
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", Number)
    ], CartShipmentQuote.prototype, "subtotalCost", void 0);
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", Number)
    ], CartShipmentQuote.prototype, "taxAmount", void 0);
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", Number)
    ], CartShipmentQuote.prototype, "totalCost", void 0);
    __decorate([
        CartShipmentQuote.property({ type: ShipmentService }),
        __metadata("design:type", Object)
    ], CartShipmentQuote.prototype, "shipmentService", void 0);
    __decorate([
        CartShipmentQuote.property(),
        __metadata("design:type", String)
    ], CartShipmentQuote.prototype, "shipmentServiceQuote", void 0);
    __decorate([
        CartShipmentQuote.property({ type: 'ShipmentMethod' }),
        __metadata("design:type", ShipmentMethod)
    ], CartShipmentQuote.prototype, "shipmentMethod", void 0);
    return CartShipmentQuote;
}(Entity));
export { CartShipmentQuote };
