import { Component } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router} from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: `/home/appComponent`
})


export class AppComponent {
    constructor(router: Router) {
    //    router.navigate(['vehciles']);
    }
}