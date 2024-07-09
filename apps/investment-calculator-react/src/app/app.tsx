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
import styled from 'styled-components';

const AppContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap');
  background: radial-gradient(#303b37, #1a1f1d);
  color: #e1eeeb;

  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #header {
    text-align: center;
    margin: 3rem auto;
  }

  #header img {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    background-color: transparent;
  }

  #header h1 {
    font-size: 1.5rem;
  }

  #user-input {
    padding: 1rem;
    max-width: 30rem;
    margin: 2rem auto;
    border-radius: 4px;
    background: linear-gradient(180deg, #307e6c, #2b996d);
  }

  .input-group {
    display: flex;
    justify-content: space-evenly;
    gap: 1.5rem;
  }

  .input-group:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  #user-input label {
    display: block;
    margin-bottom: 0.25rem;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 0.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  #user-input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #76c0ae;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #c2e9e0;
    font-size: 1rem;
  }

  #result {
    max-width: 50rem;
    margin: 2rem auto;
    padding: 1rem;
    table-layout: fixed;
    border-spacing: 1rem;
    text-align: right;
  }

  #result thead {
    font-size: 0.7rem;
    color: #83e6c0;
  }

  #result tbody {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 0.85rem;
    color: #c2e9e0;
  }

  .center {
    text-align: center;
  }
`;

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
    <AppContainer>
      <Header />
      <CalcForm
        userInput={calcParams}
        onUserInputChange={(params) => setCalcParams(params)}
      />

      {formError && <p className="center">{formError}</p>}
      {results && <ResultsTable data={results} />}
    </AppContainer>
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
