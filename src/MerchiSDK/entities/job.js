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
import { Assignment } from './assignment';
import { Company } from './company';
import { CountryTax } from './country_tax';
import { Domain } from './domain';
import { EmailAddress } from './email_address';
import { Entity } from '../entity';
import { Invoice } from './invoice';
import { PhoneNumber } from './phone_number';
import { Product } from './product';
import { Shipment } from './shipment';
import { User } from './user';
import { InventoryStatus } from '../constants/inventory_statuses';
var Job = /** @class */ (function (_super) {
    __extends(Job, _super);
    function Job() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.getQuote = function () {
            var resource = '/specialised-order-estimate/';
            var data = _this.toFormData({ excludeOld: false });
            var fetchOptions = { method: 'POST', body: data };
            fetchOptions.query = [];
            fetchOptions.query.push(['skip_rights', 'y']);
            // insert product id to query for debug purposes
            fetchOptions.query.push([
                'product_id',
                _this.product.id ? _this.product.id.toString() : 'null'
            ]);
            return _this.merchi.authenticatedFetch(resource, fetchOptions).
                then(function (data) {
                _this.fromJson(data, { makeDirty: true });
                return _this;
            });
        };
        _this.deduct = function (matchingInventories) {
            var resource = "/jobs/".concat(_this.id, "/deduct/");
            var inventoriesNeedToBeDeducted = matchingInventories.map(function (matchingInventory) { return matchingInventory.inventory.id; });
            var embed = { matchingInventories: { inventory: {}, group: {} } };
            var data = new FormData();
            data.append('inventories', JSON.stringify(inventoriesNeedToBeDeducted));
            var fetchOptions = {
                method: 'POST',
                body: data,
                query: [['embed', JSON.stringify(embed)]]
            };
            return _this.merchi.authenticatedFetch(resource, fetchOptions).
                then(function (data) {
                _this.fromJson(data);
                return _this;
            });
        };
        _this.bulkDeduct = function () {
            if (_this.matchingInventories === undefined) {
                var err = 'matchingInventories is undefined, did you forget to embed' +
                    ' it?';
                throw new Error(err);
            }
            return _this.deduct(_this.matchingInventories);
        };
        return _this;
    }
    Job.resourceName = 'jobs';
    Job.singularName = 'job';
    Job.pluralName = 'jobs';
    __decorate([
        Job.property({ type: Date }),
        __metadata("design:type", Object)
    ], Job.prototype, "archived", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Number)
    ], Job.prototype, "id", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Number)
    ], Job.prototype, "jobType", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Number)
    ], Job.prototype, "quantity", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", String)
    ], Job.prototype, "currency", void 0);
    __decorate([
        Job.property({ type: String }),
        __metadata("design:type", Object)
    ], Job.prototype, "notes", void 0);
    __decorate([
        Job.property({ type: String }),
        __metadata("design:type", Object)
    ], Job.prototype, "productionNotes", void 0);
    __decorate([
        Job.property({ type: String }),
        __metadata("design:type", Object)
    ], Job.prototype, "shopifyShopUrl", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", String)
    ], Job.prototype, "shopifyOrderId", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", String)
    ], Job.prototype, "shopifyOrderLineItemId", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "productionStatus", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "designStatus", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "supplyChainRequestStatus", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsDrafting", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsGroupBuy", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsProduction", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsShipping", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsInvoicing", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsInventory", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "needsSupplyChainRequest", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "showProductionFilesToClient", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "allowClientDraftContribution", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "quoteSet", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "jobInfoApprovedByClient", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "groupBuyStatus", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "paymentStatus", void 0);
    __decorate([
        Job.property({ type: Date }),
        __metadata("design:type", Object)
    ], Job.prototype, "deductionDate", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "shippingStatus", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "completed", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", String)
    ], Job.prototype, "callToActions", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Array)
    ], Job.prototype, "callToActionDetails", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Number)
    ], Job.prototype, "priority", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "jobWeight", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "jobVolume", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Date)
    ], Job.prototype, "received", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Date)
    ], Job.prototype, "deadline", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Date)
    ], Job.prototype, "updated", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Date)
    ], Job.prototype, "groupBuyProductionStarted", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "automaticPriceEnabled", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "dropShip", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "pickUp", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "costPerUnit", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "cost", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "taxAmount", void 0);
    __decorate([
        Job.property({ type: Number }),
        __metadata("design:type", Object)
    ], Job.prototype, "totalCost", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "inventoriesStatus", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadJobInfoNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadJobDraftingNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadJobProductionNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadJobShippingNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "unreadJobInvoicingNotificationsCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Boolean)
    ], Job.prototype, "limitedStock", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Number)
    ], Job.prototype, "inventoryCount", void 0);
    __decorate([
        Job.property({ embeddedByDefault: false }),
        __metadata("design:type", Boolean)
    ], Job.prototype, "inventorySufficient", void 0);
    __decorate([
        Job.property({ arrayType: 'Draft' }),
        __metadata("design:type", Array)
    ], Job.prototype, "drafts", void 0);
    __decorate([
        Job.property({ arrayType: 'Draft' }),
        __metadata("design:type", Array)
    ], Job.prototype, "sharedDrafts", void 0);
    __decorate([
        Job.property({ arrayType: 'Draft' }),
        __metadata("design:type", Array)
    ], Job.prototype, "ownDrafts", void 0);
    __decorate([
        Job.property({ arrayType: 'JobComment' }),
        __metadata("design:type", Array)
    ], Job.prototype, "comments", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", User)
    ], Job.prototype, "client", void 0);
    __decorate([
        Job.property({ type: User }),
        __metadata("design:type", Object)
    ], Job.prototype, "manager", void 0);
    __decorate([
        Job.property({ type: User }),
        __metadata("design:type", Object)
    ], Job.prototype, "designer", void 0);
    __decorate([
        Job.property({ type: Company }),
        __metadata("design:type", Object)
    ], Job.prototype, "clientCompany", void 0);
    __decorate([
        Job.property({ type: PhoneNumber }),
        __metadata("design:type", Object)
    ], Job.prototype, "clientPhone", void 0);
    __decorate([
        Job.property({ type: EmailAddress }),
        __metadata("design:type", Object)
    ], Job.prototype, "clientEmail", void 0);
    __decorate([
        Job.property({ type: PhoneNumber }),
        __metadata("design:type", Object)
    ], Job.prototype, "clientCompanyPhone", void 0);
    __decorate([
        Job.property({ type: EmailAddress }),
        __metadata("design:type", Object)
    ], Job.prototype, "clientCompanyEmail", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Product)
    ], Job.prototype, "product", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Product)
    ], Job.prototype, "supplyChainRequestProduct", void 0);
    __decorate([
        Job.property({ arrayType: 'DraftComment' }),
        __metadata("design:type", Array)
    ], Job.prototype, "draftComments", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Number)
    ], Job.prototype, "preDraftCommentsCount", void 0);
    __decorate([
        Job.property({ type: CountryTax }),
        __metadata("design:type", Object)
    ], Job.prototype, "taxType", void 0);
    __decorate([
        Job.property({ arrayType: 'InternalTag' }),
        __metadata("design:type", Array)
    ], Job.prototype, "internalTags", void 0);
    __decorate([
        Job.property({ arrayType: 'DomainTag' }),
        __metadata("design:type", Array)
    ], Job.prototype, "tags", void 0);
    __decorate([
        Job.property({ arrayType: 'Product' }),
        __metadata("design:type", Array)
    ], Job.prototype, "createdProducts", void 0);
    __decorate([
        Job.property({ type: Address }),
        __metadata("design:type", Object)
    ], Job.prototype, "shipping", void 0);
    __decorate([
        Job.property({ type: Address }),
        __metadata("design:type", Object)
    ], Job.prototype, "productionShippingAddress", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Domain)
    ], Job.prototype, "domain", void 0);
    __decorate([
        Job.property({ type: Invoice }),
        __metadata("design:type", Object)
    ], Job.prototype, "invoice", void 0);
    __decorate([
        Job.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Job.prototype, "productionFiles", void 0);
    __decorate([
        Job.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Job.prototype, "clientFiles", void 0);
    __decorate([
        Job.property({ type: Shipment }),
        __metadata("design:type", Object)
    ], Job.prototype, "shipment", void 0);
    __decorate([
        Job.property({ arrayType: 'MatchingInventory' }),
        __metadata("design:type", Array)
    ], Job.prototype, "matchingInventories", void 0);
    __decorate([
        Job.property({ arrayType: 'VariationsGroup' }),
        __metadata("design:type", Array)
    ], Job.prototype, "variationsGroups", void 0);
    __decorate([
        Job.property({ arrayType: 'Variation' }),
        __metadata("design:type", Array)
    ], Job.prototype, "variations", void 0);
    __decorate([
        Job.property({ arrayType: 'Notification' }),
        __metadata("design:type", Array)
    ], Job.prototype, "notifications", void 0);
    __decorate([
        Job.property({ arrayType: 'Assignment' }),
        __metadata("design:type", Array)
    ], Job.prototype, "assignments", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Assignment)
    ], Job.prototype, "supplyAssignment", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Job)
    ], Job.prototype, "supplyJob", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "hasValidVolume", void 0);
    __decorate([
        Job.property(),
        __metadata("design:type", Boolean)
    ], Job.prototype, "hasValidWeight", void 0);
    return Job;
}(Entity));
export { Job };
