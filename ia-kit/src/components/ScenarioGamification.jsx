import { useEffect, useMemo, useState } from 'react';

const confidentialDataCards = [
  { id: 'sales-volume', label: 'Volumes de vente', kind: 'safe' },
  { id: 'supplier-names', label: 'Noms des fournisseurs', kind: 'secret' },
  { id: 'margins', label: 'Marges exactes', kind: 'secret' },
  { id: 'employee-ids', label: 'Identifiants employés', kind: 'secret' },
  { id: 'product-categories', label: 'Catégories produits', kind: 'safe' },
];

const hrFields = [
  { id: 'first-last-name', label: 'Nom et prénom', value: 'Sophie Martin', sensitive: true },
  { id: 'email', label: 'Email', value: 'sophie.martin@entreprise.fr', sensitive: true },
  { id: 'postal-address', label: 'Adresse postale', value: '12 rue des Acacias, 75015 Paris', sensitive: true },
  { id: 'position', label: 'Poste occupé', value: 'Responsable caisse', sensitive: false },
  { id: 'year-review', label: 'Évaluation annuelle', value: 'Atteint 92% des objectifs, besoin de coaching sur le closing', sensitive: false },
  { id: 'strengths', label: 'Points forts', value: 'Organisation, relation client, réactivité', sensitive: false },
  { id: 'personal-note', label: 'Note manager', value: 'Souhaite évoluer vers un poste adjoint en 2026', sensitive: false },
];

const promoInfoOptions = [
  { id: 'base-gondole', label: 'Mettre en place les têtes de gondole', important: true },
  { id: 'base-team-brief', label: 'Faire le point promo avec l\'équipe à 8h30', important: true },
  { id: 'base-restock', label: 'Préparer le réassort des produits d\'appel', important: true },
  { id: 'staffing', label: 'Équipe réduite', important: true },
  { id: 'delivery', label: 'Livraison en retard', important: true },
  { id: 'layout', label: 'Rayon à réorganiser', important: true },
  { id: 'playlist', label: 'Changer la playlist du magasin', important: false },
  { id: 'photo', label: 'Prévoir une photo vitrine en fin de journée', important: false },
  { id: 'coffee', label: 'Organiser une pause café debrief à 16h', important: false },
  { id: 'snacks', label: 'Choisir les snacks de la pause équipe', important: false },
  { id: 'music-volume', label: 'Ajuster le volume de la musique en réserve', important: false },
];

function getChoiceById(scenario, choiceId) {
  return scenario.choices.find((choice) => choice.id === choiceId) ?? null;
}

function Scenario4Game({ scenario, onSelect }) {
  const [zones, setZones] = useState({ deck: confidentialDataCards, safe: [], shred: [] });
  const [draggedId, setDraggedId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const totalCards = confidentialDataCards.length;
  const allPlaced = zones.deck.length === 0;
  const allInDeck = zones.deck.length === totalCards;
  const allInShred = zones.shred.length === totalCards;
  const safeIsCorrect = zones.safe.every((item) => item.kind === 'safe');
  const shredIsCorrect = zones.shred.every((item) => item.kind === 'secret');
  const hasAllSafe = zones.safe.filter((item) => item.kind === 'safe').length === 2;
  const hasAllSecret = zones.shred.filter((item) => item.kind === 'secret').length === 3;
  const isCorrectSort = allPlaced && safeIsCorrect && shredIsCorrect && hasAllSafe && hasAllSecret;
  const hasSensitiveInSafeZone = zones.safe.some((item) => item.kind === 'secret');
  const isPartialCleanWithRisk = allPlaced && !isCorrectSort && !allInDeck && !allInShred && hasSensitiveInSafeZone;

  const inferredChoiceId = useMemo(() => {
    if (isCorrectSort) return 'a';
    if (isPartialCleanWithRisk) return 'partial-clean';
    if (allInShred) return 'b';
    if (allInDeck) return 'c';
    return null;
  }, [allInDeck, allInShred, isCorrectSort, isPartialCleanWithRisk]);

  const boardEntries = useMemo(() => {
    const zoneLabels = {
      deck: 'Fichier brut',
      safe: 'Dossier IA sécurisé',
      shred: 'Broyeur documents',
    };

    return ['deck', 'safe', 'shred'].flatMap((zoneKey) => (
      zones[zoneKey].map((card) => ({
        id: card.id,
        label: card.label,
        kind: card.kind,
        zone: zoneKey,
        zoneLabel: zoneLabels[zoneKey],
      }))
    ));
  }, [zones]);

  useEffect(() => {
    if (!inferredChoiceId) return;
    const choice = inferredChoiceId === 'partial-clean'
      ? {
        id: 'partial-clean',
        profile: 'explorer',
        title: 'Je nettoie partiellement le fichier',
        label: 'Je nettoie partiellement le fichier avant de l\'envoyer.',
        points: 0.5,
        feedback:
          "Résultat : L'IA arrive à analyser une partie des ventes, mais le fichier contient encore des informations sensibles. Même si vous avez retiré certains éléments, des données confidentielles restent visibles, comme des marges exactes, des noms de fournisseurs ou des identifiants employés. Feedback : C'est une intention plutôt positive, parce que vous avez commencé à nettoyer le fichier avant de l'envoyer. Mais ce n'est pas suffisant : dès qu'il reste des données sensibles, le risque de confidentialité existe toujours. L'IA peut être utile pour analyser les ventes, mais seulement si les informations envoyées sont vraiment filtrées et anonymisées. À retenir : Nettoyer un fichier à moitié ne suffit pas. Avant d'utiliser une IA, il faut vérifier que toutes les données sensibles ont bien été retirées ou anonymisées.",
      }
      : getChoiceById(scenario, inferredChoiceId);
    if (!choice) return;

    onSelect({
      ...choice,
      gameMeta: {
        scenarioId: scenario.id,
        boardEntries,
      },
    });
  }, [boardEntries, inferredChoiceId, onSelect, scenario]);

  const status = useMemo(() => {
    if (allInDeck) {
      return 'Tous les éléments sont restés dans le fichier brut : cela correspond à un envoi tel quel à l\'IA.';
    }

    if (allInShred) {
      return 'Tous les éléments sont au broyeur : cela correspond à ne pas utiliser l\'IA.';
    }

    if (isCorrectSort) {
      return 'Le fichier est prêt à être transmis à l\'IA.';
    }

    if (!allPlaced) return 'Faites glisser les données dans le bon espace.';

    return 'Tri intermédiaire : continuez à organiser les données pour valider votre décision.';
  }, [allInDeck, allInShred, allPlaced, isCorrectSort]);

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
    setSelectedCardId(null);
  }

  function handleDrop(targetZone) {
    if (!draggedId) return;
    moveCard(draggedId, targetZone);
    setDraggedId(null);
  }

  function handleMoveSelected(targetZone) {
    if (!selectedCardId) return;
    moveCard(selectedCardId, targetZone);
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
            onClick={() => {
              if (selectedCardId) handleMoveSelected(zoneKey);
            }}
          >
            <p className="game-zone-title">{label}</p>
            <div className="game-cards-list">
              {zones[zoneKey].map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className={`game-chip${selectedCardId === card.id ? ' game-chip--selected' : ''}`}
                  draggable
                  onDragStart={() => setDraggedId(card.id)}
                  onClick={() => {
                    if (zoneKey === 'deck') {
                      setSelectedCardId(card.id);
                      return;
                    }
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

      <p className="game-selection-hint" aria-live="polite">
        {selectedCardId
          ? `Carte sélectionnée : ${zones.deck.find((card) => card.id === selectedCardId)?.label ?? 'élément'}`
          : 'Aucune carte sélectionnée.'}
      </p>

      <p className="game-status">{status}</p>
    </div>
  );
}

function Scenario5Game({ scenario, onSelect }) {
  const [redactedIds, setRedactedIds] = useState([]);

  const sensitiveIds = hrFields.filter((field) => field.sensitive).map((field) => field.id);
  const allSensitiveRedacted = sensitiveIds.every((id) => redactedIds.includes(id));
  const allFieldsRedacted = redactedIds.length === hrFields.length;
  const noFieldRedacted = redactedIds.length === 0;
  const hasPartialRedactionWithSensitiveLeft = redactedIds.length > 0 && !allSensitiveRedacted;
  const onlySensitiveRedacted = allSensitiveRedacted && !allFieldsRedacted && redactedIds.length === sensitiveIds.length;

  const inferredChoiceId = useMemo(() => {
    if (hasPartialRedactionWithSensitiveLeft) return 'partial-redaction';
    if (onlySensitiveRedacted) return 'c';
    if (allFieldsRedacted) return 'a';
    if (noFieldRedacted) return 'b';
    return null;
  }, [allFieldsRedacted, noFieldRedacted, onlySensitiveRedacted, hasPartialRedactionWithSensitiveLeft]);

  const redactionEntries = useMemo(() => (
    hrFields.map((field) => ({
      id: field.id,
      label: field.label,
      sensitive: field.sensitive,
      redacted: redactedIds.includes(field.id),
    }))
  ), [redactedIds]);

  useEffect(() => {
    if (!inferredChoiceId) return;
    const choice = inferredChoiceId === 'partial-redaction'
      ? {
        id: 'partial-redaction',
        profile: 'explorer',
        title: "J'anonymise une partie des infos, mais il reste des données sensibles",
        label: "J'anonymise une partie des infos, mais il reste des données sensibles.",
        points: 0.5,
        feedback:
          "Résultat : L'IA peut vous aider à préparer l'entretien, mais certaines informations personnelles restent visibles. Même si une partie du document a été anonymisée, le nom, l'email, l'adresse ou certains commentaires peuvent encore permettre d'identifier le collaborateur. Feedback : C'est un bon début, parce que vous avez pensé à masquer certaines informations. Mais ce n'est pas suffisant : les données RH sont sensibles et doivent être protégées complètement avant d'être partagées avec une IA. Une anonymisation partielle peut quand même créer un risque pour la confidentialité. À retenir : Anonymiser un peu ne suffit pas. Avant d'utiliser l'IA, il faut retirer toutes les informations qui permettent d'identifier un collaborateur et respecter les règles internes de l'entreprise.",
      }
      : getChoiceById(scenario, inferredChoiceId);
    if (!choice) return;

    onSelect({
      ...choice,
      gameMeta: {
        scenarioId: scenario.id,
        redactionEntries,
      },
    });
  }, [inferredChoiceId, onSelect, redactionEntries, scenario]);

  function toggleField(fieldId) {
    setRedactedIds((current) => (
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId]
    ));
  }

  const status = useMemo(() => {
    if (onlySensitiveRedacted) {
      return 'Anonymisation optimale : seules les données sensibles sont masquées.';
    }
    if (allFieldsRedacted) {
      return 'Anonymisation totale : approche très prudente (équivalent à ne pas exploiter pleinement l\'IA).';
    }
    if (noFieldRedacted) {
      return 'Aucune anonymisation : risque élevé de partage de données personnelles.';
    }

    if (hasPartialRedactionWithSensitiveLeft) {
      return 'Anonymisation partielle : des données sensibles restent encore visibles.';
    }

    return 'Anonymisation partielle : continuez pour atteindre un niveau de sécurité cohérent.';
  }, [allFieldsRedacted, noFieldRedacted, onlySensitiveRedacted, hasPartialRedactionWithSensitiveLeft]);

  return (
    <div className="scenario-game-card">
      <div className="game-header">
        <span className="game-kicker">Mini-jeu</span>
        <p className="game-instruction">Cliquez sur chaque ligne pour masquer ou révéler l'information avant envoi à l'IA.</p>
      </div>

      <div className="redaction-sheet">
        {hrFields.map((field) => {
          const isRedacted = redactedIds.includes(field.id);
          return (
            <button
              key={field.id}
              type="button"
              className={`redaction-line${field.sensitive ? ' redaction-line--sensitive' : ''}${isRedacted ? ' redaction-line--redacted' : ''}`}
              onClick={() => toggleField(field.id)}
            >
              <span className="redaction-label">{field.label}</span>
              <span className="redaction-value">
                {isRedacted ? '████████████' : field.value}
              </span>
            </button>
          );
        })}
      </div>

      <p className="game-status">{status}</p>
    </div>
  );
}

function Scenario7Game({ scenario, onSelect }) {
  const [addedInfos, setAddedInfos] = useState([]);

  function addInfo(info) {
    setAddedInfos((current) => (
      current.some((item) => item.id === info.id)
        ? current
        : [...current, info]
    ));
  }

  const importantIds = promoInfoOptions
    .filter((info) => info.important)
    .map((info) => info.id);
  const selectedIds = addedInfos.map((info) => info.id);
  const selectedImportantCount = addedInfos.filter((info) => info.important).length;
  const hasAllImportant = importantIds.every((id) => selectedIds.includes(id));
  const hasOnlyOptional = addedInfos.length > 0 && selectedImportantCount === 0;
  const selectedNonImportantCount = addedInfos.filter((info) => !info.important).length;

  const inferredChoiceId = useMemo(() => {
    if (addedInfos.length === 0 || hasOnlyOptional) return 'b';
    if (hasAllImportant && selectedNonImportantCount === 0) return 'a';
    return 'c';
  }, [addedInfos.length, hasAllImportant, hasOnlyOptional, selectedNonImportantCount]);

  useEffect(() => {
    if (!inferredChoiceId) return;
    const choice = getChoiceById(scenario, inferredChoiceId);
    if (!choice) return;

    onSelect({
      ...choice,
      gameMeta: {
        scenarioId: scenario.id,
        selectedInfos: addedInfos,
      },
    });
  }, [addedInfos, inferredChoiceId, onSelect, scenario]);

  const status = useMemo(() => {
    if (inferredChoiceId === 'a') {
      return 'Excellent : vous avez intégré les informations critiques du terrain sans surcharger le brief.';
    }
    if (inferredChoiceId === 'b') {
      return hasOnlyOptional
        ? 'Brief non pertinent : uniquement des éléments optionnels ont été ajoutés, sans contraintes critiques.'
        : 'Aucune information ajoutée : cela revient à utiliser le brief IA tel quel.';
    }

    return 'Brief partiellement ajusté ou surchargé : utile, mais moins efficace que de cibler les vraies contraintes.';
  }, [inferredChoiceId, hasOnlyOptional]);

  return (
    <div className="scenario-game-card">
      <div className="game-header">
        <span className="game-kicker">Mini-jeu</span>
        <p className="game-instruction">Recomposez le nouveau brief avec les éléments utiles pour l'équipe.</p>
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
          <p className="brief-title">Informations à intégrer au nouveau brief</p>
          <div className="brief-tags">
            {promoInfoOptions.map((info) => (
              <button
                key={info.id}
                type="button"
                className={`brief-tag${addedInfos.some((item) => item.id === info.id) ? ' brief-tag--active' : ''}`}
                onClick={() => addInfo(info)}
              >
                {info.label}
              </button>
            ))}
          </div>
          <div className="brief-merged">
            <p className="brief-subtitle">Brief final</p>
            <ul className="brief-list brief-list--merged">
              {addedInfos.map((info) => (
                <li key={info.id}>{info.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="game-status">{status}</p>
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