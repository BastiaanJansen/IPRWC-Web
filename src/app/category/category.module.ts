import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetCategoryModalComponent } from "./set-category-modal/set-category-modal.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [SetCategoryModalComponent],
	imports: [CommonModule, SharedModule, FormsModule],
})
export class CategoryModule {}
