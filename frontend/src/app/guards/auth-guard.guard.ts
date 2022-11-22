import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {
    autenticado: boolean = false;
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.acessVerification();
    }

    private acessVerification(){
        if(this.authService.isAuthenticated()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    canLoad(route: Route) {
        return this.acessVerification();
    }
    
}
