import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { CartItem } from "src/app/cart/cart-item.model";
import { CartService } from "src/app/cart/cart.service";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
	totalItemsInCart: number;

	icons = {
		faShoppingBasket,
	};

	constructor(private cartService: CartService, public authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.cartService.itemsSubject.subscribe(() => {
			this.totalItemsInCart = this.cartService.getTotalItems();
		});
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate([""]);
	}
}
