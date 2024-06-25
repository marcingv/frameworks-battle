import './app.css';
import Header from './components/header';
import AuthInputs from './components/auth-inputs';

export function App() {
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
      </main>
    </>
  );
}

export default App;
