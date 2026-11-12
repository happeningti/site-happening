export default function Footer() {
  return (
    <footer className="happening-footer">
      <div className="happening-footer-inner">
        <div className="happening-footer-brand">
          <strong>Happening Logística</strong>
          <span>Compromisso com a ética, o respeito e as pessoas.</span>
        </div>
        <nav className="happening-footer-channels" aria-label="Canais de atendimento institucional">
          <a href="https://www.contatoseguro.com.br/pt/happening" target="_blank" rel="noopener noreferrer">
            <span className="happening-footer-channel-icon" aria-hidden="true">⚖</span>
            <span><strong>Canal de Ética</strong><small>Acessar canal ↗</small></span>
          </a>
          <a href="https://www.contatoseguro.com.br/pt/acolhimentohappening" target="_blank" rel="noopener noreferrer">
            <span className="happening-footer-channel-icon" aria-hidden="true">♡</span>
            <span><strong>Canal de Acolhimento</strong><small>Acessar canal ↗</small></span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
