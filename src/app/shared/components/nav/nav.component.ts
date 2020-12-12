import { Component, OnInit } from "@angular/core";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
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

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.cartService.itemsSubject.subscribe(() => {
			this.totalItemsInCart = this.cartService.getTotalItems();
		});
	}
}
