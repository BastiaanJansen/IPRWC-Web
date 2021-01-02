import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ProductModule } from "../product/product.module";
import { TagModule } from "../tag/tag.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { OverviewItemComponent } from './overview-item/overview-item.component';
import { OverviewItemRowComponent } from './overview-item/overview-item-row/overview-item-row.component';

@NgModule({
	declarations: [DashboardComponent, OverviewItemComponent, OverviewItemRowComponent],
	imports: [
		CommonModule,
		RouterModule,
		DashboardRoutingModule,
		ProductModule,
		SharedModule,
		TagModule,
		FontAwesomeModule
	],
})
export class DashboardModule {}
