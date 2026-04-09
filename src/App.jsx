import { useState, useEffect, useRef } from "react";

const projects = [
  {
    name: "Synapse AI News",
    tag: "LIVE",
    desc: "4-agent autonomous pipeline — Researcher → Writer → Reviewer → Image Curator. React/Vite on Vercel, Supabase backend, GitHub Actions scheduling.",
    stack: ["React", "Supabase", "OpenRouter", "GitHub Actions", "Vercel"],
    link: "https://synapseai-news.vercel.app",
    github: "https://github.com/manohar99-1/Vite-synapse-news",
    accent: "#00ff9d",
  },
  {
    name: "CEO Research Agent",
    tag: "AGENTIC · AI",
    desc: "Autonomous multi-agent pipeline that researches CEOs and company leaders — scrapes web sources, synthesizes insights, and generates structured reports using LLMs.",
    stack: ["Python", "OpenRouter", "Multi-Agent", "GitHub Actions"],
    link: null,
    github: "#",
    accent: "#ff6b35",
  },
  {
    name: "Certificate Verification — Blockchain",
    tag: "MAJOR PROJECT",
    desc: "Ethereum/Solidity smart contracts with SHA-256 hashing, QR code verification, React frontend, Node.js/Express backend. Academic conference paper submitted.",
    stack: ["Solidity", "Ethereum", "React", "Node.js", "IPFS"],
    link: null,
    github: "#",
    accent: "#7c3aed",
  },
  {
    name: "AI Video Generator",
    tag: "AUTOMATED",
    desc: "GitHub Actions pipeline generating YouTube Shorts using gTTS voiceover, Pexels stock images, MoviePy editing, and YouTube OAuth auto-upload.",
    stack: ["Python", "gTTS", "MoviePy", "Pexels API", "YouTube API"],
    link: null,
    github: "#",
    accent: "#f59e0b",
  },
  {
    name: "PartTimers",
    tag: "FULL STACK",
    desc: "Full-stack job platform connecting part-time workers with employers. React frontend, Node.js backend, MongoDB database with real-time job matching.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    link: null,
    github: "#",
    accent: "#06b6d4",
  },
  {
    name: "Image Captioning System",
    tag: "INTERNSHIP · AI",
    desc: "Salesforce BLIP model fine-tuned with PyTorch for automatic image captioning. Built during AI internship at MyDailyWork.",
    stack: ["PyTorch", "Salesforce BLIP", "Python", "HuggingFace"],
    link: null,
    github: "https://github.com/manohar99-1/MYDAILYWORK",
    accent: "#ec4899",
  },
];

const skills = [
  { cat: "AI/ML", items: ["PyTorch", "HuggingFace", "OpenRouter", "LLM Pipelines", "Multi-Agent Systems"] },
  { cat: "Backend", items: ["Python", "Node.js", "Express", "FastAPI", "Supabase", "MongoDB"] },
  { cat: "Frontend", items: ["React", "Vite", "JavaScript", "TypeScript", "Tailwind"] },
  { cat: "DevOps", items: ["GitHub Actions", "Vercel", "CI/CD"] },
  { cat: "Blockchain", items: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"] },
];

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={`glitch-text ${glitch ? "glitching" : ""}`} data-text={text}>
      {text}
    </span>
  );
}

function TypeWriter({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && <span className="cursor-blink">|</span>}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${p.alpha})`;
        ctx.fill();
      });
      // draw lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 255, 157, ${0.06 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const navItems = ["home", "projects", "skills", "contact"];

  return (
    <div style={{ fontFamily: "'Space Mono', 'Courier New', monospace", background: "#050a0e", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }

        .glitch-text { position: relative; }
        .glitch-text.glitching::before,
        .glitch-text.glitching::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch-text.glitching::before {
          color: #ff006e; clip: rect(0, 900px, 20px, 0);
          transform: translate(-3px, 0); animation: glitch1 0.15s infinite;
        }
        .glitch-text.glitching::after {
          color: #00ff9d; clip: rect(30px, 900px, 60px, 0);
          transform: translate(3px, 0); animation: glitch2 0.15s infinite;
        }
        @keyframes glitch1 {
          0%,100% { clip: rect(0,900px,20px,0); }
          50% { clip: rect(40px,900px,60px,0); }
        }
        @keyframes glitch2 {
          0%,100% { clip: rect(30px,900px,60px,0); }
          50% { clip: rect(0,900px,20px,0); }
        }

        .cursor-blink { animation: blink 0.7s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .nav-link {
          text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.75rem;
          color: #64748b; text-decoration: none; cursor: pointer;
          padding: 6px 12px; transition: all 0.2s; border: 1px solid transparent;
          background: none; font-family: inherit;
        }
        .nav-link:hover, .nav-link.active {
          color: #00ff9d; border-color: rgba(0,255,157,0.3);
        }

        .section { min-height: 100vh; padding: 80px 24px 60px; max-width: 1100px; margin: 0 auto; }

        .project-card {
          border: 1px solid rgba(255,255,255,0.07);
          padding: 28px;
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--accent);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.3s;
        }
        .project-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
          transform: translateX(4px);
        }
        .project-card:hover::before { transform: scaleY(1); }

        .skill-pill {
          display: inline-block;
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 0.68rem;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin: 3px;
          transition: all 0.2s;
        }
        .skill-pill:hover { border-color: rgba(0,255,157,0.4); color: #00ff9d; }

        .contact-link {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px;
          border: 1px solid rgba(255,255,255,0.08);
          text-decoration: none; color: #94a3b8;
          transition: all 0.2s; font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .contact-link:hover {
          border-color: rgba(0,255,157,0.4); color: #00ff9d;
          background: rgba(0,255,157,0.04);
        }

        .scan-line {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
          pointer-events: none; z-index: 9999;
        }

        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00ff9d;
          animation: pulse-dot 2s infinite;
          display: inline-block;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(0,255,157,0.4); }
          50% { opacity:0.7; box-shadow: 0 0 0 6px rgba(0,255,157,0); }
        }

        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }

        @media(max-width:600px) {
          .section { padding: 70px 16px 40px; }
          .hero-name { font-size: clamp(2.2rem, 10vw, 4rem) !important; }
        }
      `}</style>

      {/* Scanlines overlay */}
      <div className="scan-line" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,10,14,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "52px",
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#00ff9d", letterSpacing: "0.05em" }}>
          MR<span style={{ color: "#ffffff50" }}>.dev</span>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {navItems.map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`}
              onClick={() => {
                setActiveSection(s);
                document.getElementById(s)?.scrollIntoView({ behavior: "smooth" });
              }}>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="status-dot" />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase" }}>
            Available for opportunities
          </span>
        </div>

        <h1 className="hero-name" style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
          lineHeight: 1.05, marginBottom: "16px",
          color: "#ffffff",
        }}>
          <GlitchText text="Manohar" />{" "}
          <span style={{ color: "#00ff9d" }}>Poleboina</span>
        </h1>

        <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", color: "#64748b", maxWidth: "540px", lineHeight: 1.8, marginBottom: "32px" }}>
          <TypeWriter text="Final-year CS @ Vignan Institute · Ships production AI systems end-to-end from mobile" delay={300} />
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
          {["Multi-Agent AI", "Free-tier Infrastructure", "Autonomous Pipelines", "React + Vite"].map((t) => (
            <span key={t} style={{
              padding: "6px 14px", border: "1px solid rgba(0,255,157,0.25)",
              fontSize: "0.72rem", letterSpacing: "0.08em", color: "#00ff9d",
              textTransform: "uppercase",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); setActiveSection("projects"); }}
            style={{
              padding: "12px 28px", background: "#00ff9d", color: "#050a0e",
              textDecoration: "none", fontWeight: 700, fontSize: "0.8rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseOver={e => e.target.style.background = "#00d97a"}
            onMouseOut={e => e.target.style.background = "#00ff9d"}>
            View Projects
          </a>
          <a href="https://github.com/manohar99-1" target="_blank" rel="noreferrer"
            style={{
              padding: "12px 28px", border: "1px solid rgba(255,255,255,0.2)", color: "#e2e8f0",
              textDecoration: "none", fontSize: "0.8rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.target.style.borderColor = "rgba(0,255,157,0.5)"; e.target.style.color = "#00ff9d"; }}
            onMouseOut={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "#e2e8f0"; }}>
            GitHub ↗
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "40px", marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px", flexWrap: "wrap" }}>
          {[["6+", "Projects Shipped"], ["1", "Internship"], ["1", "Research Paper"]].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#ffffff" }}>{val}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#475569", textTransform: "uppercase", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section fade-in" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "40px" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase" }}>// 02 — Projects</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginTop: "8px" }}>What I've Built</h2>
        </div>

        <div className="grid-2">
          {projects.map((p, i) => (
            <div key={i} className="project-card" style={{ "--accent": p.accent }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", color: p.accent, textTransform: "uppercase", padding: "2px 8px", border: `1px solid ${p.accent}40` }}>
                  {p.tag}
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "#475569", textDecoration: "none", fontSize: "0.75rem" }} onClick={e => e.stopPropagation()}>Live ↗</a>}
                  {p.github && p.github !== "#" && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: "#475569", textDecoration: "none", fontSize: "0.75rem" }} onClick={e => e.stopPropagation()}>GH ↗</a>}
                </div>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "10px", color: "#f1f5f9" }}>{p.name}</h3>
              <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.7, marginBottom: "16px" }}>{p.desc}</p>
              <div>
                {p.stack.map((s) => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "40px" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase" }}>// 03 — Skills</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginTop: "8px" }}>Tech Stack</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px" }}>
          {skills.map((s) => (
            <div key={s.cat} style={{ borderLeft: "2px solid rgba(0,255,157,0.3)", paddingLeft: "16px" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase", marginBottom: "12px" }}>{s.cat}</div>
              {s.items.map((item) => (
                <div key={item} className="skill-pill" style={{ display: "block", margin: "4px 0", padding: "5px 10px" }}>{item}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: "64px", padding: "28px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase", marginBottom: "16px" }}>Education</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>B.Tech Computer Science</div>
              <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "4px" }}>Vignan Institute of Technology and Science, Hyderabad</div>
              <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: "4px" }}>Final Year · 2021–2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "40px" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#00ff9d", textTransform: "uppercase" }}>// 04 — Contact</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginTop: "8px" }}>Get In Touch</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "12px", maxWidth: "480px", lineHeight: 1.7 }}>
            Open to AI/ML Engineer roles, software engineering internships, and interesting collaborations. Let's build something.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
          {[
            { label: "GitHub", href: "https://github.com/manohar99-1", icon: "⌥" },
            { label: "Synapse AI News", href: "https://synapseai-news.vercel.app", icon: "◆" },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="contact-link">
              <span style={{ fontSize: "1rem", width: "20px", color: "#00ff9d" }}>{c.icon}</span>
              <span style={{ letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.78rem" }}>{c.label}</span>
              <span style={{ marginLeft: "auto", fontSize: "0.7rem", opacity: 0.4 }}>↗</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em" }}>© 2026 Manohar Poleboina</span>
          <span style={{ fontSize: "0.7rem", color: "#334155", letterSpacing: "0.1em" }}>Built with React · Deployed on Vercel</span>
        </div>
      </section>
    </div>
  );
}
