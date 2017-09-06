"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Raven = require("raven-js");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_toasty_1 = require("ng2-toasty");
var app_component_1 = require("./components/app.component");
var vehcile_component_1 = require("./components/vehcile.component");
var about_compnent_1 = require("./components/about.compnent");
var router_1 = require("@angular/router");
var app_error_handler_1 = require("./app.error-handler");
var vehcile_list_1 = require("./components/vehcile-list");
var pagination_component_1 = require("./components/pagination.component");
Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();
var appRoutes = [
    {
        path: 'home/aboutus', component: about_compnent_1.AboutComponent
    },
    {
        path: 'vehciles/new', component: vehcile_component_1.VehcileFormComponent
    },
    {
        path: 'vehciles/:id', component: vehcile_component_1.VehcileFormComponent
    },
    {
        path: 'vehciles', component: vehcile_list_1.VehcileListComponent
    },
    {
        path: 'home/index', component: vehcile_list_1.VehcileListComponent
    },
    { path: '**', redirectTo: 'home' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [ng2_toasty_1.ToastyModule.forRoot(), router_1.RouterModule.forRoot(appRoutes), platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule],
        declarations: [app_component_1.AppComponent, vehcile_component_1.VehcileFormComponent, about_compnent_1.AboutComponent, vehcile_list_1.VehcileListComponent, pagination_component_1.PaginationComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            { provide: core_1.ErrorHandler, useClass: app_error_handler_1.AppErrorHandler }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map