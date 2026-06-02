import { AppProvider } from './context/QuizContext';
import PhaseRouter from './components/PhaseRouter';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <header className="app-header">
          <span className="app-logo">NOVAÏ</span>
          <nav className="app-nav">
            <span className="app-nav-link">Formation</span>
            <span className="app-nav-link">Ressources</span>
          </nav>
        </header>
        <main className="app-main">
          <PhaseRouter />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
