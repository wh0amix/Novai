import { AppProvider } from './context/QuizContext';
import { useQuizDispatch } from './context/useQuizContext';
import PhaseRouter from './components/PhaseRouter';

function Header() {
  const dispatch = useQuizDispatch();

  const goHome = () => dispatch({ type: 'GO_HOME' });
  const goToResources = () => dispatch({ type: 'SHOW_RESOURCES' });

  return (
    <header className="app-header">
      <img
        src="/logo-degrade.svg"
        alt="NOVAÏ"
        className="app-logo"
        onClick={goHome}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && goHome()}
      />
      <nav className="app-nav">
        <span className="app-nav-link" onClick={goHome} style={{ cursor: 'pointer' }}>Formation</span>
        <span className="app-nav-link" onClick={goToResources} style={{ cursor: 'pointer' }}>Ressources</span>
      </nav>
    </header>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <PhaseRouter />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
