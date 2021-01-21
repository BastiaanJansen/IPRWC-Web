import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/category/category.model";
import { CategoryService } from "src/app/category/category.service";
import { SetCategoryModalComponent } from "src/app/category/set-category-modal/set-category-modal.component";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";

@Component({
	selector: "app-dashboard-categories",
	templateUrl: "./dashboard-categories.component.html",
	styleUrls: ["./dashboard-categories.component.scss"],
})
export class DashboardCategoriesComponent implements OnInit, OnDestroy {
	categories: FindAllResponse<Category> = { result: [], count: 0 };

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	private categorySubjectSubscription: Subscription;

	constructor(
		private categoryService: CategoryService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.categorySubjectSubscription = this.categoryService.changedSubject.subscribe(
			() => {
				this.categories.result = [];
				this.fetchCategories();
			}
		);
		this.fetchCategories();
	}

	fetchCategories(skip: number = 0, take: number = 10): void {
		this.categoryService
			.findAll({
				take,
				skip,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((categories: FindAllResponse<Category>) => {
				this.categories.result.push(...categories.result);
				this.categories.count = categories.count;
			});
	}

	remove(category: Category): void {
		const modal = this.modalService.createModal(
			ConfirmModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			this.categoryService.delete(category.id).subscribe(() => {
				const index = this.categories.result.indexOf(category);
				this.categories.result.splice(index, 1);
				this.categories.count--;
			});
		});
	}

	showModal(category?: Category): void {
		const modal = this.modalService.createModal(
			SetCategoryModalComponent,
			this.modalHost
		);
		modal.instance.category = category;
	}

	loadMore(): void {
		this.fetchCategories(this.categories.result.length);
	}

	ngOnDestroy(): void {
		this.categorySubjectSubscription.unsubscribe();
	}
}
