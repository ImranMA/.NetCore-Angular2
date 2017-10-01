// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService) { }


    canActivate() {
        if (this.auth.isAuthenticated())
            return true;


        this.auth.login();
        return false;
    }


}