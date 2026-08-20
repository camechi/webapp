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
          <div className="profile-avatar">C</div>
          <div className="profile-info">
            <h3>Camechi</h3>
            <p>Full-Stack Developer</p>
          </div>
        </div>
        <p className="about-bio">
          Full-stack developer focused on building clean, secure web
          applications. Passionate about authentication, user experience, and
          modern JavaScript tooling.
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
