import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetTagModalComponent } from "./set-tag-modal/set-tag-modal.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [SetTagModalComponent],
    imports: [CommonModule, SharedModule, FormsModule],
    exports: [SetTagModalComponent]
})
export class TagModule {}
