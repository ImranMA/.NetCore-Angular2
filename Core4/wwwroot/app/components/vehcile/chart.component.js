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
var ChartsComponent = (function () {
    function ChartsComponent() {
        this.data1 = {
            labels: ['BMW', 'AUDI', 'Mazda'],
            datasets: {
                data: [5, 3, 1]
            }
        };
        this.type = 'line';
        this.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        this.options = {
            responsive: true,
            maintainAspectRatio: false
        };
    }
    ChartsComponent.prototype.ngOnInit = function () {
        // this.checkScreenWidth();
    };
    return ChartsComponent;
}());
ChartsComponent = __decorate([
    core_1.Component({
        selector: "chart-view",
        templateUrl: "/home/Charts"
    }),
    __metadata("design:paramtypes", [])
], ChartsComponent);
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=chart.component.js.map