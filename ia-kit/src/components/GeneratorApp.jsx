import { useState } from 'react';
import QRCode from 'qrcode';
import { createIdentityToken } from '../services/token';

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
        width: 280,
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
        <div style={styles.header}>
          <div style={styles.logo}>NOVAÏ</div>
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
    background: '#f4f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '3px',
    color: '#4347f3',
    marginBottom: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    margin: 0,
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
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.15s',
    color: '#1a1a1a',
  },
  btnPrimary: {
    padding: '12px',
    background: '#4347f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  btnSecondary: {
    padding: '12px',
    background: '#f4f4f6',
    color: '#444',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
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
    background: 'rgba(67,71,243,0.08)',
    color: '#4347f3',
    fontWeight: '700',
    fontSize: '16px',
    padding: '8px 20px',
    borderRadius: '999px',
  },
  qrWrapper: {
    padding: '16px',
    background: '#fff',
    borderRadius: '12px',
    border: '1.5px solid #e8e8e8',
  },
  qrImage: {
    display: 'block',
    width: '240px',
    height: '240px',
  },
  uidLabel: {
    fontSize: '12px',
    color: '#aaa',
    margin: 0,
  },
  uid: {
    fontFamily: 'monospace',
    color: '#888',
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
    fontSize: '12px',
    color: '#aaa',
    textAlign: 'center',
    lineHeight: '1.5',
    margin: 0,
  },
  copyRow: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  copyInput: {
    flex: 1,
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1.5px solid #e0e0e0',
    fontSize: '12px',
    color: '#555',
    background: '#f9f9fb',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    outline: 'none',
    minWidth: 0,
  },
  copyBtn: {
    padding: '9px 14px',
    background: '#4347f3',
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
