import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartItem } from "../cart-item.model";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../cart.service";

@Component({
	selector: "app-cart-items-row",
	templateUrl: "./cart-items-row.component.html",
	styleUrls: ["./cart-items-row.component.scss"],
})
export class CartItemsRowComponent implements OnInit {
	@Input() item: CartItem;
	@Output() remove = new EventEmitter<CartItem>();

	icons = {
		faTrashAlt: faTrashAlt,
	};

	constructor(private cartService: CartService) {}

	ngOnInit(): void {}

	removeFromCart(): void {
		this.remove.emit(this.item);
	}

	changeQuantity(quantity: number): void {
		this.cartService.changeQuantity(this.item.product, quantity);
	}

	totalPrice(): string {
		return (this.item.quantity * this.item.product.price).toFixed(2);
	}
}
