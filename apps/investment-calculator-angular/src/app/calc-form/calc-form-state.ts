import { CalcParams } from '@gv-frameworks-battle/investment-calculator-domain';

export interface CalcFormState {
  isValid: boolean;
  errors?: string[];
  data?: CalcParams;
}
