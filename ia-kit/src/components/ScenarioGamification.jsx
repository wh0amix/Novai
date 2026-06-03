import { useEffect, useMemo, useState } from 'react';

const confidentialDataCards = [
  { id: 'sales-volume', label: 'Volumes de vente', kind: 'safe' },
  { id: 'supplier-names', label: 'Noms des fournisseurs', kind: 'secret' },
  { id: 'margins', label: 'Marges exactes', kind: 'secret' },
  { id: 'employee-ids', label: 'Identifiants employés', kind: 'secret' },
  { id: 'product-categories', label: 'Catégories produits', kind: 'safe' },
];

const hrFields = [
  { id: 'first-last-name', label: 'Nom et prénom', sensitive: true },
  { id: 'position', label: 'Poste occupé', sensitive: false },
  { id: 'year-review', label: 'Commentaire annuel', sensitive: true },
  { id: 'strengths', label: 'Points forts', sensitive: false },
  { id: 'personal-note', label: 'Observation manager', sensitive: true },
];

const promoConstraints = [
  { id: 'staffing', label: 'Équipe réduite' },
  { id: 'delivery', label: 'Livraison en retard' },
  { id: 'layout', label: 'Rayon à réorganiser' },
];

function getChoiceById(scenario, choiceId) {
  return scenario.choices.find((choice) => choice.id === choiceId) ?? null;
}

function DecisionBanner({ choice }) {
  if (!choice) return null;

  return (
    <div className="game-banner" aria-live="polite">
      <span className="game-banner-label">Décision sélectionnée</span>
      <strong className="game-banner-title">{choice.title}</strong>
    </div>
  );
}

function Scenario4Game({ scenario, lastChoice, onSelect }) {
  const [zones, setZones] = useState({ deck: confidentialDataCards, safe: [], shred: [] });
  const [draggedId, setDraggedId] = useState(null);
  const allPlaced = zones.deck.length === 0;
  const safeIsCorrect = zones.safe.every((item) => item.kind === 'safe');
  const shredIsCorrect = zones.shred.every((item) => item.kind === 'secret');
  const hasAllSafe = zones.safe.filter((item) => item.kind === 'safe').length === 2;
  const hasAllSecret = zones.shred.filter((item) => item.kind === 'secret').length === 3;
  const isCorrectSort = allPlaced && safeIsCorrect && shredIsCorrect && hasAllSafe && hasAllSecret;

  useEffect(() => {
    if (!isCorrectSort || lastChoice?.id === 'a') return;
    const choice = getChoiceById(scenario, 'a');
    if (choice) onSelect(choice);
  }, [isCorrectSort, lastChoice?.id, onSelect, scenario]);

  const status = useMemo(() => {
    if (!allPlaced) return 'Faites glisser les données dans le bon espace.';

    if (isCorrectSort) {
      return 'Le fichier est prêt à être transmis à l\'IA.';
    }

    return 'Le tri est incomplet ou incorrect : révisez les données sensibles.';
  }, [allPlaced, isCorrectSort]);

  function moveCard(cardId, targetZone) {
    let movedCard = null;
    const nextZones = {
      deck: zones.deck.filter((card) => {
        if (card.id === cardId) {
          movedCard = card;
          return false;
        }
        return true;
      }),
      safe: zones.safe.filter((card) => {
        if (card.id === cardId) {
          movedCard = card;
          return false;
        }
        return true;
      }),
      shred: zones.shred.filter((card) => {
        if (card.id === cardId) {
          movedCard = card;
          return false;
        }
        return true;
      }),
    };

    if (!movedCard) return;

    nextZones[targetZone] = [...nextZones[targetZone], movedCard];
    setZones(nextZones);
  }

  function handleDrop(targetZone) {
    if (!draggedId) return;
    moveCard(draggedId, targetZone);
    setDraggedId(null);
  }

  return (
    <div className="scenario-game-card">
      <div className="game-header">
        <span className="game-kicker">Mini-jeu</span>
        <p className="game-instruction">Triez les données à conserver pour l'analyse IA et celles à détruire.</p>
      </div>

      <div className="game-grid game-grid--three">
        {[
          ['deck', 'Fichier brut', 'game-dropzone--neutral'],
          ['safe', 'Dossier IA sécurisé', 'game-dropzone--safe'],
          ['shred', 'Broyeur documents', 'game-dropzone--danger'],
        ].map(([zoneKey, label, className]) => (
          <div
            key={zoneKey}
            className={`game-dropzone ${className}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(zoneKey)}
          >
            <p className="game-zone-title">{label}</p>
            <div className="game-cards-list">
              {zones[zoneKey].map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="game-chip"
                  draggable
                  onDragStart={() => setDraggedId(card.id)}
                  onClick={() => {
                    if (zoneKey === 'deck') return;
                    moveCard(card.id, 'deck');
                  }}
                >
                  {card.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="game-status">{status}</p>

      <div className="game-actions-row">
        <button type="button" className="game-alt-btn" onClick={() => onSelect(getChoiceById(scenario, 'b'))}>
          Je n'utilise pas l'IA
        </button>
        <button type="button" className="game-alt-btn game-alt-btn--danger" onClick={() => onSelect(getChoiceById(scenario, 'c'))}>
          Envoyer le fichier brut
        </button>
      </div>

      <DecisionBanner choice={lastChoice} />
    </div>
  );
}

function Scenario5Game({ scenario, lastChoice, onSelect }) {
  const [redactedIds, setRedactedIds] = useState([]);

  const allSensitiveRedacted = hrFields
    .filter((field) => field.sensitive)
    .every((field) => redactedIds.includes(field.id));

  function toggleField(fieldId) {
    setRedactedIds((current) => (
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId]
    ));
  }

  function handleSecureSend() {
    const choice = getChoiceById(scenario, 'c');
    if (choice) onSelect(choice);
  }

  return (
    <div className="scenario-game-card">
      <div className="game-header">
        <span className="game-kicker">Mini-jeu</span>
        <p className="game-instruction">Masquez les données sensibles avant d'autoriser l'envoi vers l'assistant IA.</p>
      </div>

      <div className="redaction-sheet">
        {hrFields.map((field) => {
          const isRedacted = redactedIds.includes(field.id);
          return (
            <button
              key={field.id}
              type="button"
              className={`redaction-line${field.sensitive ? ' redaction-line--sensitive' : ''}${isRedacted ? ' redaction-line--redacted' : ''}`}
              onClick={() => field.sensitive && toggleField(field.id)}
              disabled={!field.sensitive}
            >
              <span className="redaction-label">{field.label}</span>
              <span className="redaction-value">
                {isRedacted ? '████████████' : field.sensitive ? 'Cliquer pour anonymiser' : 'Conserver'}
              </span>
            </button>
          );
        })}
      </div>

      <p className="game-status">
        {allSensitiveRedacted
          ? 'Toutes les données sensibles sont anonymisées.'
          : 'Anonymisez les noms et commentaires sensibles pour sécuriser l’envoi.'}
      </p>

      <div className="game-actions-row">
        <button type="button" className="game-alt-btn" onClick={() => onSelect(getChoiceById(scenario, 'a'))}>
          Ne pas utiliser l'IA
        </button>
        <button type="button" className="game-alt-btn game-alt-btn--danger" onClick={() => onSelect(getChoiceById(scenario, 'b'))}>
          Envoyer sans anonymiser
        </button>
        <button type="button" className="game-primary-btn" disabled={!allSensitiveRedacted} onClick={handleSecureSend}>
          Autoriser l'envoi à l'IA
        </button>
      </div>

      <DecisionBanner choice={lastChoice} />
    </div>
  );
}

function Scenario7Game({ scenario, lastChoice, onSelect }) {
  const [addedConstraints, setAddedConstraints] = useState([]);

  function addConstraint(constraint) {
    setAddedConstraints((current) => (
      current.some((item) => item.id === constraint.id)
        ? current
        : [...current, constraint]
    ));
  }

  const allConstraintsAdded = addedConstraints.length === promoConstraints.length;

  useEffect(() => {
    if (!allConstraintsAdded || lastChoice?.id === 'a') return;
    const choice = getChoiceById(scenario, 'a');
    if (choice) onSelect(choice);
  }, [allConstraintsAdded, lastChoice?.id, onSelect, scenario]);

  return (
    <div className="scenario-game-card">
      <div className="game-header">
        <span className="game-kicker">Mini-jeu</span>
        <p className="game-instruction">Complétez le brief IA avec les contraintes terrain oubliées.</p>
      </div>

      <div className="brief-board">
        <div className="brief-card brief-card--base">
          <p className="brief-title">Brief IA initial</p>
          <ul className="brief-list">
            <li>Mettre en place les têtes de gondole</li>
            <li>Faire le point promo avec l'équipe à 8h30</li>
            <li>Préparer le réassort des produits d'appel</li>
          </ul>
        </div>

        <div className="brief-card brief-card--editable">
          <p className="brief-title">Contraintes à intégrer</p>
          <div className="brief-tags">
            {promoConstraints.map((constraint) => (
              <button
                key={constraint.id}
                type="button"
                className={`brief-tag${addedConstraints.some((item) => item.id === constraint.id) ? ' brief-tag--active' : ''}`}
                onClick={() => addConstraint(constraint)}
              >
                {constraint.label}
              </button>
            ))}
          </div>
          <div className="brief-merged">
            <p className="brief-subtitle">Brief final</p>
            <ul className="brief-list brief-list--merged">
              <li>Mettre en place les têtes de gondole</li>
              <li>Faire le point promo avec l'équipe à 8h30</li>
              <li>Préparer le réassort des produits d'appel</li>
              {addedConstraints.map((constraint) => (
                <li key={constraint.id}>{constraint.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="game-status">
        {allConstraintsAdded
          ? 'Le brief est complet et prêt à être présenté à l’équipe.'
          : 'Ajoutez les contraintes terrain oubliées pour fiabiliser le brief.'}
      </p>

      <div className="game-actions-row">
        <button type="button" className="game-alt-btn game-alt-btn--danger" onClick={() => onSelect(getChoiceById(scenario, 'b'))}>
          Utiliser le brief tel quel
        </button>
        <button type="button" className="game-alt-btn" onClick={() => onSelect(getChoiceById(scenario, 'c'))}>
          Tout refaire moi-même
        </button>
      </div>

      <DecisionBanner choice={lastChoice} />
    </div>
  );
}

export default function ScenarioGamification({ scenario, lastChoice, onSelect }) {
  if (scenario.id === 'sales-analysis-confidentiality') {
    return <Scenario4Game scenario={scenario} lastChoice={lastChoice} onSelect={onSelect} />;
  }

  if (scenario.id === 'hr-data-confidentiality') {
    return <Scenario5Game scenario={scenario} lastChoice={lastChoice} onSelect={onSelect} />;
  }

  if (scenario.id === 'promo-team-brief') {
    return <Scenario7Game scenario={scenario} lastChoice={lastChoice} onSelect={onSelect} />;
  }

  return null;
}