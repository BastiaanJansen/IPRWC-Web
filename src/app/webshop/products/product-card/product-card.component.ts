import { Component, Input, OnInit } from "@angular/core";

import { faPlus, faSnowflake, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { Product } from "src/app/shared/product/product.model";

@Component({
	selector: "app-product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
	icons = {
		faPlus: faPlus,
		faSnowflake: faSnowflake,
		faLeaf: faLeaf,
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
