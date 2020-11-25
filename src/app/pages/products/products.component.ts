import { Component, OnInit } from "@angular/core";
import { Product } from "./product.model";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	products: Product[] = [
		new Product(
			"Chiquita Bananen",
			1.99,
			"https://static.ah.nl/image-optimization/static/product/AHI_43545237303430353637_1_200x200_JPG.JPG?options=399,q85"
		),
		new Product(
			"Fuji appelen",
			2.19,
			"https://static.ah.nl/image-optimization/static/product/AHI_434d50313931333237_4_200x200_JPG.JPG?options=399,q85"
		),
		new Product(
			"Pizza",
			2.15,
			"https://static.ah.nl/static/product/AHI_43545239363736373939_1_LowRes_JPG.JPG?options=399,q85"
		),

		new Product(
			"Chiquita Bananen",
			1.99,
			"https://static.ah.nl/image-optimization/static/product/AHI_43545237303430353637_1_200x200_JPG.JPG?options=399,q85"
		),
		new Product(
			"Fuji appelen",
			2.19,
			"https://static.ah.nl/image-optimization/static/product/AHI_434d50313931333237_4_200x200_JPG.JPG?options=399,q85"
		),
		new Product(
			"Pizza",
			2.15,
			"https://static.ah.nl/static/product/AHI_43545239363736373939_1_LowRes_JPG.JPG?options=399,q85"
		),
	];

	constructor() {}

	ngOnInit(): void {}
}
