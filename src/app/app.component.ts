import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { CartService } from "./cart/cart.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	constructor(
		private cartService: CartService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.cartService.setFromLocalStorage();
		this.authService.autoLogin();
	}
}
