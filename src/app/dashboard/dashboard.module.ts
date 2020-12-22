import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProductModule } from "../product/product.module";

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		RouterModule,
		DashboardRoutingModule,
		SharedModule,
		ProductModule,
	],
})
export class DashboardModule {}
