import useQuiz from '../hooks/useQuiz';
import ProfileCard from './ProfileCard';

export default function ResultPhase() {
  const { userProfile, answers, restart } = useQuiz();

  if (!userProfile) return null;

  return (
    <section className="phase result-phase" aria-label="Votre bilan">
      <h2>Votre profil manager face à l'IA</h2>
      <ProfileCard profile={userProfile} />

      <div className="result-details">
        <h3>Vos réponses</h3>
        <ul className="answers-summary">
          {answers.map((answer, i) => (
            <li key={answer.scenarioId}>
              Scénario {i + 1} — Choix {answer.choiceId.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-primary btn-lg" onClick={restart}>
        Recommencer le parcours
      </button>
    </section>
  );
}
