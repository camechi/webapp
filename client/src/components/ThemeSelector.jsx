import { useTheme } from "../context/ThemeContext";

const THEMES = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "grey", label: "Grey", icon: "🌗" },
  { id: "dark", label: "Dark", icon: "🌙" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-selector" role="group" aria-label="Theme selector">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`theme-option ${theme === t.id ? "active" : ""}`}
          onClick={() => setTheme(t.id)}
          title={`${t.label} theme`}
          aria-pressed={theme === t.id}
        >
          <span className="theme-icon" aria-hidden="true">
            {t.icon}
          </span>
          <span className="theme-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
