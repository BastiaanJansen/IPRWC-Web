import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Modal } from "../modal/model.interface";

@Component({
	selector: "app-confirm-modal",
	templateUrl: "./confirm-modal.component.html",
	styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnInit, Modal {
	@Input() title: string = "Weet u het zeker?";
	@Input() description: string;
	@Output() close = new EventEmitter();
	@Output() confirmed = new EventEmitter();
	@Output() rejected = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	closeModal = (): void => this.close.emit();

	confirm(): void {
		this.closeModal();
		this.confirmed.emit();
	}

	reject(): void {
		this.closeModal();
		this.rejected.emit();
	}
}
