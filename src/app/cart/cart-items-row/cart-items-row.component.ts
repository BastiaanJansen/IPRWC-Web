import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartItem } from "../cart-item.model";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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

	constructor() {}

	ngOnInit(): void {}

	removeFromCart(): void {
		this.remove.emit(this.item);
	}
}
