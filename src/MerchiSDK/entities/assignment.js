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
import { Quote } from './quote';
import { Shipment } from './shipment';
import { SupplyDomain } from './supply_domain';
import { User } from './user';
var Assignment = /** @class */ (function (_super) {
    __extends(Assignment, _super);
    function Assignment() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.generateInvoice = function (props) {
            var resource = "/generate-invoice-for-assignment/".concat(_this.id, "/");
            var fetchOptions = { method: 'POST' };
            fetchOptions.query = [];
            if (props && props.addToInvoice) {
                fetchOptions.query.push(['add_to_invoice', String(props.addToInvoice)]);
            }
            return _this.merchi.authenticatedFetch(resource, fetchOptions).
                then(function (data) {
                var invoice = new _this.merchi.Invoice();
                invoice.fromJson(data);
                return invoice;
            });
        };
        return _this;
    }
    Assignment.resourceName = 'assignments';
    Assignment.singularName = 'assignment';
    Assignment.pluralName = 'assignments';
    __decorate([
        Assignment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "archived", void 0);
    __decorate([
        Assignment.property(),
        __metadata("design:type", Number)
    ], Assignment.prototype, "id", void 0);
    __decorate([
        Assignment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "managerAccepts", void 0);
    __decorate([
        Assignment.property({ type: Date }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "supplierRefused", void 0);
    __decorate([
        Assignment.property(),
        __metadata("design:type", Boolean)
    ], Assignment.prototype, "needsDrafting", void 0);
    __decorate([
        Assignment.property(),
        __metadata("design:type", Boolean)
    ], Assignment.prototype, "needsShipping", void 0);
    __decorate([
        Assignment.property(),
        __metadata("design:type", Date)
    ], Assignment.prototype, "productionDeadline", void 0);
    __decorate([
        Assignment.property(),
        __metadata("design:type", Date)
    ], Assignment.prototype, "assignmentDeadline", void 0);
    __decorate([
        Assignment.property({ type: String }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "notes", void 0);
    __decorate([
        Assignment.property({ type: 'Job' }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "job", void 0);
    __decorate([
        Assignment.property({ type: 'Job' }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "supplyJob", void 0);
    __decorate([
        Assignment.property({ type: User }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "supplier", void 0);
    __decorate([
        Assignment.property({ type: Quote }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "quote", void 0);
    __decorate([
        Assignment.property({ arrayType: 'ProductionComment' }),
        __metadata("design:type", Array)
    ], Assignment.prototype, "comments", void 0);
    __decorate([
        Assignment.property({ type: Shipment }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "shipment", void 0);
    __decorate([
        Assignment.property({ type: SupplyDomain }),
        __metadata("design:type", Object)
    ], Assignment.prototype, "supplyDomain", void 0);
    __decorate([
        Assignment.property({ arrayType: 'Notification' }),
        __metadata("design:type", Array)
    ], Assignment.prototype, "notifications", void 0);
    __decorate([
        Assignment.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Assignment.prototype, "productionFiles", void 0);
    return Assignment;
}(Entity));
export { Assignment };
