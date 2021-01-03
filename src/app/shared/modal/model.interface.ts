import { EventEmitter } from "@angular/core";

export interface Modal {
    close: EventEmitter<null>;
}