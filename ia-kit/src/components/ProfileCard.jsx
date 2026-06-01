export default function ProfileCard({ profile }) {
  return (
    <article className="profile-card" aria-label={`Profil : ${profile.title}`}>
      <span className="profile-emoji" aria-hidden="true">{profile.emoji}</span>
      <h3 className="profile-title">{profile.title}</h3>
      <p className="profile-description">{profile.description}</p>
      <div className="profile-advice">
        <strong>💡 Notre conseil :</strong>
        <p>{profile.advice}</p>
      </div>
    </article>
  );
}
