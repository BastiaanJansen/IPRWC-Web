import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartItem } from "../cart-item.model";
import { CartService } from "../cart.service";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { Product } from "src/app/product/product.model";
import { AuthService } from "src/app/auth/auth.service";
import { OrderService } from "src/app/order/order.service";
import { Order } from "src/app/order/order.model";
import { CreateOrderDTO } from "src/app/order/dto/create-order.dto";

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

	constructor(private cartService: CartService, private authService: AuthService, private orderService: OrderService) {}

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

	userIsLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	order(): void {
		const userID: number = this.authService.loginInfo.getValue().user.id;
		const dto: CreateOrderDTO = {
			productID: []
		}

		this.orderService.create(userID, dto).subscribe((order: Order) => {
			console.log(order);
		})
	}
}
