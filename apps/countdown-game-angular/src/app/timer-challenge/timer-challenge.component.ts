import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  InputSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer-challenge.component.html',
  styleUrl: './timer-challenge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerChallengeComponent {
  public title: InputSignal<string> = input.required<string>();
  public targetTimeSecs: InputSignal<number> = input.required<number>();

  @HostBinding('class') protected get cssClass(): string {
    return 'challenge';
  }
}
