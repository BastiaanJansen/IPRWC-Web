import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-sidebar-item",
	templateUrl: "./sidebar-item.component.html",
	styleUrls: ["./sidebar-item.component.scss"],
})
export class SidebarItemComponent implements OnInit {
	icons = {
		faChevronDown: faChevronDown,
	};

	@Input() name: string;
	@Input() closed: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	toggleView(): void {
		this.closed = !this.closed;
	}
}
