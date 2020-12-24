import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs/operators";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "src/app/cart/cart-item.model";
import { CartService } from "src/app/cart/cart.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	product: Product;
	brandProducts: FindAllResponse<Product>;
	categoryProducts: FindAllResponse<Product>;
	relatedProducts: FindAllResponse<Product>;
	cartItem?: CartItem;

	itemsSubjectSubscription: Subscription;

	icons = {
		faChevronRight: faChevronRight,
		faPlus: faPlus,
	};

	constructor(
		private productService: ProductService,
		private cartService: CartService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(async (params: Params) => {
			this.fetchProduct(params.id);
		});
	}

	addToCart(): void {
		this.cartItem = this.cartService.addToCart(this.product);
	}

	private fetchProduct(id: number): void {
		this.productService.findByID(id).subscribe((product: Product) => {
			this.product = product;

			this.fetchBrandProducts();
			this.fetchCategoryProducts();

			this.itemsSubjectSubscription = this.cartService.itemsSubject.subscribe(
				() => {
					this.cartItem = this.cartService.find(this.product);
				}
			);
		});
	}

	private fetchBrandProducts(): void {
		this.productService
			.findAll({ brand: this.product.brand.id, take: 5 })
			.pipe(
				map((products: FindAllResponse<Product>) => {
					products.result = products.result.filter(
						(product: Product) => this.showInRecommended(product)
					);
					return products;
				})
			)
			.subscribe((products: FindAllResponse<Product>) => {
				this.brandProducts = products;
			});
	}

	private fetchCategoryProducts(): void {
		this.productService
			.findAll({ category: this.product.category.id, take: 5 })
			.pipe(
				map((products: FindAllResponse<Product>) => {
					products.result = products.result.filter(
						(product: Product) => this.showInRecommended(product)
					);
					return products;
				})
			)
			.subscribe((products: FindAllResponse<Product>) => {
				this.categoryProducts = products;
			});
	}

	private showInRecommended(product: Product): boolean {
		if (
			this.product.id === product.id ||
			this.isInBrandProducts(product) ||
			this.isInCategoryProducts(product)
		)
			return false;

		return true;
	}

	private isInBrandProducts(product: Product): boolean {
		return (
			this.brandProducts?.result.find(
				(p: Product) => p.id === product.id
			) !== undefined
		);
	}

	private isInCategoryProducts(product: Product): boolean {
		return (
			this.categoryProducts?.result.find(
				(p: Product) => p.id === product.id
			) !== undefined
		);
	}

	ngOnDestroy(): void {
		this.itemsSubjectSubscription.unsubscribe();
	}
}
