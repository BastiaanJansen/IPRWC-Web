import { Component, OnInit } from "@angular/core";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ProductService } from "src/app/shared/product.service";
import { Product } from "../../shared/product.model";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	products: Product[];
	totalFound: number;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.productService
			.findAll()
			.subscribe((products: FindAllResponse<Product[]>) => {
				console.log(products);
				this.products = products.result;
				this.totalFound = products.count;
			});
	}
}
