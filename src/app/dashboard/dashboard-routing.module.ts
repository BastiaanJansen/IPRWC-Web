import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { DashboardBrandsComponent } from "./dashboard-brands/dashboard-brands.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
	{
		path: "",
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "brands",
		component: DashboardBrandsComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
