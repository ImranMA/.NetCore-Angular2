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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var vehcileService = (function () {
    function vehcileService(http) {
        this.http = http;
        this.vechilesEndPoint = '/api/vehciles';
    }
    vehcileService.prototype.getMakes = function () {
        return this.http.get('/api/makes')
            .map(function (res) { return res.json(); });
    };
    vehcileService.prototype.getFeatures = function () {
        return this.http.get('/api/Featrues')
            .map(function (res) { return res.json(); });
    };
    vehcileService.prototype.create = function (vehcile) {
        //debugger
        // let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append('Accept', 'application/json');
        //let body = JSON.stringify(vehcile);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //let toAdd = JSON.stringify(vehcile);
        if (isNaN(parseFloat(vehcile.id)))
            delete vehcile.id;
        var body = {
            id: NaN,
            contact: {
                name: 'David johnn',
                phone: 'david@g.com',
                email: '04553'
            },
            features: [2, 3],
            isRegistered: true,
            modelId: "2",
            makeId: "2",
        };
        //  vehcile = body;
        return this.http.post('/api/vehciles', vehcile).map(function (res) { return res.json(); });
    };
    vehcileService.prototype.getVehcile = function (id) {
        return this.http.get('/api/vehciles/' + id).map(function (res) { return res.json(); });
    };
    vehcileService.prototype.getVehciles = function (filter) {
        //filter = JSON.stringify(filter);
        //return this.http.get(this.vechilesEndPoint + '?filterresource=' + filterresource).map(res => res.json());
        return this.http.get(this.vechilesEndPoint + '?' + this.toQueryString(filter)).map(function (res) { return res.json(); });
    };
    vehcileService.prototype.toQueryString = function (obj) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }
        return parts.join('&');
    };
    vehcileService.prototype.update = function (vehcile) {
        return this.http.put('/api/vehciles/' + vehcile.id, vehcile)
            .map(function (res) { return res.json(); });
    };
    vehcileService.prototype.delete = function (id) {
        return this.http.delete('/api/vehciles/' + id)
            .map(function (res) { return res.json(); });
    };
    return vehcileService;
}());
vehcileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], vehcileService);
exports.vehcileService = vehcileService;
//# sourceMappingURL=vehcile.service.js.map