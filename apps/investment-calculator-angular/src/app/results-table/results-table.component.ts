import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  calculateTotalInterest,
  InvestmentRecord,
  totalCapitalInvestment,
} from '@gv-frameworks-battle/investment-calculator-domain';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsTableComponent {
  protected readonly calculateTotalInterest = calculateTotalInterest;
  protected readonly totalCapitalInvestment = totalCapitalInvestment;

  public data: InputSignal<InvestmentRecord[]> = input.required<InvestmentRecord[]>();
}
