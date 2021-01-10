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
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";

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

	ngOnInit(): void {}
}
