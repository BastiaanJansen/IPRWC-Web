import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs/operators";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
	product: Product;
	brandProducts: FindAllResponse<Product>;
	categoryProducts: FindAllResponse<Product>;
	relatedProducts: FindAllResponse<Product>;

	icons = {
		faChevronRight: faChevronRight,
		faPlus: faPlus,
	};

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.fetchProduct(params.id);
		});
	}

	fetchProduct(id: number): void {
		this.productService.findByID(id).subscribe((product: Product) => {
			this.product = product;

			this.fetchBrandProducts();
			this.fetchCategoryProducts();
		});
	}

	fetchBrandProducts(): void {
		this.productService
			.findAll({ brand: this.product.brand.id, take: 5 })
			.pipe(
				map((products: FindAllResponse<Product>) => {
					products.result = products.result.filter(
						(product) => product.id !== this.product.id
					);
					return products;
				})
			)
			.subscribe((products: FindAllResponse<Product>) => {
				this.brandProducts = products;
			});
	}

	fetchCategoryProducts(): void {
		this.productService
			.findAll({ category: this.product.category.id, take: 5 })
			.pipe(
				map((products: FindAllResponse<Product>) => {
					products.result = products.result.filter(
						(product) => product.id !== this.product.id
					);
					return products;
				})
			)
			.subscribe((products: FindAllResponse<Product>) => {
				this.categoryProducts = products;
			});
	}
}
