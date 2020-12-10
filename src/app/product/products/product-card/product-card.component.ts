import { Component, Input, OnInit } from "@angular/core";

import {
	faPlus,
	faSnowflake,
	faLeaf,
	faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "src/app/cart/cart-item.model";
import { CartService } from "src/app/cart/cart.service";
import { Product } from "../../product.model";

@Component({
	selector: "app-product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
	icons = {
		faPlus: faPlus,
		faSnowflake: faSnowflake,
		faLeaf: faLeaf,
		faShoppingBasket: faShoppingBasket,
	};

	@Input() product: Product;
	cartItem?: CartItem;

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.cartItem = this.cartService.find(this.product);
	}

	addToCart(): void {
		const item = this.cartService.addToCart(this.product);
		this.cartItem = item;
	}
}
