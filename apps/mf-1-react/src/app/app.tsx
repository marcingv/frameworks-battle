// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NxWelcome from './nx-welcome';
import { createRoot } from 'react-dom/client';

export function App() {
  return (
    <div>
      <NxWelcome title="mf-1-react" />
    </div>
  );
}

class Mf1ReactElement extends HTMLElement {
  public connectedCallback(): void {
    console.warn('Mf1ReactElement is connected: boostrap.tsx');

    // ReactDOM.render(<App />, this);
    const root = createRoot(this);
    root.render(<App />);
  }

  public disconnectedCallback(): void {
    console.warn('Mf1ReactElement is disconnected: boostrap.tsx');
  }
}

customElements.define('mf1-react-element', Mf1ReactElement);
export default App;
