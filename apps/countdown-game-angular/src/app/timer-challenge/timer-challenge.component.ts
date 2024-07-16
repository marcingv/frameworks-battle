import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  InputSignal,
  Signal,
  signal,
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
  public targetTimeMillis: Signal<number> = computed(
    () => this.targetTimeSecs() * 1000
  );

  protected timerStarted = signal<boolean>(false);

  private startTime = signal<number | undefined>(undefined);
  private stopTime = signal<number | undefined>(undefined);
  private durationTimeMillis = computed(() => {
    const start = this.startTime();
    const stop = this.stopTime();

    if (!start || !stop) {
      return undefined;
    }

    return stop - start;
  });
  private remainingTimeMillis = computed(() => {
    const duration = this.durationTimeMillis();
    if (!duration) {
      return undefined;
    }

    return this.targetTimeMillis() - duration;
  });

  private timer?: number;

  @HostBinding('class')
  protected get cssClass(): string {
    return 'challenge';
  }

  protected startTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timerStarted.set(true);
    this.startTime.set(Date.now());
    this.stopTime.set(undefined);

    this.timer = setTimeout(() => {
      this.stopTimer();
    }, this.targetTimeMillis());
  }

  protected stopTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.timerStarted.set(false);
    this.stopTime.set(Date.now());
  }
}
