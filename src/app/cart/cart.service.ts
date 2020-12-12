import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Product } from "../product/product.model";
import { CartItem } from "./cart-item.model";

@Injectable({
	providedIn: "root",
})
export class CartService {
	private items: CartItem[] = [];
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

		this.saveItemsInLocalStorage();

		return this.find(product);
	}

	remove(cartItem: CartItem): void {
		const index = this.items.findIndex(
			(item) => item.product == cartItem.product
		);
		this.items.splice(index, 1);
		this.saveItemsInLocalStorage();
	}

	find(product: Product): CartItem {
		return this.items.find(
			(item: CartItem) => item.product.id === product.id
		);
	}

	changeQuantity(product: Product, newQuantity: number): void {
		const item = this.find(product);
		item.quantity = newQuantity;
		this.itemsSubject.next(this.items);
		this.saveItemsInLocalStorage();
	}

	setFromLocalStorage(): void {
		const items = JSON.parse(localStorage.getItem("cartItems"));
		if (items) {
			this.items = items;
			this.itemsSubject.next(this.items);
		}
	}

	getTotalItems(): number {
		return this.items.reduce(
			(total: number, item: CartItem) => total + item.quantity,
			0
		);
	}

	private addQuantity(product: Product): void {
		const currentQuantity = this.getQuantity(product);
		this.changeQuantity(product, currentQuantity + 1);
	}

	private getQuantity(product: Product): number {
		return this.find(product).quantity;
	}

	private saveItemsInLocalStorage(): void {
		localStorage.setItem("cartItems", JSON.stringify(this.items));
	}
}
