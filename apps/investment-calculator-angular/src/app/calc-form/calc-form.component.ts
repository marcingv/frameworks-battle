import { ChangeDetectionStrategy, Component, effect, model, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalcParams } from '@gv-frameworks-battle/investment-calculator-domain';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, tap } from 'rxjs';
import { CalcFormState } from './calc-form-state';

@Component({
  selector: 'app-calc-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calc-form.component.html',
  styleUrl: './calc-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalcFormComponent implements OnInit {
  protected formGroup = new FormGroup({
    initialInvestment: new FormControl<number | null>(null, [Validators.required]),
    annualInvestment: new FormControl<number | null>(null, [Validators.required]),
    expectedReturn: new FormControl<number | null>(null, [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  public userInput = model<Partial<CalcParams>>();
  public onFormStateChange = output<CalcFormState>();

  public constructor() {
    effect(() => {
      const formValue = this.userInput();
      if (formValue) {
        this.formGroup.patchValue(formValue, { emitEvent: false });
      }
    });

    this.formGroup.valueChanges
      .pipe(
        tap((value) => {
          this.userInput.set({
            initialInvestment: value.initialInvestment ?? undefined,
            annualInvestment: value.annualInvestment ?? undefined,
            expectedReturn: value.expectedReturn ?? undefined,
            duration: value.duration ?? undefined,
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe();

    this.formGroup.valueChanges
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => this.onFormStateChange.emit(this.getFormState())),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  public ngOnInit(): void {
    const formValue = this.userInput();
    if (formValue) {
      this.formGroup.patchValue(formValue, { emitEvent: false });
    }
    this.onFormStateChange.emit(this.getFormState());
  }

  public getFormState(): CalcFormState {
    let data: CalcParams | undefined;
    if (this.formGroup.valid) {
      data = {
        initialInvestment: this.formGroup.controls.initialInvestment.value!,
        annualInvestment: this.formGroup.controls.annualInvestment.value!,
        expectedReturn: this.formGroup.controls.expectedReturn.value!,
        duration: this.formGroup.controls.duration.value!,
      };
    }

    return {
      isValid: this.formGroup.valid,
      errors: this.readErrorsMessages(),
      data: data,
    };
  }

  private readErrorsMessages(): string[] {
    const errors: string[] = [];

    if (Object.values(this.formGroup.value).some((oneProperty) => oneProperty === undefined || oneProperty === null)) {
      errors.push('Please fill the form.');
    }
    if (this.formGroup.controls.duration.errors && this.formGroup.controls.duration.errors['min']) {
      errors.push('Duration should be grater than 0.');
    }

    return errors;
  }
}
