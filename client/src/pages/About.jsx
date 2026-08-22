import { useAuth } from "../context/AuthContext";

const techStack = [
  { category: "Frontend", items: ["React 18", "Vite"] },
  { category: "Backend", items: ["Node.js", "Express"] },
  { category: "Database", items: ["MongoDB", "Mongoose"] },
  { category: "Languages", items: ["JavaScript (ES6+)", "JSX", "CSS"] },
  { category: "Auth", items: ["JWT", "bcrypt"] },
];

export default function About() {
  const { user } = useAuth();

  return (
    <div className="auth-card about-card">
      <h2>About</h2>
      <p className="auth-subtitle">
        This page is only available to authenticated users
      </p>

      <div className="alert alert-success">
        Welcome, {user?.username}. You are viewing a protected page.
      </div>

      <section className="about-section">
        <h3>Developer</h3>
        <div className="profile-card">
          <div className="profile-avatar">CAmechi</div>
          <div className="profile-info">
            <h3>CHUKWURA Amechi</h3>
            <p>Full-Stack Developer</p>
          </div>
        </div>
        <p className="about-bio">
           A developer actively building practical full‑stack applications as part of continuous learning. His webapp repository demonstrates competence in modern web development through a complete authentication system that combines a React 18 + Vite frontend with a Node.js/Express backend and MongoDB (via Mongoose). The project implements secure user registration and login using JWT tokens and bcrypt password hashing, protected routes, form validation on both client and server, and a clean, responsive interface—illustrating a solid grasp of end‑to‑end application architecture, security fundamentals, and contemporary JavaScript tooling.<br/>
           This web application project was developed using VSCodium on a Windows 11 Pro laptop, running a Debian 13 Windows Subsystem for Linux (WSL2) backend. Note, this project is open source and available on GitHub (https://github.com/camechi/auth-app).
        </p>
      </section>

      <section className="about-section">
        <h3>Tech Stack</h3>
        <ul className="tech-list">
          {techStack.map((group) => (
            <li key={group.category} className="tech-item">
              <span className="tech-category">{group.category}</span>
              <span className="tech-items">{group.items.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
