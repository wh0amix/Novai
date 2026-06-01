const choiceLabels = ['A', 'B', 'C'];

export default function ChoiceButton({ choice, index, isSelected, isDisabled, onSelect }) {
  return (
    <button
      className={`btn btn-choice${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(choice)}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={`Choix ${choiceLabels[index]} : ${choice.label}`}
    >
      <span className="choice-badge" aria-hidden="true">{choiceLabels[index]}</span>
      <span className="choice-label">{choice.label}</span>
    </button>
  );
}
