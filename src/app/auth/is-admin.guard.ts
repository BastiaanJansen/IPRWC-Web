import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class IsAdminGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean | UrlTree {
		const isAdmin = this.authService.loginInfo.getValue()?.user.admin;
		if (!isAdmin) return this.router.createUrlTree(["/"]);
		return true;
	}
}
