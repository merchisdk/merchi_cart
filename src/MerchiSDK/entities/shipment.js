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
import { Company } from './company';
import { CountryTax } from './country_tax';
import { Entity } from '../entity';
import { Quote } from './quote';
import { MerchiFile } from './file';
import { User } from './user';
import { ShipmentMethod } from './shipment_method';
var Shipment = /** @class */ (function (_super) {
    __extends(Shipment, _super);
    function Shipment() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.calculateSubTotal = function (options) {
            var _a = (options ? options : {}).strictEmbed, strictEmbed = _a === void 0 ? true : _a;
            if (strictEmbed) {
                if (_this.cost === undefined) {
                    throw new Error('cost is undefined, did you forget to embed it?');
                }
            }
            var cost = _this.cost ? _this.cost : 0;
            return parseFloat(String(cost)).toFixed(3);
        };
        _this.calculateTaxAmount = function (options) {
            var taxPercent = _this.taxType && _this.taxType.taxPercent ?
                _this.taxType.taxPercent : 0;
            var taxRate = taxPercent ? Number(taxPercent) / 100 : 0;
            return (parseFloat(_this.calculateSubTotal(options)) * taxRate).toFixed(3);
        };
        _this.calculateTotal = function (options) {
            return (parseFloat(_this.calculateSubTotal(options)) +
                parseFloat(_this.calculateTaxAmount(options))).toFixed(3);
        };
        return _this;
    }
    Shipment.resourceName = 'shipments';
    Shipment.singularName = 'shipment';
    Shipment.pluralName = 'shipments';
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "archived", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Number)
    ], Shipment.prototype, "id", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", String)
    ], Shipment.prototype, "name", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", String)
    ], Shipment.prototype, "shipmentServiceBookingInfo", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", String)
    ], Shipment.prototype, "shipmentServiceQuote", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Boolean)
    ], Shipment.prototype, "pickUp", void 0);
    __decorate([
        Shipment.property({ arrayType: 'InternalTag' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "internalTags", void 0);
    __decorate([
        Shipment.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "shipmentLabel", void 0);
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "creationDate", void 0);
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "dispatchedDate", void 0);
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "dispatchDate", void 0);
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "expectedReceiveDate", void 0);
    __decorate([
        Shipment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "receivedDate", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Boolean)
    ], Shipment.prototype, "senderResponsible", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "senderNotes", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "receiverNotes", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "transportCompany", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "transportCompanyName", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "trackingNumber", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "buyCost", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "buyCurrency", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "cost", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "taxAmount", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "maxWeight", void 0);
    __decorate([
        Shipment.property({ type: Number }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "maxVolume", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Boolean)
    ], Shipment.prototype, "sendSms", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Boolean)
    ], Shipment.prototype, "sendEmail", void 0);
    __decorate([
        Shipment.property({ type: CountryTax }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "taxType", void 0);
    __decorate([
        Shipment.property(),
        __metadata("design:type", Boolean)
    ], Shipment.prototype, "isOnBehalfOf", void 0);
    __decorate([
        Shipment.property({ type: User }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "onBehalfOf", void 0);
    __decorate([
        Shipment.property({ type: Company }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "onBehalfOfCompany", void 0);
    __decorate([
        Shipment.property({ type: User }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "sender", void 0);
    __decorate([
        Shipment.property({ type: Company }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "senderCompany", void 0);
    __decorate([
        Shipment.property({ type: Address }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "senderAddress", void 0);
    __decorate([
        Shipment.property({ type: String }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "blindShipTo", void 0);
    __decorate([
        Shipment.property({ type: User }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "receiver", void 0);
    __decorate([
        Shipment.property({ type: Company }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "receiverCompany", void 0);
    __decorate([
        Shipment.property({ type: Address }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "receiverAddress", void 0);
    __decorate([
        Shipment.property({ arrayType: 'Invoice' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "invoices", void 0);
    __decorate([
        Shipment.property({ type: Quote }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "quote", void 0);
    __decorate([
        Shipment.property({ type: ShipmentMethod }),
        __metadata("design:type", Object)
    ], Shipment.prototype, "shipmentMethod", void 0);
    __decorate([
        Shipment.property({ arrayType: 'DomainTag' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "tags", void 0);
    __decorate([
        Shipment.property({ arrayType: 'Assignment' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "assignments", void 0);
    __decorate([
        Shipment.property({ arrayType: 'ShipmentItem' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "items", void 0);
    __decorate([
        Shipment.property({ arrayType: 'Job' }),
        __metadata("design:type", Array)
    ], Shipment.prototype, "jobs", void 0);
    return Shipment;
}(Entity));
export { Shipment };
