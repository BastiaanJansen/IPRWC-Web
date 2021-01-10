import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/auth/login-info.model";
import { CartItem } from "src/app/cart/cart-item.model";
import { CartService } from "src/app/cart/cart.service";
import { User } from "src/app/user/user.model";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit, OnDestroy {
	totalItemsInCart: number;
	user: User;

	itemsSubscription: Subscription;
	loginInfoSubscription: Subscription;

	icons = {
		faShoppingBasket,
	};

	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.loginInfoSubscription = this.authService.loginInfo.subscribe(
			(loginInfo: LoginInfo) => {
				this.user = loginInfo?.user;
			}
		);

		this.itemsSubscription = this.cartService.itemsSubject.subscribe(() => {
			this.totalItemsInCart = this.cartService.getTotalItems();
		});
	}

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate([""]);
	}

	ngOnDestroy(): void {
		this.itemsSubscription.unsubscribe();
		this.loginInfoSubscription.unsubscribe();
	}
}
