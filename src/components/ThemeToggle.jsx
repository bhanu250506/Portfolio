
// import { Sun, Moon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils"; // Utility to combine classNames

// export const ThemeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//     if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsAnimating(true);
//     setTimeout(() => setIsAnimating(false), 600); // Spinner duration

//     if (isDarkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setIsDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setIsDarkMode(true);
//     }
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       aria-label="Toggle theme"
//       className={cn(
//         "fixed top-4 right-4 md:top-6 md:right-6 z-50",
//         "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center",
//         "transition-all duration-300 ease-in-out",
//         "hover:scale-105 active:scale-95",
//         "focus:outline-none focus:ring-4 focus:ring-white/30",
//         isDarkMode
//           ? "bg-white/10 border border-white/20 backdrop-blur-md"
//           : "bg-neutral-800 text-white border border-neutral-600 shadow-md"
//       )}
//     >
//       <span
//         className={cn(
//           "transition-transform duration-500",
//           isAnimating && "animate-spin"
//         )}
//       >
//         {isDarkMode ? (
//           <Sun className="h-7 w-7 text-yellow-300 drop-shadow-sm" />
//         ) : (
//           <Moon className="h-7 w-7 text-white drop-shadow-sm" />
//         )}
//       </span>
//     </button>
//   );
// };
