import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetBrandModalComponent } from "./set-brand-modal/set-brand-modal.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [SetBrandModalComponent],
    imports: [CommonModule, SharedModule, FormsModule],
    exports: [SetBrandModalComponent]
})
export class BrandModule {}
