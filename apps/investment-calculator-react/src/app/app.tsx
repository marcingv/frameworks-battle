import './app.css';
import Header from './header/header';
import CalcForm from './calc-form/calc-form';
import ResultsTable from './results-table/results-table';
import { useState } from 'react';
import {
  CalcParams,
  calculateInvestmentResults,
  InvestmentRecord,
} from '@gv-frameworks-battle/investment-calculator-domain';

export function App() {
  const INITIAL_CALC_PARAMS: Partial<CalcParams> = {
    initialInvestment: 15000,
    annualInvestment: 900,
    expectedReturn: 6,
    duration: 10,
  };
  const [calcParams, setCalcParams] = useState<Partial<CalcParams>>(INITIAL_CALC_PARAMS);
  let formError: string | null = null;
  const results: InvestmentRecord[] | null = validate(calcParams)
    ? calculateInvestmentResults(calcParams as CalcParams)
    : null;

  function validate(params: Partial<CalcParams>): boolean {
    if (
      params.initialInvestment === undefined ||
      params.annualInvestment === undefined ||
      params.expectedReturn === undefined ||
      params.duration === undefined
    ) {
      formError = 'Please fill the form.';

      return false;
    }

    if (params.duration < 1) {
      formError = 'Duration should be grater than 0.';

      return false;
    }

    return true;
  }

  return (
    <>
      <Header />
      <CalcForm userInput={calcParams ?? INITIAL_CALC_PARAMS} onUserInputChange={(params) => setCalcParams(params)} />

      {formError && <p className="center">{formError}</p>}
      {results && <ResultsTable data={results} />}
    </>
  );
}

export default App;
