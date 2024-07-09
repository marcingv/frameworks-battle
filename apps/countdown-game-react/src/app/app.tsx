// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRoot } from 'react-dom/client';

export function App() {
  return <div>HELLO FROM COUNTDOWN GAME :) :) :)</div>;
}

class CountdownGameReactAppElement extends HTMLElement {
  public connectedCallback(): void {
    console.warn('CountdownGameReactAppElement is connected: boostrap.tsx');

    // ReactDOM.render(<App />, this);
    const root = createRoot(this);
    root.render(<App />);
  }

  public disconnectedCallback(): void {
    console.warn('CountdownGameReactAppElement is disconnected: boostrap.tsx');
  }
}

customElements.define(
  'countdown-game-react-app-element',
  CountdownGameReactAppElement
);

export default App;
