import * as Raven from 'raven-js';
import { ToastyService } from "ng2-toasty";
import { ErrorHandler, Inject, NgZone, Component, isDevMode } from "@angular/core";



export class AppErrorHandler implements ErrorHandler {

    //Raven.config('https://55c283ba3ad640a785d33b0aac706954@sentry.io/208882').install();


    constructor(
        //private raven: Raven,
        private ngZone: NgZone,
        @Inject(ToastyService) private ToastyService: ToastyService) {
    }

    handleError(error: any): void {
        //throw error;    
        debugger
        //if (!isDevMode)
            Raven.captureException(error.originalError || error)
     //   else
       //     throw error;
        
        
        this.ngZone.run(() => {            
            this.ToastyService.error({ title: 'Error', msg: 'An Unexpcted Error Has Occured', theme: 'bootstrap', showClose: true, timeout: 5000 });            
        });       
    }


}