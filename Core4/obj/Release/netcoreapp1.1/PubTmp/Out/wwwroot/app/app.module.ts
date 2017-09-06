import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './components/app.component';
import { VehcileFormComponent } from './components/vehcile.component';
import { AboutComponent } from './components/about.compnent';
import { RouterModule, Routes } from '@angular/router';
import { AppErrorHandler } from "./app.error-handler";
import { VehcileListComponent } from "./components/vehcile-list";
import { PaginationComponent } from "./components/pagination.component";


Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();

const appRoutes: Routes = [
    {
        path: 'home/aboutus', component: AboutComponent
    },
    {
        path: 'vehciles/new', component: VehcileFormComponent
    },
    {
        path: 'vehciles/:id', component: VehcileFormComponent
    },
    {
        path: 'vehciles', component: VehcileListComponent
    },
    {
        path: 'home/index', component: VehcileListComponent
    },
     { path: '**', redirectTo: 'home' }

];

@NgModule({
    imports: [ToastyModule.forRoot(), RouterModule.forRoot(appRoutes), BrowserModule,
        FormsModule,
        HttpModule],
    declarations: [AppComponent, VehcileFormComponent, AboutComponent, VehcileListComponent, PaginationComponent],
    bootstrap: [AppComponent],
    providers: [
        { provide: ErrorHandler, useClass : AppErrorHandler }
    ]
  
  
})
export class AppModule { }
