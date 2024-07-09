import { createRoot } from 'react-dom/client';
import Player from './components/player';
import styled from 'styled-components';

const AppContainer = styled.div``;

export function App() {
  return (
    <AppContainer>
      <Player />
      <div id="challenges"></div>
    </AppContainer>
  );
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
