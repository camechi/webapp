// ThemeContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext(null);

const VALID_THEMES = ["light", "grey", "dark"];
const DEFAULT_THEME = "light";

// Light is always the default for guests. The saved theme is only
// used when a user is logged in (stored user in localStorage).
function getInitialTheme() {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const theme = JSON.parse(storedUser).theme;
      if (VALID_THEMES.includes(theme)) return theme;
    }
  } catch {
    // Ignore corrupt localStorage
  }
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const { user, loading, login } = useAuth();
  const [theme, setThemeState] = useState(getInitialTheme);

  // Apply the active theme to <html> (drives the CSS variables)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Keep the theme in sync with the auth state:
  //  - logged in  -> apply the user's saved theme (fall back to 'light')
  //  - logged out -> always reset to 'light'
  useEffect(() => {
    if (loading) return; // wait until the stored session is restored
    if (user) {
      setThemeState(
        VALID_THEMES.includes(user.theme) ? user.theme : DEFAULT_THEME,
      );
    } else {
      setThemeState(DEFAULT_THEME);
    }
  }, [user, loading]);

  const setTheme = useCallback(
    async (newTheme) => {
      if (!VALID_THEMES.includes(newTheme)) return;

      // Apply immediately
      setThemeState(newTheme);

      const token = localStorage.getItem("token");
      if (!token) return; // guest: nothing to persist

      // Persist to the backend so the preference is remembered for this user
      try {
        const res = await fetch("/api/auth/theme", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ theme: newTheme }),
        });

        if (!res.ok) {
          console.error("Failed to save theme preference:", res.status);
          return;
        }

        // Keep the locally stored user (and in-memory auth state) in sync
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.theme !== newTheme) {
            parsed.theme = newTheme;
            localStorage.setItem("user", JSON.stringify(parsed));
            if (user) login(token, parsed); // refresh in-memory user.theme
          }
        }
      } catch (err) {
        console.error("Failed to save theme preference", err);
      }
    },
    [user, login],
  );
  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
