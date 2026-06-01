import useQuiz from '../hooks/useQuiz';
import ProfileCard from './ProfileCard';

const keyPoints = [
  "L'IA est un outil d'aide à la décision, pas un décideur.",
  'Toujours croiser les suggestions IA avec votre expertise terrain.',
  'La transparence envers votre équipe est essentielle.',
  "Gardez l'humain au centre de vos processus managériaux.",
];

const nextSteps = [
  { icon: '📘', title: 'Formation complète', desc: 'Accédez au module IA pour managers' },
  { icon: '🛠️', title: 'Boîte à outils', desc: 'Nos ressources pratiques pour vous lancer' },
  { icon: '🤝', title: 'Communauté', desc: "Échangez avec d'autres managers" },
];

export default function ResultPhase() {
  const { userProfile, restart } = useQuiz();

  if (!userProfile) return null;

  return (
    <section className="result-phase phase" aria-label="Votre bilan">
      <div className="result-trophy">
        <div className="result-trophy-icon" aria-hidden="true">🏆</div>
      </div>

      <h2 className="result-title">Formation terminée !</h2>
      <p className="result-subtitle">
        Vous avez complété le kit de sensibilisation IA. Découvrez votre profil et vos prochaines étapes.
      </p>

      <ProfileCard profile={userProfile} />

      <div className="result-section">
        <h3 className="result-section-title">Points clés à retenir</h3>
        <ul className="result-key-points">
          {keyPoints.map((point, i) => (
            <li key={i} className="result-key-point">
              <span className="result-check" aria-hidden="true">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Vos prochaines étapes</h3>
        <div className="result-next-steps">
          {nextSteps.map((step, i) => (
            <div key={i} className="result-next-card">
              <span className="result-next-icon" aria-hidden="true">{step.icon}</span>
              <strong className="result-next-title">{step.title}</strong>
              <p className="result-next-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary-action">Télécharger le mémo</button>
        <button className="btn-danger-action">Voir les ressources</button>
      </div>

      <button className="result-restart" onClick={restart}>
        ↺ Recommencer le parcours
      </button>
    </section>
  );
}
