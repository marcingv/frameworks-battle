import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalcFormComponent } from './calc-form/calc-form.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import {
  CalcParams,
  calculateInvestmentResults,
  INITIAL_CALC_PARAMS,
} from '@gv-frameworks-battle/investment-calculator-domain';
import { JsonPipe } from '@angular/common';
import { CalcFormState } from './calc-form/calc-form-state';

@Component({
  standalone: true,
  imports: [HeaderComponent, CalcFormComponent, ResultsTableComponent, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected initialCalcParams: WritableSignal<Partial<CalcParams>> = signal<Partial<CalcParams>>(INITIAL_CALC_PARAMS);
  protected formState: WritableSignal<CalcFormState | null> = signal<CalcFormState | null>(null);
  protected formError: Signal<string | null> = computed(() => {
    const errors = this.formState()?.errors ?? [];

    return errors.length ? errors[0] : null;
  });
  protected formData: Signal<CalcParams | null> = computed(() => this.formState()?.data ?? null);
  protected investmentsData = computed(() => {
    const calcParams = this.formData();

    return calcParams ? calculateInvestmentResults(calcParams) : null;
  });

  protected formStateChanged($event: CalcFormState): void {
    this.formState.set($event);
  }
}
