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
var _ = require("underscore");
var core_1 = require("@angular/core");
var ng2_toasty_1 = require("ng2-toasty");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/Observable/forkJoin");
var vehcile_service_1 = require("../../services/vehcile/vehcile.service");
//Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();
var VehcileFormComponent = (function () {
    function VehcileFormComponent(route, router, vechileService, ToastyService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.vechileService = vechileService;
        this.ToastyService = ToastyService;
        this.myvehcile = {
            id: 0,
            makeId: 0,
            modelId: 0,
            isRegistered: false,
            features: [],
            contact: {
                name: '',
                phone: '',
                email: ''
            }
        };
        route.params.subscribe(function (p) {
            _this.myvehcile.id = +p['id'];
        });
    }
    VehcileFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sources = [
            this.vechileService.getMakes(),
            this.vechileService.getFeatures()
        ];
        if (this.myvehcile.id) {
            sources.push(this.vechileService.getVehcile(this.myvehcile.id));
        }
        Observable_1.Observable.forkJoin(sources).subscribe(function (data) {
            _this.makes = data[0];
            _this.features = data[1];
            if (_this.myvehcile.id)
                _this.setVehcile(data[2]);
            _this.populdateModels();
        }, function (err) {
            if (err.status == 404)
                _this.router.navigate(['/home/index']);
        });
        /*
    
        .subscribe(v => {
            this.myvehcile = v
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/home/index'])
        });
    
   .subscribe(makes => {
        this.makes = makes;
    })


    .subscribe(feature => {
        this.features = feature ;
    })*/
    };
    VehcileFormComponent.prototype.populdateModels = function () {
        var _this = this;
        var SelectedMake = this.makes.find(function (m) { return m.id == _this.myvehcile.makeId; });
        this.models = SelectedMake ? SelectedMake.models : [];
    };
    VehcileFormComponent.prototype.setVehcile = function (v) {
        this.myvehcile.id = v.id;
        this.myvehcile.makeId = v.make.id;
        this.myvehcile.modelId = v.model.id;
        this.myvehcile.isRegistered = v.isRegistered;
        this.myvehcile.contact = v.contact;
        this.myvehcile.features = _.pluck(v.features, 'id');
    };
    VehcileFormComponent.prototype.onMakeChange = function () {
        this.populdateModels();
        delete this.myvehcile.modelId;
        // this.vehcile.Name = SelectedMake.name;
    };
    VehcileFormComponent.prototype.onFeatureToggle = function (featureId, $event) {
        if ($event.target.checked)
            this.myvehcile.features.push(featureId);
        else {
            var index = this.myvehcile.features.indexOf(featureId);
            this.myvehcile.features.splice(index, 1);
        }
    };
    VehcileFormComponent.prototype.submit = function () {
        var _this = this;
        //Raven.captureException(new Error(""));
        //this.ToastyService.error({ title: 'Error', msg: 'An unexpacte', theme: 'bootstrap', showClose: true, timeout: 5000 });
        //this.ToastyService.error({ title: 'Error', msg: 'An unexpacte', theme: 'bootstrap', showClose: true, timeout: 5000 });
        if (this.myvehcile.id) {
            this.vechileService.update(this.myvehcile).subscribe(function (x) {
                _this.ToastyService.success({ title: 'Success', msg: 'Vehcile Updated Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });
            });
        }
        else {
            this.vechileService.create(this.myvehcile).subscribe(function (x) {
                _this.ToastyService.success({ title: 'Success', msg: 'Vehcile created Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });
            }, function (err) {
                _this.ToastyService.error({ title: 'Error', msg: 'error somehitng', theme: 'bootstrap', showClose: true, timeout: 5000 });
            });
            //   this.vechileService.create(this.myvehcile).subscribe(
            //     this.ToastyService.success({ title: 'Success', msg: 'Vehcile Added Successfully', theme: 'bootstrap', showClose: true, timeout: 5000 });
            // );
        }
    };
    VehcileFormComponent.prototype.delete = function () {
        var _this = this;
        if (confirm("are you sure?")) {
            this.vechileService.delete(this.myvehcile.id).subscribe(function (x) {
                _this.router.navigate(['home/index']);
            });
        }
    };
    return VehcileFormComponent;
}());
VehcileFormComponent = __decorate([
    core_1.Component({
        selector: "mvc",
        templateUrl: '/home/vehcile',
        providers: [
            vehcile_service_1.vehcileService, ng2_toasty_1.ToastyService
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        vehcile_service_1.vehcileService,
        ng2_toasty_1.ToastyService])
], VehcileFormComponent);
exports.VehcileFormComponent = VehcileFormComponent;
//# sourceMappingURL=vehcile.component.js.map