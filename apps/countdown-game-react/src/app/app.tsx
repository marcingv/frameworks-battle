import { createRoot } from 'react-dom/client';
import Player from './components/player';
import { AppContainer } from './app-container';
import TimerChallenge from './components/timer-challenge';

export function App() {
  return (
    <AppContainer>
      <div id="modal"></div>
      <div id="content">
        <header>
          <h1>
            The <em>Almost</em> Final Countdown
          </h1>
          <p>Stop the timer once you estimate that time is (almost) up</p>
        </header>

        <Player />

        <div id="challenges">
          <TimerChallenge title="Easy" targetTimeSecs={1} />
          <TimerChallenge title="Not easy" targetTimeSecs={5} />
          <TimerChallenge title="Getting tough" targetTimeSecs={10} />
          <TimerChallenge title="Pros only" targetTimeSecs={15} />
        </div>
      </div>
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
