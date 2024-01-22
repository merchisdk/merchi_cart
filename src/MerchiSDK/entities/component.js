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
import { MerchiFile } from './file';
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
        _this.toReact = function (context) {
            var componentCode = 'with (this) { ' + _this.compiled + ' return ' +
                _this.name + ';}';
            var proxy = new Proxy(context, {});
            var callable = new Function(componentCode);
            return callable.call(proxy);
        };
        return _this;
    }
    Component.resourceName = 'components';
    Component.singularName = 'component';
    Component.pluralName = 'components';
    __decorate([
        Component.property({ type: Date }),
        __metadata("design:type", Object)
    ], Component.prototype, "archived", void 0);
    __decorate([
        Component.property({ type: Date }),
        __metadata("design:type", Date)
    ], Component.prototype, "created", void 0);
    __decorate([
        Component.property({ type: Date }),
        __metadata("design:type", Date)
    ], Component.prototype, "updated", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Number)
    ], Component.prototype, "id", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "isClassBased", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "outOfSyncWithOriginal", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "needsUpdate", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Number)
    ], Component.prototype, "hasImports", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "isClone", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "warnings", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", String)
    ], Component.prototype, "name", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", String)
    ], Component.prototype, "body", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", String)
    ], Component.prototype, "description", void 0);
    __decorate([
        Component.property(),
        __metadata("design:type", String)
    ], Component.prototype, "compiled", void 0);
    __decorate([
        Component.property({ type: 'Component' }),
        __metadata("design:type", Component)
    ], Component.prototype, "componentExport", void 0);
    __decorate([
        Component.property({ arrayType: 'Component' }),
        __metadata("design:type", Array)
    ], Component.prototype, "componentExports", void 0);
    __decorate([
        Component.property({ arrayType: 'Component' }),
        __metadata("design:type", Array)
    ], Component.prototype, "componentImports", void 0);
    __decorate([
        Component.property({ type: 'Component' }),
        __metadata("design:type", Component)
    ], Component.prototype, "originalComponent", void 0);
    __decorate([
        Component.property({ arrayType: 'MerchiFile' }),
        __metadata("design:type", Array)
    ], Component.prototype, "images", void 0);
    __decorate([
        Component.property({ type: MerchiFile }),
        __metadata("design:type", Object)
    ], Component.prototype, "featureImage", void 0);
    __decorate([
        Component.property({ arrayType: 'ComponentTag' }),
        __metadata("design:type", Array)
    ], Component.prototype, "tags", void 0);
    __decorate([
        Component.property({ type: 'User' }),
        __metadata("design:type", Object)
    ], Component.prototype, "createdBy", void 0);
    __decorate([
        Component.property({ type: 'User' }),
        __metadata("design:type", Object)
    ], Component.prototype, "updatedBy", void 0);
    __decorate([
        Component.property({ arrayType: 'ComponentVersion' }),
        __metadata("design:type", Array)
    ], Component.prototype, "versions", void 0);
    return Component;
}(Entity));
export { Component };
