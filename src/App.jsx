import { useState, useEffect, useRef } from "react";

const POKEBALL_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="white" stroke="#1a1a2e" strokeWidth="4"/>
  <path d="M2 50 Q2 2 50 2 Q98 2 98 50 Z" fill="#e63946"/>
  <rect x="2" y="46" width="96" height="8" fill="#1a1a2e"/>
  <circle cx="50" cy="50" r="14" fill="white" stroke="#1a1a2e" strokeWidth="4"/>
  <circle cx="50" cy="50" r="7" fill="#e8e8e8"/>
</svg>`;

const typeColors = {
  fire: "#FF6B35",
  water: "#4895EF",
  grass: "#52B788",
  electric: "#FFD60A",
  psychic: "#F72585",
  normal: "#A8A8A8",
  fighting: "#B5451B",
  tech: "#7B2FBE",
  leader: "#06D6A0",
  community: "#FB8500",
};

const skills = [
  { name: "Python", type: "tech", level: 85 },
  { name: "JavaScript", type: "tech", level: 80 },
  { name: "Microsoft Excel", type: "normal", level: 75 },
  { name: "Microsoft Word", type: "normal", level: 75 },
  { name: "Leadership", type: "leader", level: 95 },
  { name: "Community Service", type: "community", level: 90 },
];

const projects = [
  {
    id: 1,
    name: "Trajectory",
    pokemonType: "psychic",
    icon: "🚀",
    course: "Hackathon Project, Computer Science",
    dates: "2024",
    objective:
      "An AI-powered learning website I built with a group of friends at a hackathon. Trajectory is designed to help students learn more effectively by using AI to personalize study content and explain concepts in ways that actually make sense to them.",
    responsibilities:
      "I worked alongside my teammates to design and build the whole site during the hackathon. I helped with the AI integration, worked on the frontend, and made sure the experience felt intuitive for students trying to use it.",
    learned:
      "This project taught me a lot about working fast as a team under pressure. I got real hands-on experience with AI APIs and learned what it takes to go from an idea to a working product in a short amount of time. Pitching it to judges was also a great experience.",
    skills: ["AI Integration", "Web Development", "Teamwork", "Hackathon", "UX Design"],
    rarity: "Legendary",
    hp: 240,
  },
  {
    id: 2,
    name: "Cluedle",
    pokemonType: "electric",
    icon: "🔤",
    course: "Personal Project, Computer Science",
    dates: "2024 to Present",
    objective:
      "A word game I made that takes inspiration from Wordle but puts a different spin on it. Instead of guessing whole words, you guess individual letters of a hidden word. Your score at the end depends on how many tries it took you, so there is a real incentive to think carefully before each guess.",
    responsibilities:
      "I built the entire game myself from scratch. That included the core letter guessing mechanic, a scoring system that rewards players who solve it in fewer tries, and the overall look and feel of the game with visual feedback on every guess.",
    learned:
      "Building Cluedle helped me get a lot better at thinking through game logic and managing state in JavaScript. I also learned how to design a scoring system that keeps things fun and motivating without feeling unfair.",
    skills: ["JavaScript", "Game Design", "UI/UX", "Logic and Algorithms", "CSS Animations"],
    rarity: "Ultra Rare",
    hp: 210,
  },
];

const experiences = [
  {
    title: "DubShot Coach",
    org: "Basketball Academy",
    dates: "2023 – Present",
    type: "fire",
    bullets: [
      "Basketball academy coaching community, 2nd–7th graders",
      "Helped raise over $10k for Challenged Athletes Foundation",
    ],
  },
  {
    title: "Volleyball Summer Coach",
    org: "Summer Camp",
    dates: "2023 – Present",
    type: "water",
    bullets: [
      "Taught middle schoolers how to play volleyball",
      "Helped raise over $5k for Emerald High Volleyball Team",
    ],
  },
  {
    title: "Varsity Captain",
    org: "Emerald High Volleyball",
    dates: "2024 – Present",
    type: "electric",
    bullets: [
      "Captain of team, directs practice strategy",
      "Takes over for Coach when needed",
      "Plans and organizes team practices",
    ],
  },
];

// ---- Pokeball cursor trail ----
function PokeballCursor() {
  const [trail, setTrail] = useState([]);
  useEffect(() => {
    const handler = (e) => {
      setTrail((prev) => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {trail.map((t, i) => (
        <div
          key={t.id}
          style={{
            position: "fixed",
            left: t.x - 8,
            top: t.y - 8,
            width: 16,
            height: 16,
            opacity: (i / trail.length) * 0.6,
            transform: `scale(${0.3 + (i / trail.length) * 0.7})`,
            transition: "opacity 0.3s",
          }}
          dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }}
        />
      ))}
    </div>
  );
}

// ---- Animated Pokeball divider ----
function DividerBall() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "48px 0 32px" }}>
      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, transparent, #e63946)" }} />
      <div style={{ width: 32, height: 32, animation: "spin 4s linear infinite" }}
        dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }} />
      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, #e63946, transparent)" }} />
    </div>
  );
}

// ---- Stat bar ----
function StatBar({ label, value, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, color: "#ccc" }}>
        <span>{label}</span><span style={{ color }}>{value}</span>
      </div>
      <div style={{ background: "#1a1a2e", borderRadius: 8, height: 10, overflow: "hidden", border: "1px solid #333" }}>
        <div style={{
          width: `${width}%`, height: "100%", borderRadius: 8,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          transition: "width 1.2s cubic-bezier(.17,.67,.35,1.2)",
          boxShadow: `0 0 8px ${color}88`,
        }} />
      </div>
    </div>
  );
}

// ---- Type badge ----
function TypeBadge({ type }) {
  const color = typeColors[type] || "#888";
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: 1,
    }}>{type}</span>
  );
}

// ---- Project card (Pokémon card style) ----
function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const color = typeColors[project.pokemonType] || "#888";
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ cursor: "pointer", perspective: 1000, width: "100%", maxWidth: 340, margin: "0 auto" }}
    >
      <div style={{
        position: "relative", width: "100%", paddingBottom: "140%",
        transition: "transform 0.7s cubic-bezier(.4,2,.3,1)",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: `linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, ${color}22 100%)`,
          border: `2px solid ${color}66`, borderRadius: 18,
          boxShadow: `0 0 30px ${color}33, 0 8px 32px #0007`,
          padding: 20, display: "flex", flexDirection: "column",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <TypeBadge type={project.pokemonType} />
            <span style={{ color: "#FFD60A", fontSize: 12, fontWeight: 700 }}>HP {project.hp}</span>
          </div>
          <div style={{ fontSize: 64, textAlign: "center", margin: "16px 0" }}>{project.icon}</div>
          <div style={{
            background: `${color}11`, border: `1px solid ${color}33`, borderRadius: 10,
            padding: "8px 12px", marginBottom: 10,
          }}>
            <div style={{ color: "#aaa", fontSize: 11 }}>HP BAR</div>
            <div style={{ background: "#0d0d1a", borderRadius: 6, height: 8, marginTop: 4 }}>
              <div style={{ width: `${(project.hp / 250) * 100}%`, height: "100%", background: color, borderRadius: 6, transition: "width 1s" }} />
            </div>
          </div>
          <h3 style={{ color: "#fff", fontFamily: "'Press Start 2P', monospace", fontSize: 13, margin: "8px 0 4px" }}>
            {project.name}
          </h3>
          <div style={{ color: "#888", fontSize: 11, marginBottom: 8 }}>{project.dates}</div>
          <div style={{ marginTop: "auto", color: "#666", fontSize: 11, textAlign: "center" }}>
            Click to reveal details →
          </div>
          <div style={{ position: "absolute", top: 10, right: 10, opacity: 0.08, width: 60, height: 60 }}
            dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }} />
          <div style={{ position: "absolute", bottom: 8, left: 12, color: color, fontSize: 10 }}>{project.rarity}</div>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: `linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)`,
          border: `2px solid ${color}66`, borderRadius: 18,
          boxShadow: `0 0 30px ${color}33, 0 8px 32px #0007`,
          padding: 20, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto",
        }}>
          <h3 style={{ color, fontFamily: "'Press Start 2P', monospace", fontSize: 11, marginBottom: 4 }}>{project.name}</h3>
          <div>
            <div style={{ color: "#FFD60A", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>OBJECTIVE</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{project.objective}</p>
          </div>
          <div>
            <div style={{ color: "#4895EF", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>MY ROLE</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{project.responsibilities}</p>
          </div>
          <div>
            <div style={{ color: "#52B788", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>WHAT I LEARNED</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{project.learned}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {project.skills.map(s => (
              <span key={s} style={{ background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 12, padding: "2px 8px", fontSize: 10 }}>{s}</span>
            ))}
          </div>
          <div style={{ color: "#555", fontSize: 10, textAlign: "center", marginTop: "auto" }}>Click to flip back</div>
        </div>
      </div>
    </div>
  );
}

// ---- Nav ----
function Nav({ active, setActive }) {
  const items = ["home", "about", "projects", "resume", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(10,10,20,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e6394622",
      display: "flex", justifyContent: "center", alignItems: "center",
      gap: 8, padding: "12px 24px",
    }}>
      <div style={{ width: 28, height: 28, marginRight: 12 }} dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }} />
      <span style={{ color: "#e63946", fontFamily: "'Press Start 2P', monospace", fontSize: 12, marginRight: 24 }}>
        ARYAN
      </span>
      {items.map(item => (
        <button
          key={item}
          onClick={() => setActive(item)}
          style={{
            background: active === item ? "#e6394622" : "transparent",
            border: active === item ? "1px solid #e63946" : "1px solid transparent",
            color: active === item ? "#e63946" : "#aaa",
            borderRadius: 8, padding: "6px 14px", cursor: "pointer",
            fontFamily: "'Press Start 2P', monospace", fontSize: 9,
            textTransform: "uppercase", transition: "all 0.2s",
          }}
        >{item}</button>
      ))}
    </nav>
  );
}

// ---- Hero ----
function Hero({ setActive }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0d0d1a 60%, #0a0a14 100%)",
      position: "relative", overflow: "hidden", paddingTop: 80,
    }}>
      {/* Floating pokeballs bg */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
          width: 40 + (i % 3) * 20, height: 40 + (i % 3) * 20,
          opacity: 0.04, animation: `float${i % 3} ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }} dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }} />
      ))}
      {/* Pixel grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{
        textAlign: "center", zIndex: 1,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(.17,.67,.35,1.2)",
      }}>
        <div style={{
          display: "inline-block", background: "#e6394611", border: "1px solid #e6394644",
          borderRadius: 24, padding: "6px 20px", marginBottom: 24,
          color: "#e63946", fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          animation: "pulse 2s ease-in-out infinite",
        }}>
          ◉ TRAINER CARD LOADED
        </div>
        <h1 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(28px, 5vw, 64px)",
          color: "#fff", margin: "0 0 8px",
          textShadow: "0 0 40px #e6394666, 0 0 80px #e6394633",
          lineHeight: 1.3,
        }}>
          ARYAN<br />
          <span style={{ color: "#e63946" }}>DWARAM</span>
        </h1>
        <div style={{
          color: "#FFD60A", fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(9px, 1.5vw, 13px)", letterSpacing: 4,
          marginBottom: 32, opacity: 0.9,
        }}>
          ★ CS & BUSINESS STUDENT ★
        </div>
        <p style={{
          color: "#aaa", fontSize: 16, maxWidth: 520, margin: "0 auto 40px",
          lineHeight: 1.8, fontFamily: "'Courier New', monospace",
        }}>
          Astute, highly dedicated and community-oriented trainer aspiring to master
          Computer Science and Business — finding opportunities to learn and give back.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setActive("projects")}
            style={{
              background: "linear-gradient(135deg, #e63946, #c1121f)",
              border: "none", borderRadius: 12, padding: "14px 28px",
              color: "#fff", fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              cursor: "pointer", boxShadow: "0 4px 20px #e6394644",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 30px #e6394666"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px #e6394644"; }}
          >
            VIEW PROJECTS
          </button>
          <button
            onClick={() => setActive("contact")}
            style={{
              background: "transparent", border: "2px solid #e63946",
              borderRadius: 12, padding: "14px 28px",
              color: "#e63946", fontFamily: "'Press Start 2P', monospace", fontSize: 10,
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "#e6394622"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
          >
            CONTACT ME
          </button>
        </div>

        {/* Trainer ID card — inline below buttons */}
        <div style={{
          marginTop: 40,
          display: "inline-block",
          background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)",
          border: "1px solid #e6394444", borderRadius: 14,
          padding: "16px 24px",
          opacity: visible ? 1 : 0, transition: "opacity 1s 0.5s",
          boxShadow: "0 4px 24px #0008",
        }}>
          <div style={{ color: "#e63946", fontFamily: "'Press Start 2P', monospace", fontSize: 8, marginBottom: 10 }}>TRAINER ID</div>
          <div style={{ color: "#ccc", fontSize: 12, display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span>🎓 Emerald High School</span>
            <span>📍 Dublin, CA</span>
            <span>⭐ GPA: 4.33</span>
            <span>🏆 Varsity Captain</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- About ----
function About() {
  return (
    <section style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "#0d0d1a" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionTitle>ABOUT ME</SectionTitle>
        <DividerBall />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
              border: "1px solid #e6394433", borderRadius: 20,
              padding: 32, marginBottom: 24,
            }}>
              <div style={{ fontSize: 80, textAlign: "center", marginBottom: 16 }}>🎮</div>
              <h3 style={{ color: "#FFD60A", fontFamily: "'Press Start 2P', monospace", fontSize: 12, marginBottom: 16, textAlign: "center" }}>
                TRAINER PROFILE
              </h3>
              <p style={{ color: "#ccc", lineHeight: 1.8, fontSize: 14, margin: 0 }}>
                Adventurous and open-minded, yet grounded in logic — I thrive on challenges both
                inside and outside the classroom. When I'm not competing on the varsity volleyball
                court or tutoring underserved students, you'll find me deep in a video game or
                making memories with the people I love. I'm driven by a genuine passion for
                learning and a belief that education has the power to change lives.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "📧", label: "Email", val: "aryan.dwaram@gmail.com" },
                { icon: "📞", label: "Phone", val: "(341) 500-3632" },
                { icon: "📍", label: "Location", val: "Dublin, CA 94568" },
                { icon: "🎂", label: "Age", val: "17" },
              ].map(i => (
                <div key={i.label} style={{
                  background: "#1a1a2e", border: "1px solid #333", borderRadius: 12,
                  padding: "12px 16px",
                }}>
                  <div style={{ fontSize: 18 }}>{i.icon}</div>
                  <div style={{ color: "#666", fontSize: 10, marginTop: 4 }}>{i.label}</div>
                  <div style={{ color: "#ccc", fontSize: 11, marginTop: 2 }}>{i.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
              border: "1px solid #4895EF33", borderRadius: 20,
              padding: 32, marginBottom: 24,
            }}>
              <h3 style={{ color: "#4895EF", fontFamily: "'Press Start 2P', monospace", fontSize: 12, marginBottom: 20 }}>
                SKILL STATS
              </h3>
              {skills.map(s => (
                <StatBar key={s.name} label={s.name} value={s.level} color={typeColors[s.type]} />
              ))}
            </div>
            <div style={{
              background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
              border: "1px solid #52B78833", borderRadius: 20,
              padding: 24,
            }}>
              <h3 style={{ color: "#52B788", fontFamily: "'Press Start 2P', monospace", fontSize: 12, marginBottom: 16 }}>
                LANGUAGES
              </h3>
              {[
                { lang: "English", level: "Native", pct: 100 },
                { lang: "Telugu", level: "Conversational", pct: 55 },
                { lang: "Spanish", level: "Working", pct: 35 },
              ].map(l => (
                <div key={l.lang} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#ccc", fontSize: 13, marginBottom: 4 }}>
                    <span>{l.lang}</span><span style={{ color: "#888", fontSize: 11 }}>{l.level}</span>
                  </div>
                  <div style={{ background: "#0d0d1a", borderRadius: 6, height: 8 }}>
                    <div style={{ width: `${l.pct}%`, height: "100%", background: "#52B788", borderRadius: 6, transition: "width 1.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Projects ----
function Projects() {
  return (
    <section style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "#0a0a14" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle>PROJECTS</SectionTitle>
        <p style={{ color: "#666", textAlign: "center", fontFamily: "'Press Start 2P', monospace", fontSize: 9, marginBottom: 8 }}>
          — FLIP CARDS TO REVEAL FULL DETAILS —
        </p>
        <DividerBall />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28, marginTop: 16,
        }}>
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

// ---- Resume ----
function Resume() {
  return (
    <section style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "#0d0d1a" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionTitle>RESUME</SectionTitle>
        <DividerBall />

        {/* Education */}
        <ResumeBlock title="EDUCATION" color="#FFD60A" icon="🎓">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Emerald High School</div>
              <div style={{ color: "#aaa", fontSize: 13 }}>Diploma In Progress</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {["AP Chemistry", "AP Calculus", "AP Computer Science A"].map(c => (
                  <span key={c} style={{
                    background: "#FFD60A22", color: "#FFD60A", border: "1px solid #FFD60A44",
                    borderRadius: 20, padding: "3px 10px", fontSize: 12,
                  }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#FFD60A", fontSize: 14 }}>2023 – Present</div>
              <div style={{ color: "#52B788", fontSize: 20, fontWeight: 700, marginTop: 4 }}>GPA: 4.33</div>
            </div>
          </div>
        </ResumeBlock>

        {/* Work Experience */}
        <ResumeBlock title="WORK EXPERIENCE" color="#FF6B35" icon="💼">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {experiences.map(e => (
              <div key={e.title} style={{
                background: "#0d0d1a", border: `1px solid ${typeColors[e.type]}33`,
                borderRadius: 12, padding: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{e.title}</div>
                    <div style={{ color: typeColors[e.type], fontSize: 12 }}>{e.org}</div>
                  </div>
                  <TypeBadge type={e.type} />
                </div>
                <div style={{ color: "#666", fontSize: 11, marginBottom: 8 }}>{e.dates}</div>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {e.bullets.map((b, i) => (
                    <li key={i} style={{ color: "#bbb", fontSize: 12, lineHeight: 1.7 }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeBlock>

        {/* Leadership */}
        <ResumeBlock title="LEADERSHIP & EXTRACURRICULARS" color="#06D6A0" icon="⭐">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { title: "Emerald Volleyball Club – VP", dates: "2023–Present", bullets: ["Organized games and managed social media", "Recruited ~30 members", "Led fundraiser for disabled athletes' equipment"] },
              { title: "LearnToBe – Volunteer Tutor", dates: "2023–Present", bullets: ["501(c)3 nonprofit tutor", "Tutored 4 kids including ESL & ADHD students", "All school subjects covered"] },
              { title: "Private Client Tutor", dates: "2023–Present", bullets: ["1:1 and small group tutoring", "Reinforce learning concepts for teachers"] },
              { title: "EHS Volleyball Varsity Captain", dates: "2024–Present", bullets: ["Captain of team", "Plans and organizes practices"] },
              { title: "Norcal Club Volleyball – Player", dates: "2023–Present", bullets: ["Setter for the team", "Equipment management & team events"] },
            ].map(l => (
              <div key={l.title} style={{
                background: "#0a0a14", border: "1px solid #06D6A022",
                borderRadius: 12, padding: 14,
              }}>
                <div style={{ color: "#06D6A0", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{l.title}</div>
                <div style={{ color: "#666", fontSize: 11, marginBottom: 6 }}>{l.dates}</div>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {l.bullets.map((b, i) => <li key={i} style={{ color: "#bbb", fontSize: 12, lineHeight: 1.6 }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </ResumeBlock>

        {/* Interests */}
        <ResumeBlock title="INTERESTS" color="#F72585" icon="🎯">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["📖 Reading", "✍️ Writing", "🎤 Public Speaking", "🏐 Volleyball", "🏀 Basketball"].map(i => (
              <span key={i} style={{
                background: "#F7258522", color: "#F72585",
                border: "1px solid #F7258544", borderRadius: 20,
                padding: "8px 16px", fontSize: 14,
              }}>{i}</span>
            ))}
          </div>
        </ResumeBlock>
      </div>
    </section>
  );
}

function ResumeBlock({ title, color, icon, children }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
      border: `1px solid ${color}33`, borderRadius: 20,
      padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <h3 style={{ color, fontFamily: "'Press Start 2P', monospace", fontSize: 11, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ---- Contact ----
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };
  return (
    <section style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "#0a0a14" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <SectionTitle>CONTACT</SectionTitle>
        <DividerBall />
        {!sent ? (
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
            border: "1px solid #e6394433", borderRadius: 24,
            padding: 40,
          }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 48 }}>📡</div>
              <p style={{ color: "#aaa", fontFamily: "'Press Start 2P', monospace", fontSize: 9, marginTop: 12 }}>
                SEND A MESSAGE TO TRAINER ARYAN
              </p>
            </div>
            {["name", "email", "message"].map(field => (
              <div key={field} style={{ marginBottom: 20 }}>
                <label style={{ color: "#e63946", fontFamily: "'Press Start 2P', monospace", fontSize: 9, display: "block", marginBottom: 8 }}>
                  {field.toUpperCase()}
                </label>
                {field === "message" ? (
                  <textarea
                    rows={5}
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    style={{
                      width: "100%", background: "#0d0d1a", border: "1px solid #333",
                      borderRadius: 10, padding: "12px 16px", color: "#fff",
                      fontSize: 14, fontFamily: "inherit", resize: "vertical",
                      outline: "none", boxSizing: "border-box",
                    }}
                    placeholder="Your message..."
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    style={{
                      width: "100%", background: "#0d0d1a", border: "1px solid #333",
                      borderRadius: 10, padding: "12px 16px", color: "#fff",
                      fontSize: 14, fontFamily: "inherit", outline: "none",
                      boxSizing: "border-box",
                    }}
                    placeholder={field === "email" ? "your@email.com" : "Your name"}
                  />
                )}
              </div>
            ))}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%", background: "linear-gradient(135deg, #e63946, #c1121f)",
                border: "none", borderRadius: 12, padding: "16px",
                color: "#fff", fontFamily: "'Press Start 2P', monospace", fontSize: 11,
                cursor: "pointer", boxShadow: "0 4px 20px #e6394444",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              SEND MESSAGE ▶
            </button>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "📧", label: "Email", val: "aryan.dwaram@gmail.com" },
                { icon: "📞", label: "Phone", val: "(341) 500-3632" },
                { icon: "📍", label: "Location", val: "Dublin, CA 94568" },
                { icon: "🏫", label: "School", val: "Emerald High School" },
              ].map(c => (
                <div key={c.label} style={{ background: "#0d0d1a", border: "1px solid #333", borderRadius: 12, padding: 16 }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div style={{ color: "#666", fontSize: 11, marginTop: 4 }}>{c.label}</div>
                  <div style={{ color: "#ccc", fontSize: 12, marginTop: 2 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: 80,
            background: "linear-gradient(135deg, #1a1a2e, #0f0f1f)",
            border: "1px solid #52B78844", borderRadius: 24,
          }}>
            <div style={{ fontSize: 64, animation: "bounce 1s ease-in-out 3" }}>🎉</div>
            <div style={{ color: "#52B788", fontFamily: "'Press Start 2P', monospace", fontSize: 14, marginTop: 24 }}>
              MESSAGE SENT!
            </div>
            <p style={{ color: "#aaa", marginTop: 16 }}>Thanks for reaching out, Trainer!</p>
            <button
              onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
              style={{
                background: "transparent", border: "2px solid #52B788",
                borderRadius: 10, padding: "10px 24px", color: "#52B788",
                fontFamily: "'Press Start 2P', monospace", fontSize: 9,
                cursor: "pointer", marginTop: 20,
              }}
            >SEND ANOTHER</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ---- Section title ----
function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: "clamp(18px, 3vw, 32px)",
      color: "#fff", textAlign: "center",
      textShadow: "0 0 30px #e6394666",
      marginBottom: 8,
    }}>
      <span style={{ color: "#e63946" }}>▶ </span>{children}
    </h2>
  );
}

// ---- Main App ----
export default function App() {
  const [active, setActive] = useState("home");

  const renderSection = () => {
    switch (active) {
      case "home": return <Hero setActive={setActive} />;
      case "about": return <About />;
      case "projects": return <Projects />;
      case "resume": return <Resume />;
      case "contact": return <Contact />;
      default: return <Hero setActive={setActive} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0a0a14; color: #fff; font-family: 'Segoe UI', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a14; }
        ::-webkit-scrollbar-thumb { background: #e63946; border-radius: 3px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(5deg); } 50% { transform: translateY(-30px) rotate(-5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
      <PokeballCursor />
      <Nav active={active} setActive={setActive} />
      <main>
        {renderSection()}
      </main>
      <footer style={{
        background: "#0a0a14", borderTop: "1px solid #1a1a2e",
        padding: "20px 24px", textAlign: "center",
      }}>
        <div style={{ color: "#333", fontFamily: "'Press Start 2P', monospace", fontSize: 8 }}>
          © 2026 ARYAN DWARAM — ALL RIGHTS RESERVED
        </div>
      </footer>
    </>
  );
}
