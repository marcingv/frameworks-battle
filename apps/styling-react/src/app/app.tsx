import './app.css';
import Header from './components/header';
import AuthInputs from './components/auth-inputs';
import { createRoot } from 'react-dom/client';

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

class StylingReactAppElement extends HTMLElement {
  public connectedCallback(): void {
    console.warn('StylingReactAppElement is connected: boostrap.tsx');

    // ReactDOM.render(<App />, this);
    const root = createRoot(this);
    root.render(<App />);
  }

  public disconnectedCallback(): void {
    console.warn('StylingReactAppElement is disconnected: boostrap.tsx');
  }
}

customElements.define('styling-react-app-element', StylingReactAppElement);

export default App;
