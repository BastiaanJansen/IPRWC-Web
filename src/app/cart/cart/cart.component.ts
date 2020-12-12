import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartItem } from "../cart-item.model";
import { CartService } from "../cart.service";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { Product } from "src/app/product/product.model";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
	cartItems: CartItem[] = [];
	private cartItemsSubscription: Subscription;

	icons = {
		faBreadSlice,
	};

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.cartItemsSubscription = this.cartService.itemsSubject.subscribe(
			(items: CartItem[]) => {
				this.cartItems = items;
			}
		);
	}

	removeItemFromCart(cartItem: CartItem): void {
		this.cartService.remove(cartItem);
	}

	ngOnDestroy(): void {
		this.cartItemsSubscription.unsubscribe();
	}
}
