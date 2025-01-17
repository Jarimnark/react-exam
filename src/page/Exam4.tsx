import { useEffect, useState } from "react";

type Theme = "light" | "dark";


export default function Exam4() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check the localStorage for theme preference
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    return storedTheme || "light";
  });

  useEffect(() => {
    // Update the `html` tag's class based on theme
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save the theme preference in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return <div className="flex justify-center items-center flex-col">
    <h3 className="text-center font-bold m-8 text-3xl">Exam 4</h3>
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  </div>
}