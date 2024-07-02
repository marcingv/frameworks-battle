import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  @Input() public appButton: 'button' | 'text-button' = 'button';

  @HostBinding('class') public get cssClass(): string {
    return this.appButton;
  }
}
