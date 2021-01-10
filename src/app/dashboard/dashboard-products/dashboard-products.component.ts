import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "src/app/product/product.model";
import { ProductService } from "src/app/product/product.service";
import { SetProductModalComponent } from "src/app/product/set-product-modal/set-product-modal.component";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-dashboard-products",
	templateUrl: "./dashboard-products.component.html",
	styleUrls: ["./dashboard-products.component.scss"],
})
export class DashboardProductsComponent implements OnInit {
	products: FindAllResponse<Product> = { result: [], count: 0 };

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	constructor(
		private productService: ProductService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.productService.changedSubject.subscribe(() => {
			this.products.result = [];
			this.fetchProducts();
		});
		this.fetchProducts();
	}

	fetchProducts(skip: number = 0, take: number = 10): void {
		this.productService
			.findAll({
				take,
				skip,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((products: FindAllResponse<Product>) => {
				this.products.result.push(...products.result);
				this.products.count = products.count;
			});
	}

	remove(product: Product): void {
		const modal = this.modalService.createModal(
			ConfirmModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			this.productService.delete(product.id).subscribe(() => {
				const index = this.products.result.indexOf(product);
				this.products.result.splice(index, 1);
				this.products.count--;
			});
		});
	}

	showModal(product?: Product): void {
		const modal = this.modalService.createModal(
			SetProductModalComponent,
			this.modalHost
		);
		modal.instance.product = product;
	}

	loadMore(): void {
		this.fetchProducts(this.products.result.length);
	}
}
