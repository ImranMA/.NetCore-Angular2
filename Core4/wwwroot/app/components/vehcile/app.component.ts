import { Component } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { AuthService } from "../../services/vehcile/auth.service";

@Component({
    selector: 'my-app',
    templateUrl: `/home/appComponent`
})


export class AppComponent {
    constructor(private auth: AuthService) {
        //    router.navigate(['vehciles']);
        auth.handleAuthentication();
    }

    LoginUser() {
        debugger
        this.auth.login();
        
    }

    


}