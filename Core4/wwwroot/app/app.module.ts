import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./components/vehcile/app.component";
import { VehcileFormComponent } from "./components/vehcile/vehcile.component";
import { AboutComponent } from "./components/vehcile/about.compnent";
import { VehcileListComponent } from "./components/vehcile/vehcile-list";
import { AppErrorHandler } from "./app.error-handler";
import { PaginationComponent } from "./components/vehcile/pagination.component";
import { ViewVehicleComponent } from "./components/vehcile/view-vehicle";
import { PhotoService } from "./services/vehcile/photo.service";
import { BrowserXhrWithProgress, ProgressService } from "./services/vehcile/progress.service";
import { AuthService } from "./services/vehcile/auth.service";
import { vehcileService } from "./services/vehcile/vehcile.service";
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
import { AuthGuard } from "./services/vehcile/auth-guard.service";
import { ChartModule } from "angular2-chartjs";
import { ChartsComponent } from "./components/vehcile/chart.component";






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
        path: 'vehciles/new', component: VehcileFormComponent, canActivate : [AuthGuard]
    },
    {
        path: 'charts', component: ChartsComponent  
    },
    {
        path: 'vehciles/:id', component: ViewVehicleComponent
    },
    {
        path: 'vehciles', component: VehcileListComponent
    },    
    { path: '**', redirectTo: 'home/index' },
    {
        path: '', redirectTo: 'home/index', pathMatch: 'full'
    }

];

@NgModule({
    imports: [ToastyModule.forRoot(), RouterModule.forRoot(appRoutes), BrowserModule   ,
        FormsModule,
        HttpModule, ChartModule ],
    declarations: [AppComponent, VehcileFormComponent, AboutComponent, VehcileListComponent, PaginationComponent, ViewVehicleComponent, ChartsComponent ],
    bootstrap: [AppComponent],
    providers: [
        AuthGuard,vehcileService, AuthService, PhotoService, { provide: ErrorHandler, useClass: AppErrorHandler },
      //  { provide: BrowserXhr, useClass: BrowserXhrWithProgress },ProgressService
    ] 
  
})



export class AppModule { }
