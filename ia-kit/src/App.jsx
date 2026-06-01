import { AppProvider } from './context/QuizContext';
import PhaseRouter from './components/PhaseRouter';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <header className="app-header">
          Kit IA — Sensibilisation Managers
        </header>
        <main className="app-main">
          <PhaseRouter />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
