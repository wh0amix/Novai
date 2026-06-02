import { useState } from 'react';
import { AppProvider, useQuizDispatch, useQuizState } from './context/QuizContext';
import PhaseRouter from './components/PhaseRouter';

function Header() {
  const dispatch = useQuizDispatch();
  const { answers } = useQuizState();
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => dispatch({ type: 'GO_HOME' });
  const goToResults = () => {
    dispatch({ type: 'SHOW_RESULTS' });
    setMenuOpen(false);
  };
  const logout = () => {
    dispatch({ type: 'RESTART' });
    setMenuOpen(false);
  };

  const hasResults = answers.length > 0;

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
        <span className="app-nav-link">Ressources</span>
        <div className="profile-menu">
          <button
            className="profile-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu profil"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          {menuOpen && (
            <>
              <div className="profile-overlay" onClick={() => setMenuOpen(false)} />
              <div className="profile-dropdown">
                <button className="profile-dropdown-item" onClick={goToResults}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Mes résultats
                  </button>
                <button className="profile-dropdown-item" onClick={logout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
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
