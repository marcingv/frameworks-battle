import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-labeled-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labeled-input.component.html',
  styleUrl: './labeled-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabeledInputComponent {
  @Input() public label?: string;

  protected ngControl = contentChild(NgControl);

  private control$ = toObservable(this.ngControl);
  private cssClasses$ = this.control$.pipe(
    switchMap((ngControl: NgControl | undefined) => {
      if (!ngControl || !ngControl.control) {
        return of({});
      }

      return ngControl.control.events.pipe(
        map(() => ({
          invalid: ngControl.dirty && ngControl.invalid,
        }))
      );
    })
  );

  protected cssClasses = toSignal(this.cssClasses$);
}
