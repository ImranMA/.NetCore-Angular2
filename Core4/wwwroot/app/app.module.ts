import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./components/vehcile/app.component";
import { VehcileFormComponent } from "./components/vehcile/vehcile.component";
import { AboutComponent } from "./components/vehcile/about.compnent";
import { VehcileListComponent } from "./components/vehcile/vehcile-list";
import { AppErrorHandler } from "./app.error-handler";
import { PaginationComponent } from "./components/vehcile/pagination.component";
import { ViewVehicleComponent } from "./components/vehcile/view-vehicle";





Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();

const appRoutes: Routes = [    
    {
        path: 'home/index', component: VehcileListComponent
    },   
    {
        path: 'home/about', component: VehcileListComponent
    },

    { path: 'vehicles/edit/:id', component: VehcileFormComponent },
    {
        path: 'vehciles/new', component: VehcileFormComponent
    },
    {
        path: 'vehciles/:id', component: ViewVehicleComponent
    },
    {
        path: 'vehciles', component: VehcileListComponent
    },    
    { path: '**', redirectTo: 'home/login' }

];

@NgModule({
    imports: [ToastyModule.forRoot(), RouterModule.forRoot(appRoutes), BrowserModule,
        FormsModule,
        HttpModule],
    declarations: [AppComponent, VehcileFormComponent, AboutComponent, VehcileListComponent, PaginationComponent, ViewVehicleComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: ErrorHandler, useClass : AppErrorHandler }
    ] 
  
})



export class AppModule { }
