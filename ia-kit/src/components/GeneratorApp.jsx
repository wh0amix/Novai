import { useState } from 'react';
import QRCode from 'qrcode';
import { createIdentityToken } from '../services/token';

const FONT_BODY = "'ABC Monument Grotesk', system-ui, sans-serif";
const FONT_HEADING = "'Romie', serif";

export default function GeneratorApp() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!nom.trim() || !prenom.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { token, uid } = await createIdentityToken({ nom: nom.trim(), prenom: prenom.trim() });
      const quizUrl = `${window.location.origin}/?token=${token}`;
      const qrDataUrl = await QRCode.toDataURL(quizUrl, {
        width: 300,
        margin: 2,
        color: { dark: '#1a1a1a', light: '#ffffff' },
      });
      setResult({ qrDataUrl, quizUrl, uid, nom: nom.trim(), prenom: prenom.trim() });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.qrDataUrl;
    link.download = `QR_${result.prenom}_${result.nom}.png`;
    link.click();
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.quizUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    setResult(null);
    setNom('');
    setPrenom('');
    setCopied(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <img src="/logo-degrade.svg" alt="NOVAÏ" style={styles.logoImg} />
          <h1 style={styles.title}>Générateur de QR Code</h1>
          <p style={styles.subtitle}>Outil RH — Accès formation IA</p>
        </div>

        {!result ? (
          <form onSubmit={handleGenerate} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Prénom</label>
              <input
                style={styles.input}
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Jean"
                required
                autoFocus
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Nom</label>
              <input
                style={styles.input}
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.btnPrimary} disabled={loading}>
              {loading ? 'Génération…' : 'Générer le QR Code'}
            </button>
          </form>
        ) : (
          <div style={styles.resultSection}>

            <div style={styles.employeePill}>
              {result.prenom} {result.nom}
            </div>

            <div style={styles.qrWrapper}>
              <img src={result.qrDataUrl} alt="QR Code" style={styles.qrImage} />
            </div>

            <div style={styles.copyRow}>
              <input
                style={styles.copyInput}
                type="text"
                readOnly
                value={result.quizUrl}
                onFocus={(e) => e.target.select()}
              />
              <button style={styles.copyBtn} onClick={handleCopy}>
                {copied ? '✓ Copié' : 'Copier'}
              </button>
            </div>

            <p style={styles.uidLabel}>
              ID : <code style={styles.uid}>{result.uid}</code>
            </p>

            <div style={styles.btnRow}>
              <button style={styles.btnPrimary} onClick={handleDownload}>
                Télécharger le QR Code
              </button>
              <button style={styles.btnSecondary} onClick={handleReset}>
                Nouvel employé
              </button>
            </div>

            <p style={styles.hint}>
              Envoyez ce QR code à l'employé. En le scannant, il accédera directement à sa formation sans connexion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F9F9FB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: FONT_BODY,
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
    border: '1px solid #e5e5e5',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoImg: {
    height: '36px',
    width: 'auto',
    marginBottom: '20px',
    display: 'block',
    margin: '0 auto 20px',
  },
  title: {
    fontFamily: FONT_HEADING,
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 6px',
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: FONT_BODY,
    fontSize: '14px',
    color: '#6B6B6B',
    margin: 0,
    fontWeight: 400,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: FONT_BODY,
    fontSize: '13px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  input: {
    fontFamily: FONT_BODY,
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e5e5e5',
    fontSize: '15px',
    outline: 'none',
    color: '#1a1a1a',
    background: '#fff',
    transition: 'border-color 0.15s',
  },
  btnPrimary: {
    fontFamily: FONT_BODY,
    padding: '13px',
    background: '#8e00fa',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    letterSpacing: '0.01em',
  },
  btnSecondary: {
    fontFamily: FONT_BODY,
    padding: '13px',
    background: '#F9F9FB',
    color: '#1a1a1a',
    border: '1.5px solid #e5e5e5',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    fontFamily: FONT_BODY,
    color: '#e31e24',
    fontSize: '13px',
    margin: 0,
  },
  resultSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  employeePill: {
    fontFamily: FONT_BODY,
    background: 'rgba(142,0,250,0.08)',
    color: '#8e00fa',
    fontWeight: '600',
    fontSize: '15px',
    padding: '8px 20px',
    borderRadius: '999px',
    border: '1px solid rgba(142,0,250,0.15)',
  },
  qrWrapper: {
    padding: '16px',
    background: '#fff',
    borderRadius: '14px',
    border: '1.5px solid #e5e5e5',
  },
  qrImage: {
    display: 'block',
    width: '240px',
    height: '240px',
  },
  uidLabel: {
    fontFamily: FONT_BODY,
    fontSize: '12px',
    color: '#6B6B6B',
    margin: 0,
  },
  uid: {
    fontFamily: 'monospace',
    color: '#6B6B6B',
    fontSize: '11px',
    wordBreak: 'break-all',
  },
  btnRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  hint: {
    fontFamily: FONT_BODY,
    fontSize: '12px',
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: '1.6',
    margin: 0,
  },
  copyRow: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  copyInput: {
    flex: 1,
    fontFamily: 'monospace',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1.5px solid #e5e5e5',
    fontSize: '12px',
    color: '#6B6B6B',
    background: '#F9F9FB',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    outline: 'none',
    minWidth: 0,
  },
  copyBtn: {
    fontFamily: FONT_BODY,
    padding: '9px 14px',
    background: '#8e00fa',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
};
