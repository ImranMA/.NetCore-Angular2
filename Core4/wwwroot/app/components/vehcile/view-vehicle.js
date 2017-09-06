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
Object.defineProperty(exports, "__esModule", { value: true });
var ng2_toasty_1 = require("ng2-toasty");
var vehcile_service_1 = require("../../services/vehcile/vehcile.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ViewVehicleComponent = (function () {
    function ViewVehicleComponent(route, router, toasty, vehicleService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.toasty = toasty;
        this.vehicleService = vehicleService;
        route.params.subscribe(function (p) {
            _this.vehicleId = +p['id'];
            if (isNaN(_this.vehicleId) || _this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }
    ViewVehicleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vehicleService.getVehcile(this.vehicleId)
            .subscribe(function (v) { return _this.vehicle = v; }, function (err) {
            if (err.status == 404) {
                _this.router.navigate(['/vehicles']);
                return;
            }
        });
    };
    ViewVehicleComponent.prototype.delete = function () {
        var _this = this;
        if (confirm("are you sure?")) {
            this.vehicleService.delete(this.vehicle.id).subscribe(function (x) {
                _this.router.navigate(['/vehciles']);
            });
        }
    };
    return ViewVehicleComponent;
}());
ViewVehicleComponent = __decorate([
    core_1.Component({
        templateUrl: '/home/ViewVehcile',
        providers: [
            vehcile_service_1.vehcileService, ng2_toasty_1.ToastyService
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        ng2_toasty_1.ToastyService,
        vehcile_service_1.vehcileService])
], ViewVehicleComponent);
exports.ViewVehicleComponent = ViewVehicleComponent;
//# sourceMappingURL=view-vehicle.js.map