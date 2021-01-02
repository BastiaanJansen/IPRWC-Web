import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tag } from '../tag.model';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-set-tag-modal',
  templateUrl: './set-tag-modal.component.html',
  styleUrls: ['./set-tag-modal.component.scss']
})
export class SetTagModalComponent implements OnInit {
    @Input() tag?: Tag;
    @Output() closeModal = new EventEmitter();

    constructor(private tagService: TagService) { }

    ngOnInit(): void {}

    close(): void {
        this.closeModal.emit();
    }

    create(form: NgForm): void {
        this.tagService.create({ name: form.value.tag }).subscribe((tag: Tag) => {
            this.tagService.tagChangedSubject.next(tag);
            this.close();
        })
    }

    edit(form: NgForm): void {
        this.tagService.edit(this.tag.id, { name: form.value.tag }).subscribe((tag: Tag) => {
            this.tagService.tagChangedSubject.next(tag);
            this.close();
        })
    }
}
