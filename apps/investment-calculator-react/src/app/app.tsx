import './app.css';
import Header from './header/header';
import CalcForm from './calc-form/calc-form';
import ResultsTable from './results-table/results-table';

export function App() {
  return (
    <>
      <Header />
      <CalcForm />
      <ResultsTable />
    </>
  );
}

export default App;
