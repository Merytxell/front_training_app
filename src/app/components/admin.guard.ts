import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticateService} from '../services/authenticate.service';


 @Injectable({
 providedIn: 'root'
 })
 export class AdminGuard implements CanActivate {

   constructor(private authService : AuthenticateService, private router : Router){}
   canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.authService.isAdmin()){
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    
  }
  
}
