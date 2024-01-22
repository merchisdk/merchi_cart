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
import { Entity } from '../entity';
var EmailCounter = /** @class */ (function (_super) {
    __extends(EmailCounter, _super);
    function EmailCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailCounter.resourceName = 'email_counters';
    EmailCounter.singularName = 'emailCounter';
    EmailCounter.pluralName = 'emailCounters';
    EmailCounter.primaryKey = 'emailAddress';
    __decorate([
        EmailCounter.property(),
        __metadata("design:type", String)
    ], EmailCounter.prototype, "emailAddress", void 0);
    __decorate([
        EmailCounter.property(),
        __metadata("design:type", Boolean)
    ], EmailCounter.prototype, "unsubscribed", void 0);
    __decorate([
        EmailCounter.property(),
        __metadata("design:type", Boolean)
    ], EmailCounter.prototype, "silenced", void 0);
    __decorate([
        EmailCounter.property(),
        __metadata("design:type", Number)
    ], EmailCounter.prototype, "tokens", void 0);
    return EmailCounter;
}(Entity));
export { EmailCounter };
