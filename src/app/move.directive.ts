import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { KEY_CODE_ARRAY } from './constants/app.const';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective {
  @Output() move: EventEmitter<any> = new EventEmitter();

  constructor() { }

  // Host listner to catch keyboard arrows click events. 
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (KEY_CODE_ARRAY.includes(event.code)) {
      this.move.emit(event.code);
    }
  }
}
