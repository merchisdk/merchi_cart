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
import { MerchiFile } from './file';
import { Job } from './job';
import { Product } from './product';
var DraftTemplate = /** @class */ (function (_super) {
    __extends(DraftTemplate, _super);
    function DraftTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraftTemplate.resourceName = 'draft_templates';
    DraftTemplate.singularName = 'draftTemplate';
    DraftTemplate.pluralName = 'draftTemplates';
    __decorate([
        DraftTemplate.property({ type: Date }),
        __metadata("design:type", Object)
    ], DraftTemplate.prototype, "archived", void 0);
    __decorate([
        DraftTemplate.property(),
        __metadata("design:type", Number)
    ], DraftTemplate.prototype, "id", void 0);
    __decorate([
        DraftTemplate.property({ type: Date }),
        __metadata("design:type", Object)
    ], DraftTemplate.prototype, "date", void 0);
    __decorate([
        DraftTemplate.property(),
        __metadata("design:type", String)
    ], DraftTemplate.prototype, "description", void 0);
    __decorate([
        DraftTemplate.property(),
        __metadata("design:type", String)
    ], DraftTemplate.prototype, "name", void 0);
    __decorate([
        DraftTemplate.property(),
        __metadata("design:type", Number)
    ], DraftTemplate.prototype, "height", void 0);
    __decorate([
        DraftTemplate.property(),
        __metadata("design:type", Number)
    ], DraftTemplate.prototype, "width", void 0);
    __decorate([
        DraftTemplate.property({ type: MerchiFile }),
        __metadata("design:type", MerchiFile)
    ], DraftTemplate.prototype, "file", void 0);
    __decorate([
        DraftTemplate.property({ type: Product }),
        __metadata("design:type", Object)
    ], DraftTemplate.prototype, "product", void 0);
    __decorate([
        DraftTemplate.property({ type: Job }),
        __metadata("design:type", Object)
    ], DraftTemplate.prototype, "job", void 0);
    return DraftTemplate;
}(Entity));
export { DraftTemplate };
