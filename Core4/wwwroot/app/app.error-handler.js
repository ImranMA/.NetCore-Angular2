"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ng2_toasty_1 = require("ng2-toasty");
var core_1 = require("@angular/core");
var AppErrorHandler = (function () {
    //Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();
    function AppErrorHandler(
        //private raven: Raven,
        ngZone, ToastyService) {
        this.ngZone = ngZone;
        this.ToastyService = ToastyService;
    }
    AppErrorHandler.prototype.handleError = function (error) {
        var _this = this;
        //throw error;    
        debugger;
        //if (!isDevMode)
        //  Raven.captureException(error.originalError || error)
        //   else
        //     throw error;
        this.ngZone.run(function () {
            _this.ToastyService.error({ title: 'Error', msg: 'An Unexpcted Error Has Occured', theme: 'bootstrap', showClose: true, timeout: 5000 });
        });
    };
    return AppErrorHandler;
}());
AppErrorHandler = __decorate([
    __param(1, core_1.Inject(ng2_toasty_1.ToastyService)),
    __metadata("design:paramtypes", [core_1.NgZone,
        ng2_toasty_1.ToastyService])
], AppErrorHandler);
exports.AppErrorHandler = AppErrorHandler;
//# sourceMappingURL=app.error-handler.js.map