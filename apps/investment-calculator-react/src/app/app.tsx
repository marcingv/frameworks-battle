import './app.css';
import Header from './header/header';
import CalcForm from './calc-form/calc-form';
import ResultsTable from './results-table/results-table';
import { useState } from 'react';
import {
  CalcParams,
  calculateInvestmentResults,
  INITIAL_CALC_PARAMS,
  InvestmentRecord,
} from '@gv-frameworks-battle/investment-calculator-domain';
import { createRoot } from 'react-dom/client';

export function App() {
  const [calcParams, setCalcParams] =
    useState<Partial<CalcParams>>(INITIAL_CALC_PARAMS);
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
      <CalcForm
        userInput={calcParams}
        onUserInputChange={(params) => setCalcParams(params)}
      />

      {formError && <p className="center">{formError}</p>}
      {results && <ResultsTable data={results} />}
    </>
  );
}

class InvestmentCalculatorReactAppElement extends HTMLElement {
  public connectedCallback(): void {
    console.warn(
      'InvestmentCalculatorReactAppElement is connected: boostrap.tsx'
    );

    // ReactDOM.render(<App />, this);
    const root = createRoot(this);
    root.render(<App />);
  }

  public disconnectedCallback(): void {
    console.warn(
      'InvestmentCalculatorReactAppElement is disconnected: boostrap.tsx'
    );
  }
}

customElements.define(
  'investment-calculator-react-app-element',
  InvestmentCalculatorReactAppElement
);

export default App;
