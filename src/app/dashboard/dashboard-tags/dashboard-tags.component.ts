import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfirmModalComponent } from "src/app/shared/confirm-modal/confirm-modal.component";
import { OrderDirection } from "src/app/shared/filter";
import { FindAllResponse } from "src/app/shared/find-all-response";
import { ModalService } from "src/app/shared/modal/modal.service";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { SetTagModalComponent } from "src/app/tag/set-tag-modal/set-tag-modal.component";
import { Tag } from "src/app/tag/tag.model";
import { TagService } from "src/app/tag/tag.service";

@Component({
	selector: "app-dashboard-tags",
	templateUrl: "./dashboard-tags.component.html",
	styleUrls: ["./dashboard-tags.component.scss"],
})
export class DashboardTagsComponent implements OnInit {
	tags: FindAllResponse<Tag> = { result: [], count: 0 };

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	constructor(
		private tagService: TagService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.tagService.changedSubject.subscribe(() => {
			this.tags.result = [];
			this.fetchTags();
		});
		this.fetchTags();
	}

	fetchTags(skip: number = 0, take: number = 10): void {
		this.tagService
			.findAll({
				take,
				skip,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((tags: FindAllResponse<Tag>) => {
				this.tags.result.push(...tags.result);
				this.tags.count = tags.count;
			});
	}

	remove(tag: Tag): void {
		const modal = this.modalService.createModal(
			ConfirmModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			this.tagService.delete(tag.id).subscribe(() => {
				const index = this.tags.result.indexOf(tag);
				this.tags.result.splice(index, 1);
				this.tags.count--;
			});
		});
	}

	showModal(tag?: Tag): void {
		const modal = this.modalService.createModal(
			SetTagModalComponent,
			this.modalHost
		);
		modal.instance.tag = tag;
	}

	loadMore(): void {
		this.fetchTags(this.tags.result.length);
	}
}
