import { useEffect, useMemo, useState } from "react";

const asset = (name: string) => `/assets/${name}`;

function FloralArrangement({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const files =
    variant === "primary"
      ? ["87a3a.svg", "9b197.svg", "13379.svg", "00e2d.svg", "294a8.svg", "7bb10.svg", "d3021.svg"]
      : ["445ac.svg", "e479a.svg", "c9f63.svg", "1d793.svg", "e4a81.svg", "868be.svg", "012ee.svg"];

  return (
    <div className={`floral-arrangement ${className}`} aria-hidden="true">
      {files.map((file, index) => (
        <img
          key={file}
          className={`floral-layer floral-layer-${index + 1}`}
          src={asset(file)}
          alt=""
        />
      ))}
    </div>
  );
}

function Countdown() {
  const target = useMemo(() => new Date("2027-06-19T16:00:00+02:00").getTime(), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const values = [
    [days, "DIAS"],
    [hours, "HORAS"],
    [minutes, "MIN"],
    [seconds, "SEG"],
  ] as const;

  return (
    <div className="countdown glass-panel" aria-label={`${days} dias até o casamento`}>
      <p className="eyebrow countdown-title">O COMEÇO DO PARA SEMPRE EM</p>
      <div className="countdown-grid">
        {values.map(([value, label], index) => (
          <div className="countdown-unit" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
            {index < values.length - 1 && <i aria-hidden="true">:</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [lookup, setLookup] = useState("Nome do Convidado");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [confirmed, setConfirmed] = useState(false);

  const guestFound =
    lookup.trim().toLowerCase() === "Nome do Convidado" ||
    lookup.trim().toUpperCase() === "AJ27-SB084";

  const scrollToRsvp = () =>
    document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });

  const downloadInvite = () => {
    const invite = `AMELIA & JULIAN\n19 DE JUNHO DE 2027\nVilla Balbiano · Lago de Como, Itália\n\nConvidado(a) exclusivo(a): Nome do Convidado\nEntrada: Você + um acompanhante\nCódigo de acesso privado: AJ27 – SB084`;
    const url = URL.createObjectURL(new Blob([invite], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Convite-Amelia-e-Julian.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="invitation">
      <section className="hero" aria-labelledby="couple-names">
        <img className="blush-atmosphere" src={asset("1ee91.svg")} alt="" />
        <div className="gilded-arch" aria-hidden="true" />
        <FloralArrangement className="hero-flowers" />
        <FloralArrangement variant="secondary" className="edge-flowers" />

        <p className="brand">Slogan do casal</p>
        <button
          className="music-player glass-panel"
          type="button"
          aria-pressed={musicPlaying}
          onClick={() => setMusicPlaying((playing) => !playing)}
        >
          <span className="music-control">
            {musicPlaying ? (
              <img src={asset("8abb7.svg")} alt="" />
            ) : (
              <span aria-hidden="true">▶</span>
            )}
          </span>
          <span className="music-copy">
            <strong>Música à escolha</strong>
            <small>Artista · nossa música</small>
          </span>
          <span className={`equalizer ${musicPlaying ? "is-playing" : ""}`} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>

        <div className="hero-copy">
          <p className="eyebrow">JUNTOS COM AS NOSSAS FAMÍLIAS</p>
          <h1 id="couple-names">
            <span>Noiva</span>
            <em>&amp;</em>
            <span>Noivo</span>
          </h1>
          <p className="script-note">convidamos você ao nosso casamento</p>
          <p className="date-line">SÁBADO, X de X de 202X</p>
          <p className="location-line">Local · Província, País</p>
        </div>

        <Countdown />
        <button className="gold-button hero-cta" type="button" onClick={scrollToRsvp}>
          Celebre conosco <span aria-hidden="true">↗</span>
        </button>
        <p className="scroll-prompt">
          DESLIZE PARA VER A NOSSA HISTÓRIA <span aria-hidden="true">↓</span>
        </p>
      </section>

      <section className="story section-dark">
        <div className="section-inner">
          <p className="eyebrow section-label">01 / NOSSA HISTÓRIA</p>
          <h2>
            SLOGAN DO CASAL
          </h2>
          <p className="body-copy">
            De um "Olá" a uma vida juntos.
            <br />
            Com o coração aberto, nós convidamos você
            <br className="mobile-only" />
            para o início da nossa nova jornada.
          </p>
          <p className="script-note story-note">Não seria o mesmo sem você.</p>
          <div className="venue-card">
            <span className="venue-monogram">V B</span>
            <span className="venue-divider" />
            <span>
              <strong>Local</strong>
              <small>PROVÍNCIA, PAÍS · HORA</small>
            </span>
          </div>
        </div>
      </section>

      <section className="pass-section">
        <div className="section-inner">
          <p className="eyebrow section-label">02 / SEU CONVITE</p>
          <h2>Reservado para você.</h2>
          <p className="section-subtitle">Uma pequena lembrança. Um dia inesquecível.</p>

          <article className="boarding-pass">
            <p className="eyebrow ticket-title">O CASAMENTO DE AMELIA &amp; JULIAN</p>
            <div className="ticket-rule" />
            <p className="ticket-label">CONVIDADO(A) EXCLUSIVO(A)</p>
            <h3>Nome do Convidado</h3>
            <span className="verified">● CONVIDADO VERIFICADO</span>
            <div className="ticket-details">
              <span>
                <small>DATA</small>
                <strong>19 JUN 2027</strong>
              </span>
              <span>
                <small>ENTRADA</small>
                <strong>Você + um acompanhante</strong>
              </span>
            </div>
            <div className="perforation">
              <img className="notch left" src={asset("66157.svg")} alt="" />
              <img className="notch right" src={asset("66157.svg")} alt="" />
            </div>
            <p className="ticket-label code-label">SEU CÓDIGO DE ACESSO PRIVADO</p>
            <p className="access-code">AJ27 – SB084</p>
            <button className="gold-button download-button" type="button" onClick={downloadInvite}>
              <span aria-hidden="true">↓</span> Baixar Convite em PDF
            </button>
          </article>
          <p className="ticket-footnote">PESSOAL. PRIVADO. UNICAMENTE SEU.</p>
        </div>
      </section>

      <section className="rsvp section-dark" id="rsvp">
        <div className="section-inner">
          <p className="eyebrow section-label">03 / A ALEGRIA DA SUA COMPANHIA</p>
          <h2>Você estará conosco?</h2>
          <p className="section-subtitle rsvp-subtitle">
            Encontre o seu convite e garanta o seu lugar.
            <br />
            Por favor, responda até 19 de Maio de 2027.
          </p>

          <label className="input-label" htmlFor="guest-lookup">
            SEU NOME OU CÓDIGO DE ACESSO
          </label>
          <div className={`lookup-field ${guestFound ? "match" : ""}`}>
            <img src={asset("b448f.svg")} alt="" />
            <input
              id="guest-lookup"
              value={lookup}
              onChange={(event) => {
                setLookup(event.target.value);
                setConfirmed(false);
              }}
              placeholder="Pesquisar nome do convidado"
            />
            {lookup && (
              <button type="button" onClick={() => setLookup("")} aria-label="Limpar pesquisa">
                ×
              </button>
            )}
          </div>

          {guestFound ? (
            <>
              <p className="match-message">✓ Convite encontrado. Um lugar está à sua espera.</p>
              <div className="guest-card">
                <span>
                  <strong>Nome do Convidado</strong>
                  <small>X lugares reservados · ID</small>
                </span>
                <b aria-hidden="true">✓</b>
              </div>
            </>
          ) : (
            <p className="match-message no-match">
              Nenhum convite encontrado.
            </p>
          )}

          <fieldset disabled={!guestFound}>
            <legend>VOCÊ VAI COMPARECER?</legend>
            <div className="attendance-options">
              <button
                className={attendance === "yes" ? "selected" : ""}
                type="button"
                onClick={() => setAttendance("yes")}
              >
                {attendance === "yes" ? "◉" : "○"} Aceita com alegria
              </button>
              <button
                className={attendance === "no" ? "selected" : ""}
                type="button"
                onClick={() => setAttendance("no")}
              >
                {attendance === "no" ? "◉" : "○"} Recusa com pesar
              </button>
            </div>
            <button
              className="gold-button confirm-button"
              type="button"
              onClick={() => setConfirmed(true)}
            >
              {confirmed ? "Resposta salva ✓" : "Confirmar nossos lugares ↗"}
            </button>
          </fieldset>
          <p className="script-note closing-note">Um dia lindo fica ainda melhor com a sua presença.</p>
        </div>
      </section>

      <footer>
        <p className="footer-monogram">A &amp; J</p>
        <p>COM AMOR, AGORA E SEMPRE</p>
        <p>LAGO DE COMO · 19.06.2027</p>
      </footer>
    </main>
  );
}