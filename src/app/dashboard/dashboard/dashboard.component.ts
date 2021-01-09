import {
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	OnInit,
	Type,
	ViewChild,
} from "@angular/core";
import { Brand } from "src/app/brand/brand.model";
import { BrandService } from "src/app/brand/brand.service";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { Product } from "src/app/product/product.model";
import { ProductService } from "src/app/product/product.service";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { Tag } from "src/app/tag/tag.model";
import { TagService } from "src/app/tag/tag.service";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SetBrandModalComponent } from "src/app/brand/set-brand-modal/set-brand-modal.component";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { SetTagModalComponent } from "src/app/tag/set-tag-modal/set-tag-modal.component";
import { Modal } from "src/app/shared/modal/model.interface";
import { SetCategoryModalComponent } from "src/app/category/set-category-modal/set-category-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { SetProductModalComponent } from "src/app/product/set-product-modal/set-product-modal.component";
import { ModalService } from "src/app/shared/modal/modal.service";
import { Order } from "src/app/order/order.model";
import { OrderService } from "src/app/order/order.service";
import { OrderItem } from "src/app/order/order-item/order-item.model";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	take: number = 7;

	orders: FindAllResponse<Order>;
	products: FindAllResponse<Product>;
	brands: FindAllResponse<Brand>;
	categories: FindAllResponse<Category>;
	tags: FindAllResponse<Tag>;

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	icons = { faPen, faTrash };

	constructor(
		private orderService: OrderService,
		private productService: ProductService,
		private brandService: BrandService,
		private categoryService: CategoryService,
		private tagService: TagService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		// Register for changes
		this.productService.changedSubject.subscribe(() =>
			this.fetchProducts()
		);
		this.brandService.changedSubject.subscribe(() => this.fetchBrands());
		this.categoryService.changedSubject.subscribe(() =>
			this.fetchCategories()
		);
		this.tagService.changedSubject.subscribe(() => this.fetchTags());

		// Fetch current state
		this.fetchOrders();
		this.fetchProducts();
		this.fetchBrands();
		this.fetchCategories();
		this.fetchTags();
	}

	fetchOrders(): void {
		this.orderService
			.findAll({
				take: this.take,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((orders: FindAllResponse<Order>) => {
				this.orders = orders;
			});
	}

	fetchProducts(): void {
		this.productService
			.findAll({
				take: this.take,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((products: FindAllResponse<Product>) => {
				this.products = products;
			});
	}

	fetchBrands(): void {
		this.brandService
			.findAll({
				take: this.take,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((brands: FindAllResponse<Brand>) => {
				this.brands = brands;
			});
	}

	fetchCategories(): void {
		this.categoryService
			.findAll({
				take: this.take,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((categories: FindAllResponse<Category>) => {
				this.categories = categories;
			});
	}

	fetchTags(): void {
		this.tagService
			.findAll({
				take: this.take,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((tags: FindAllResponse<Tag>) => {
				this.tags = tags;
			});
	}

	showTagModal(tag?: Tag): void {
		const modal = this.modalService.createModal(
			SetTagModalComponent,
			this.modalHost
		);
		modal.instance.tag = tag;
	}

	removeTag(tag: Tag): void {
		this.tagService.delete(tag.id).subscribe(() => {
			const index = this.tags.result.indexOf(tag);
			this.tags.result.splice(index, 1);
			this.tags.count--;
		});
	}

	removeBrand(brand: Brand): void {
		this.brandService.delete(brand.id).subscribe(() => {
			const index = this.brands.result.indexOf(brand);
			this.brands.result.splice(index, 1);
			this.brands.count--;
		});
	}

	showBrandModal(brand?: Brand): void {
		const modal = this.modalService.createModal(
			SetBrandModalComponent,
			this.modalHost
		);
		modal.instance.brand = brand;
	}

	removeCategory(category: Category): void {
		this.categoryService.delete(category.id).subscribe(() => {
			const index = this.categories.result.indexOf(category);
			this.categories.result.splice(index, 1);
			this.categories.count--;
		});
	}

	removeProduct(product: Product): void {
		this.productService.delete(product.id).subscribe(() => {
			const index = this.products.result.indexOf(product);
			this.products.result.splice(index, 1);
			this.products.count--;
		});
	}

	showProductModal(product?: Product): void {
		const modal = this.modalService.createModal(
			SetProductModalComponent,
			this.modalHost
		);
		modal.instance.product = product;
	}

	showCategoryModal(category?: Category): void {
		const modal = this.modalService.createModal(
			SetCategoryModalComponent,
			this.modalHost
		);
		modal.instance.category = category;
	}

	totalPrice(order: Order): string {
		const prices = order.items.map(
			(item: OrderItem) => item.quantity * item.product.price
		);

		return prices.reduce((prev, curr) => prev + curr).toFixed(2);
	}
}
