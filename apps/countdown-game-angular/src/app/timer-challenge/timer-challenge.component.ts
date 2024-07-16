import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostBinding,
  input,
  InputSignal,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultModalComponent } from '../result-modal/result-modal.component';

@Component({
  selector: 'app-timer-challenge',
  standalone: true,
  imports: [CommonModule, ResultModalComponent],
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

  protected remainingTimeMillis = computed(() => {
    const duration = this.durationTimeMillis();
    if (!duration) {
      return undefined;
    }

    return this.targetTimeMillis() - duration;
  });

  private timer?: number;

  @ViewChild(ResultModalComponent) resultModal!: ResultModalComponent;

  @HostBinding('class')
  protected get cssClass(): string {
    return 'challenge';
  }

  public constructor() {
    // effect(() => {
    //   if (this.startTime() && this.stopTime() && !this.timerStarted()) {
    //     this.resultModal.open();
    //   }
    // });
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

    this.resultModal.open();
  }
}
