import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../product.model";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
	icons = {
		faPlus: faPlus,
	};

	@Input() product: Product;

	constructor() {}

	ngOnInit(): void {}

	getEuros(): string {
		return this.product.price.toString().split(".")[0];
	}

	getCents(): string {
		return this.product.price.toString().split(".")[1];
	}
}
