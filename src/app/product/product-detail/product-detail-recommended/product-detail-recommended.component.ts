import { Component, Input, OnInit } from "@angular/core";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Product } from "../../product.model";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Params } from "@angular/router";

@Component({
	selector: "app-product-detail-recommended",
	templateUrl: "./product-detail-recommended.component.html",
	styleUrls: ["./product-detail-recommended.component.scss"],
})
export class ProductDetailRecommendedComponent implements OnInit {
	@Input() products: FindAllResponse<Product>;
	@Input() currentProduct: Product;
	@Input() title: string;
	@Input() linkQueryParams: Params;

	icons = {
		faChevronRight: faChevronRight,
	};

	constructor() {}

	ngOnInit(): void {}

	areMoreProducts(): boolean {
		return this.products.count > this.products.result.length + 1;
	}
}
