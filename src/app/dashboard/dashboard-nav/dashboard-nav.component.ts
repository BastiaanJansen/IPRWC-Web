import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/auth/login-info.model";
import { User } from "src/app/user/user.model";

@Component({
	selector: "app-dashboard-nav",
	templateUrl: "./dashboard-nav.component.html",
	styleUrls: ["./dashboard-nav.component.scss"],
})
export class DashboardNavComponent implements OnInit {
	user: User;

	loginInfoSubscription: Subscription;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.loginInfoSubscription = this.authService.loginInfo.subscribe(
			(loginInfo: LoginInfo) => {
				this.user = loginInfo?.user;
			}
		);
	}

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate([""]);
	}

	ngOnDestroy(): void {
		this.loginInfoSubscription.unsubscribe();
	}
}
