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
  const INITIAL_CALC_PARAMS: CalcParams | null = {
    initialInvestment: 15000,
    annualInvestment: 900,
    expectedReturn: 6,
    duration: 10,
  };
  const [calcParams, setCalcParams] = useState<CalcParams | null>(INITIAL_CALC_PARAMS);
  const isUserInputValid = validateParams(calcParams ?? {});
  const results: InvestmentRecord[] | null =
    isUserInputValid && calcParams ? calculateInvestmentResults(calcParams) : null;

  function handleCalcParamsChanged(params: CalcParams): void {
    setCalcParams(params);
  }

  function validateParams(params: Partial<CalcParams>): boolean {
    if (
      params.initialInvestment === undefined ||
      params.annualInvestment === undefined ||
      params.expectedReturn === undefined ||
      params.duration === undefined ||
      params.duration < 1
    ) {
      return false;
    }

    return true;
  }

  return (
    <>
      <Header />
      <CalcForm params={calcParams} paramsChanged={(params) => handleCalcParamsChanged(params)} />

      {results && <ResultsTable data={results} />}
    </>
  );
}

export default App;
