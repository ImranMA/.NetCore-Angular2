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
var core_1 = require("@angular/core");
var vehcile_service_1 = require("../../services/vehcile/vehcile.service");
var auth_service_1 = require("../../services/vehcile/auth.service");
var VehcileListComponent = (function () {
    function VehcileListComponent(vechileService, auth) {
        this.vechileService = vechileService;
        this.auth = auth;
        this.PAGE_SIZE = 10;
        this.queryResult = {};
        this.query = {
            MakeId: null,
            pageSize: this.PAGE_SIZE
        };
        this.columns = [
            { title: 'Id' },
            { title: 'Make', key: 'make', isSortable: true },
            { title: 'Model', key: 'model', isSortable: false },
            { title: 'Contact Name', key: 'contactName', isSortable: true },
            {}
        ];
    }
    VehcileListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //For client side filtering
        //this.vechileService.getVehciles(this.filter).subscribe(vehciles => this.myvehciles = this.allVehciles = vehciles);
        // this.vechileService.getVehciles(this.filter).subscribe(vehciles => this.myvehciles = this.allVehciles = vehciles);
        this.populateVehciles();
        this.vechileService.getMakes().subscribe(function (makes) { return _this.makes = makes; });
    };
    VehcileListComponent.prototype.populateVehciles = function () {
        var _this = this;
        this.vechileService.getVehciles(this.query).subscribe(function (result) {
            _this.queryResult = result;
        });
    };
    VehcileListComponent.prototype.onFilterChange = function () {
        this.query.page = 1;
        //    this.query.pageSize = this.PAGE_SIZE;
        this.populateVehciles();
        //If client side filtering
        //this.myvehciles. = this.filter.MakeId;
        /*var vehciles = this.allVehciles;

        if (this.filter.MakeId)
            vehciles = vehciles.filter(v => v.make.id == this.filter.MakeId);

        this.myvehciles = vehciles;
        */
    };
    VehcileListComponent.prototype.resetFilter = function () {
        debugger;
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehciles();
    };
    VehcileListComponent.prototype.sortBy = function (columnName) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        }
        else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehciles();
    };
    VehcileListComponent.prototype.onPageChange = function (page) {
        this.query.page = page;
        this.populateVehciles();
    };
    return VehcileListComponent;
}());
VehcileListComponent = __decorate([
    core_1.Component({
        selector: "vehcile-list",
        templateUrl: "/home/VehcileList",
        providers: [
            vehcile_service_1.vehcileService
        ]
    }),
    __metadata("design:paramtypes", [vehcile_service_1.vehcileService, auth_service_1.AuthService])
], VehcileListComponent);
exports.VehcileListComponent = VehcileListComponent;
//# sourceMappingURL=vehcile-list.js.map