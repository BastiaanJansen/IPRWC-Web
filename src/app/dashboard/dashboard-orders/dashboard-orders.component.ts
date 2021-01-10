import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderItem } from "src/app/order/order-item/order-item.model";
import { Order } from "src/app/order/order.model";
import { OrderService } from "src/app/order/order.service";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-dashboard-orders",
	templateUrl: "./dashboard-orders.component.html",
	styleUrls: ["./dashboard-orders.component.scss"],
})
export class DashboardOrdersComponent implements OnInit {
	orders: FindAllResponse<Order> = { result: [], count: 0 };

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	constructor(
		private orderService: OrderService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.orderService.changedSubject.subscribe(() => this.fetchOrders());
		this.fetchOrders();
	}

	fetchOrders(skip: number = 0, take: number = 5): void {
		this.orderService
			.findAll({
				take,
				skip,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((orders: FindAllResponse<Order>) => {
				this.orders.result.push(...orders.result);
				this.orders.count = orders.count;
			});
	}

	totalPrice(order: Order): string {
		const prices = order.items.map(
			(item: OrderItem) => item.quantity * item.product.price
		);

		return prices.reduce((prev, curr) => prev + curr).toFixed(2);
	}

	remove(order: Order): void {
		const modal = this.modalService.createModal(
			ConfirmModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			this.orderService.delete(order.id).subscribe(() => {
				const index = this.orders.result.indexOf(order);
				this.orders.result.splice(index, 1);
				this.orders.count--;
			});
		});
	}

	loadMore(): void {
		this.fetchOrders(this.orders.result.length);
	}
}
