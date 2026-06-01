export default function ProfileCard({ profile }) {
  const scoreMap = { captain: 92, explorer: 78, skeptic: 54 };
  const score = scoreMap[profile.key] ?? 70;

  return (
    <article className="profile-card" aria-label={`Profil : ${profile.title}`}>
      <div className="profile-badge">Votre profil IA</div>
      <div className="profile-emoji" aria-hidden="true">{profile.emoji}</div>
      <h3 className="profile-title">{profile.title}</h3>
      <div className="profile-score-bar">
        <div className="profile-score-fill" style={{ width: `${score}%` }} />
      </div>
      <p className="profile-score-label">{score} / 100</p>
      <p className="profile-description">{profile.description}</p>
    </article>
  );
}
