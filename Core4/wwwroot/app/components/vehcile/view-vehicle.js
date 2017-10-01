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
var photo_service_1 = require("../../services/vehcile/photo.service");
var progress_service_1 = require("../../services/vehcile/progress.service");
var http_1 = require("@angular/http");
var ViewVehicleComponent = (function () {
    function ViewVehicleComponent(zone, route, router, toasty, photoService, progressService, vehicleService) {
        var _this = this;
        this.zone = zone;
        this.route = route;
        this.router = router;
        this.toasty = toasty;
        this.photoService = photoService;
        this.progressService = progressService;
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
        this.photoService.getPhotos(this.vehicleId).
            subscribe(function (photos) { return _this.photos = photos; });
        this.vehicleService.getVehcile(this.vehicleId)
            .subscribe(function (v) { return _this.vehicle = v; }, function (err) {
            if (err.status == 404) {
                _this.router.navigate(['/vehicles']);
                return;
            }
        });
    };
    ViewVehicleComponent.prototype.uploadPhoto = function () {
        var _this = this;
        this.progressService.startTracking()
            .subscribe(function (progress) {
            console.log(progress);
            _this.zone.run(function () {
                _this.progress = progress;
            });
            // this.progress = progress; //angular is not aware of this change so it wont show the progress bar, we need to run this in zone
        }, null, function () { _this.progress = null; });
        var nativeElement = this.fileInput.nativeElement;
        var file = nativeElement.files[0];
        nativeElement.value = '';
        this.photoService.upload(this.vehicleId, file)
            .subscribe(function (photo) {
            _this.photos.push(photo);
        }, function (err) {
            debugger;
            _this.toasty.error({ title: 'Error', msg: err.text(), theme: 'bootstrap', showClose: true, timeout: 5000 });
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
__decorate([
    core_1.ViewChild("fileInput"),
    __metadata("design:type", core_1.ElementRef)
], ViewVehicleComponent.prototype, "fileInput", void 0);
ViewVehicleComponent = __decorate([
    core_1.Component({
        templateUrl: '/home/ViewVehcile',
        providers: [
            vehcile_service_1.vehcileService, ng2_toasty_1.ToastyService, { provide: http_1.BrowserXhr, useClass: progress_service_1.BrowserXhrWithProgress }, progress_service_1.ProgressService
        ]
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        router_1.ActivatedRoute,
        router_1.Router,
        ng2_toasty_1.ToastyService,
        photo_service_1.PhotoService,
        progress_service_1.ProgressService,
        vehcile_service_1.vehcileService])
], ViewVehicleComponent);
exports.ViewVehicleComponent = ViewVehicleComponent;
//# sourceMappingURL=view-vehicle.js.map