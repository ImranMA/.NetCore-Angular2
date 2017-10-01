"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var ProgressService = (function () {
    function ProgressService() {
    }
    // downloadProgress: Subject<any> = new Subject();
    ProgressService.prototype.startTracking = function () {
        this.uploadProgress = new Subject_1.Subject();
        return this.uploadProgress;
    };
    ProgressService.prototype.notify = function (progress) {
        if (this.uploadProgress)
            this.uploadProgress.next(progress);
    };
    ProgressService.prototype.endTracking = function () {
        if (this.uploadProgress)
            this.uploadProgress.complete();
    };
    return ProgressService;
}());
ProgressService = __decorate([
    core_1.Injectable()
], ProgressService);
exports.ProgressService = ProgressService;
var BrowserXhrWithProgress = (function (_super) {
    __extends(BrowserXhrWithProgress, _super);
    function BrowserXhrWithProgress(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    ;
    BrowserXhrWithProgress.prototype.build = function () {
        var _this = this;
        var xhr = _super.prototype.build.call(this);
        xhr.onprogress = function (event) {
            //  this.service.downloadProgress.next(this.CreateProgress(event));
        };
        xhr.upload.onprogress = function (event) {
            _this.service.notify(_this.CreateProgress(event));
            xhr.upload.onloadend = function () {
                _this.service.endTracking();
            };
        };
        return xhr;
    };
    BrowserXhrWithProgress.prototype.CreateProgress = function (event) {
        return {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
        };
    };
    return BrowserXhrWithProgress;
}(http_1.BrowserXhr));
BrowserXhrWithProgress = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ProgressService])
], BrowserXhrWithProgress);
exports.BrowserXhrWithProgress = BrowserXhrWithProgress;
//# sourceMappingURL=progress.service.js.map