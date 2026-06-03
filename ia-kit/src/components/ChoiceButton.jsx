const iconKeys = ['a', 'b', 'c'];

export default function ChoiceButton({ choice, index, isSelected, onSelect }) {
  const key = iconKeys[index] ?? 'a';

  return (
    <button
      className={`btn-choice${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(choice)}
      aria-pressed={isSelected}
      aria-label={`Choix ${key.toUpperCase()} : ${choice.title || choice.label}`}
    >
      <span className={`choice-icon choice-icon--${key}`} aria-hidden="true">
        {key.toUpperCase()}
      </span>
      <span className="choice-content">
        {choice.title && <span className="choice-title">{choice.title}</span>}
      </span>
    </button>
  );
}
