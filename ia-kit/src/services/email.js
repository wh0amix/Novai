import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const HR_EMAIL    = import.meta.env.VITE_HR_EMAIL;

const PROFILE_LABELS = {
  captain: 'Le Capitaine',
  explorer: "L'Explorateur",
  skeptic:  'Le Sceptique',
};

const SCENARIO_LABELS = {
  'stock-shortage':  'Rupture de stock',
  'team-planning':   "Planning d'équipe",
  'director-report': 'Rapport au directeur',
};

export async function sendResultsToHR({ profile, score, answers, userIdentity }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('[EmailJS] Variables d\'environnement manquantes — email ignoré.');
    return;
  }

  const profileLabel = PROFILE_LABELS[profile.key] ?? profile.title;
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const answersText = answers.map((a, i) => {
    const scenario = SCENARIO_LABELS[a.scenarioId] ?? `Scénario ${i + 1}`;
    return `${scenario} → Choix ${a.choiceId.toUpperCase()} (${a.points ?? '?'} pts)`;
  }).join('\n');

  const employeeNom = userIdentity?.nom ?? 'Inconnu';
  const employeePrenom = userIdentity?.prenom ?? '';
  const employeeUid = userIdentity?.uid ?? 'anonyme';

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email:         HR_EMAIL,
      employee_prenom:  employeePrenom,
      employee_nom:     employeeNom,
      employee_uid:     employeeUid,
      profile_label:    profileLabel,
      profile_tagline:  profile.tagline ?? '',
      score:            `${score}%`,
      date,
      answers_text:     answersText,
      scenarios_done:   `${answers.length} / 3`,
    },
    PUBLIC_KEY,
  );
}
