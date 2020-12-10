import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Product } from "../product/product.model";
import { CartItem } from "./cart-item.model";

@Injectable({
	providedIn: "root",
})
export class CartService {
	items: CartItem[] = [];
	itemsSubject: BehaviorSubject<CartItem[]>;

	constructor(private http: HttpClient) {
		this.itemsSubject = new BehaviorSubject<CartItem[]>(this.items);
	}

	addToCart(product: Product): CartItem {
		const productInCart = this.find(product);

		if (productInCart) {
			this.addQuantity(product);
		} else {
			const quantity = 1;

			this.items.push({ product, quantity });
		}

		this.itemsSubject.next(this.items);
		return this.find(product);
	}

	private getQuantity(product: Product): number {
		return this.find(product).quantity;
	}

	private changeQuantity(product: Product, newQuantity: number): void {
		const item = this.find(product);
		item.quantity = newQuantity;
		this.itemsSubject.next(this.items);
	}

	find(product: Product): CartItem {
		return this.items.find(
			(item: CartItem) => item.product.id === product.id
		);
	}

	addQuantity(product: Product): void {
		const currentQuantity = this.getQuantity(product);
		this.changeQuantity(product, currentQuantity + 1);
	}

	subtractQuantity(product: Product): void {
		const currentQuantity = this.getQuantity(product);
		this.changeQuantity(product, currentQuantity - 1);
	}
}
