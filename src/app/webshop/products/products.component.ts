import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { FilterProductDTO } from "src/app/shared/product/filter-product.dto";
import { ProductService } from "src/app/shared/product/product.service";
import { Product } from "../../shared/product/product.model";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	products: Product[];
	totalFound: number;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.findAllProducts();
		this.route.queryParams.subscribe((params: Params) => {
			this.findAllProducts();
		});
	}

	findAllProducts() {
		this.productService
			.findAll(this.route.snapshot.queryParams)
			.subscribe((products: FindAllResponse<Product>) => {
				this.products = products.result;
				this.totalFound = products.count;
			});
	}
}
