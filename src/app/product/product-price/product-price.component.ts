import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-product-price",
	templateUrl: "./product-price.component.html",
	styleUrls: ["./product-price.component.scss"],
})
export class ProductPriceComponent implements OnInit {
	@Input() price: number;
	@Input() size: number = 32;

	constructor() {}

	ngOnInit(): void {}

	getEuros(): string {
		return this.price.toString().split(".")[0];
	}

	getCents(): string {
		return this.price.toString().split(".")[1];
	}
}
