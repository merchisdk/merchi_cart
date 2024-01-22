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
import { Domain } from './domain';
import { Entity } from '../entity';
import { User } from './user';
import { Role } from '../constants/roles';
import { DomainType } from '../constants/domain_types';
var EnrolledDomain = /** @class */ (function (_super) {
    __extends(EnrolledDomain, _super);
    function EnrolledDomain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnrolledDomain.prototype.getRole = function () {
        if (this.domain === undefined) {
            var err = 'domain is undefined, did you forget to embed it?';
            throw new Error(err);
        }
        if (this.domain.domainType === DomainType.DOMAIN_SUPPLIER) {
            return Role.SUPPLIER;
        }
        return this.role ? this.role : Role.PUBLIC;
    };
    EnrolledDomain.resourceName = 'enrolled_domains';
    EnrolledDomain.singularName = 'enrolledDomain';
    EnrolledDomain.pluralName = 'enrolledDomains';
    __decorate([
        EnrolledDomain.property({ type: Date }),
        __metadata("design:type", Object)
    ], EnrolledDomain.prototype, "archived", void 0);
    __decorate([
        EnrolledDomain.property(),
        __metadata("design:type", Number)
    ], EnrolledDomain.prototype, "id", void 0);
    __decorate([
        EnrolledDomain.property(),
        __metadata("design:type", Boolean)
    ], EnrolledDomain.prototype, "isJobsAssignee", void 0);
    __decorate([
        EnrolledDomain.property(),
        __metadata("design:type", Number)
    ], EnrolledDomain.prototype, "role", void 0);
    __decorate([
        EnrolledDomain.property(),
        __metadata("design:type", User)
    ], EnrolledDomain.prototype, "user", void 0);
    __decorate([
        EnrolledDomain.property(),
        __metadata("design:type", Domain)
    ], EnrolledDomain.prototype, "domain", void 0);
    return EnrolledDomain;
}(Entity));
export { EnrolledDomain };
