import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../brand.model';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-set-brand-modal',
  templateUrl: './set-brand-modal.component.html',
  styleUrls: ['./set-brand-modal.component.scss']
})
export class SetBrandModalComponent implements OnInit {
    @Input() brand?: Brand;
    @Output() close = new EventEmitter();

    constructor(private brandService: BrandService) { }

    ngOnInit(): void {}

    closeModal(): void {
        this.close.emit();
    }

    create(form: NgForm): void {
        this.brandService.create({ name: form.value.name }).subscribe((brand: Brand) => {
            this.brandService.changedSubject.next(brand);
            this.closeModal();
        })
    }

    edit(form: NgForm): void {
        this.brandService.update(this.brand.id, { name: form.value.name }).subscribe((brand: Brand) => {
            this.brandService.changedSubject.next(brand);
            this.closeModal();
        })
    }

}
