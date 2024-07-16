import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultModalComponent {
  public targetTimeMillis = input.required<number>();
  public remainingTimeMillis = input<number | undefined>(undefined);

  protected result = computed(() => {
    const remainingTimeMillis = this.remainingTimeMillis();
    if (remainingTimeMillis === undefined) {
      return undefined;
    }

    return remainingTimeMillis <= 0 ? 'lost' : 'won';
  });

  protected targetTimeSecs = computed(
    () => +(this.targetTimeMillis() / 1000).toFixed(2)
  );

  protected remainingSeconds = computed(() => {
    let remainingSeconds = 0;
    const remainingTimeMillis = this.remainingTimeMillis();
    if (remainingTimeMillis && remainingTimeMillis >= 0) {
      remainingSeconds = +(remainingTimeMillis / 1000).toFixed(2);
    }

    return remainingSeconds;
  });

  protected score = computed(() => {
    let remainingTimeMillis = this.remainingTimeMillis();
    remainingTimeMillis = remainingTimeMillis ?? this.targetTimeMillis();

    return Math.round(
      (1 - remainingTimeMillis / this.targetTimeMillis()) * 100
    );
  });

  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;

  public open(): void {
    this.dialog.nativeElement.showModal();
  }

  public close(): void {
    this.dialog.nativeElement.close();
  }
}
