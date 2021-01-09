import {
	Component,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { CartItem } from "../cart-item.model";
import { CartService } from "../cart.service";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/auth/auth.service";
import { OrderService } from "src/app/order/order.service";
import { Order } from "src/app/order/order.model";
import { CreateOrderDTO } from "src/app/order/dto/create-order.dto";
import { ModalService } from "src/app/shared/modal/modal.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
	cartItems: CartItem[] = [];
	private cartItemsSubscription: Subscription;

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	icons = {
		faBreadSlice,
	};

	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private orderService: OrderService,
		private modalService: ModalService
	) {}

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
			productItems: this.cartItems.map((item: CartItem) => {
				return {
					quantity: item.quantity,
					product: item.product.id,
				};
			}),
		};

		this.orderService.create(userID, dto).subscribe((order: Order) => {
			this.cartService.clear();

			const modal = this.modalService.createModal(
				AlertComponent,
				this.modalHost
			);
			modal.instance.title = "Bedankt voor uw bestelling";
		});
	}
}
