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
  let calcParams: CalcParams | null = {
    initialInvestment: 15000,
    annualInvestment: 900,
    expectedReturn: 6,
    duration: 10,
  };
  const [results, setResults] = useState<InvestmentRecord[] | null>(
    calcParams ? calculateInvestmentResults(calcParams) : null
  );

  function handleCalcParamsChanged(params: CalcParams): void {
    calcParams = params;
    setResults(calculateInvestmentResults(params));
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
