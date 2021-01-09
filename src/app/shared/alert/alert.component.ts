import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Modal } from "../modal/model.interface";

@Component({
	selector: "app-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit, Modal {
	@Input() title: string;
	@Input() description: string;
	@Output() close = new EventEmitter();
	@Output() confirmed = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	closeModal = (): void => this.close.emit();

	confirm(): void {
		this.closeModal();
		this.confirmed.emit();
	}
}
