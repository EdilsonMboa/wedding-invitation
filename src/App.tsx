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
    [days, "DAYS"],
    [hours, "HOURS"],
    [minutes, "MINS"],
    [seconds, "SECS"],
  ] as const;

  return (
    <div className="countdown glass-panel" aria-label={`${days} days until the wedding`}>
      <p className="eyebrow countdown-title">THE BEGINNING OF FOREVER IN</p>
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
  const [lookup, setLookup] = useState("Sophia Bennett");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [confirmed, setConfirmed] = useState(false);

  const guestFound =
    lookup.trim().toLowerCase() === "sophia bennett" ||
    lookup.trim().toUpperCase() === "AJ27-SB084";

  const scrollToRsvp = () =>
    document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" });

  const downloadInvite = () => {
    const invite = `AMELIA & JULIAN\n19 JUNE 2027\nVilla Balbiano · Lake Como, Italy\n\nExclusively invited: Sophia Bennett\nAdmission: You + one guest\nPrivate access code: AJ27 – SB084`;
    const url = URL.createObjectURL(new Blob([invite], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Amelia-and-Julian-invitation.txt";
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

        <p className="brand">EVER IN BLOOM</p>
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
            <strong>Golden Hour</strong>
            <small>JVKE · our soundtrack</small>
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
          <p className="eyebrow">TOGETHER WITH OUR FAMILIES</p>
          <h1 id="couple-names">
            <span>Amelia</span>
            <em>&amp;</em>
            <span>Julian</span>
          </h1>
          <p className="script-note">joyfully invite you to celebrate our wedding</p>
          <p className="date-line">SATURDAY, 19 JUNE 2027</p>
          <p className="location-line">Villa Balbiano · Lake Como, Italy</p>
        </div>

        <Countdown />
        <button className="gold-button hero-cta" type="button" onClick={scrollToRsvp}>
          Celebrate with us <span aria-hidden="true">↗</span>
        </button>
        <p className="scroll-prompt">
          SCROLL TO UNFOLD OUR STORY <span aria-hidden="true">↓</span>
        </p>
      </section>

      <section className="story section-dark">
        <div className="section-inner">
          <p className="eyebrow section-label">01 / OUR STORY</p>
          <h2>
            Some things are
            <br />
            meant to bloom.
          </h2>
          <p className="body-copy">
            From a chance hello to a lifetime of yes.
            <br />
            With full hearts, we invite you to the next
            <br className="mobile-only" />
            chapter of our favorite love story.
          </p>
          <p className="script-note story-note">It wouldn’t be the same without you.</p>
          <div className="venue-card">
            <span className="venue-monogram">V B</span>
            <span className="venue-divider" />
            <span>
              <strong>Villa Balbiano</strong>
              <small>LAKE COMO, ITALY · 4:00 PM</small>
            </span>
          </div>
        </div>
      </section>

      <section className="pass-section">
        <div className="section-inner">
          <p className="eyebrow section-label">02 / YOUR INVITATION</p>
          <h2>Reserved for you.</h2>
          <p className="section-subtitle">A little keepsake. An unforgettable day.</p>

          <article className="boarding-pass">
            <p className="eyebrow ticket-title">THE WEDDING OF AMELIA &amp; JULIAN</p>
            <div className="ticket-rule" />
            <p className="ticket-label">EXCLUSIVELY INVITED</p>
            <h3>Sophia Bennett</h3>
            <span className="verified">● VERIFIED GUEST</span>
            <div className="ticket-details">
              <span>
                <small>DATE</small>
                <strong>19 JUN 2027</strong>
              </span>
              <span>
                <small>ADMISSION</small>
                <strong>You + one guest</strong>
              </span>
            </div>
            <div className="perforation">
              <img className="notch left" src={asset("66157.svg")} alt="" />
              <img className="notch right" src={asset("66157.svg")} alt="" />
            </div>
            <p className="ticket-label code-label">YOUR PRIVATE ACCESS CODE</p>
            <p className="access-code">AJ27 – SB084</p>
            <button className="gold-button download-button" type="button" onClick={downloadInvite}>
              <span aria-hidden="true">↓</span> Download PDF Invite
            </button>
          </article>
          <p className="ticket-footnote">PERSONAL. PRIVATE. UNIQUELY YOURS.</p>
        </div>
      </section>

      <section className="rsvp section-dark" id="rsvp">
        <div className="section-inner">
          <p className="eyebrow section-label">03 / THE JOY OF YOUR COMPANY</p>
          <h2>Will you join us?</h2>
          <p className="section-subtitle rsvp-subtitle">
            Find your invitation and save your seat.
            <br />
            Kindly reply by 19 May 2027.
          </p>

          <label className="input-label" htmlFor="guest-lookup">
            YOUR NAME OR ACCESS CODE
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
              placeholder="Search guest name"
            />
            {lookup && (
              <button type="button" onClick={() => setLookup("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          {guestFound ? (
            <>
              <p className="match-message">✓ Invitation found. A seat is waiting for you.</p>
              <div className="guest-card">
                <span>
                  <strong>Sophia Bennett</strong>
                  <small>2 seats reserved · AJ27–SB084</small>
                </span>
                <b aria-hidden="true">✓</b>
              </div>
            </>
          ) : (
            <p className="match-message no-match">
              No invitation found. Try “Sophia Bennett” or “AJ27-SB084”.
            </p>
          )}

          <fieldset disabled={!guestFound}>
            <legend>WILL YOU BE ATTENDING?</legend>
            <div className="attendance-options">
              <button
                className={attendance === "yes" ? "selected" : ""}
                type="button"
                onClick={() => setAttendance("yes")}
              >
                {attendance === "yes" ? "◉" : "○"} Joyfully accepts
              </button>
              <button
                className={attendance === "no" ? "selected" : ""}
                type="button"
                onClick={() => setAttendance("no")}
              >
                {attendance === "no" ? "◉" : "○"} Regretfully declines
              </button>
            </div>
            <button
              className="gold-button confirm-button"
              type="button"
              onClick={() => setConfirmed(true)}
            >
              {confirmed ? "Response saved ✓" : "Confirm our seats ↗"}
            </button>
          </fieldset>
          <p className="script-note closing-note">A beautiful day is even better with you in it.</p>
        </div>
      </section>

      <footer>
        <p className="footer-monogram">A &amp; J</p>
        <p>WITH LOVE, NOW &amp; ALWAYS</p>
        <p>LAKE COMO · 19.06.2027</p>
      </footer>
    </main>
  );
}
