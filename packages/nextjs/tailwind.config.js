/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./utils/**/*.{js,ts,jsx,tsx}",
      './pages/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    plugins: [require("daisyui"), require("tailwindcss-animate")],
    darkTheme: "dark",
    darkMode: ["class", "selector", "[data-theme='dark']"], // Allow both class and data-theme toggling
    // DaisyUI theme colors
    daisyui: {
      themes: [
        {
          light: {
            primary: "#93BBFB",
            "primary-content": "#212638",
            secondary: "#DAE8FF",
            "secondary-content": "#212638",
            accent: "#93BBFB",
            "accent-content": "#212638",
            neutral: "#212638",
            "neutral-content": "#ffffff",
            "base-100": "#ffffff",
            "base-200": "#f4f8ff",
            "base-300": "#DAE8FF",
            "base-content": "#212638",
            info: "#93BBFB",
            success: "#34EEB6",
            warning: "#FFCF72",
            error: "#FF8863",
  
            "--rounded-btn": "9999rem",
  
            ".tooltip": {
              "--tooltip-tail": "6px",
            },
            ".link": {
              textUnderlineOffset: "2px",
            },
            ".link:hover": {
              opacity: "80%",
            },
          },
        },
        {
          dark: {
            primary: "#212638",
            "primary-content": "#F9FBFF",
            secondary: "#323f61",
            "secondary-content": "#F9FBFF",
            accent: "#4969A6",
            "accent-content": "#F9FBFF",
            neutral: "#F9FBFF",
            "neutral-content": "#385183",
            "base-100": "#385183",
            "base-200": "#2A3655",
            "base-300": "#212638",
            "base-content": "#F9FBFF",
            info: "#385183",
            success: "#34EEB6",
            warning: "#FFCF72",
            error: "#FF8863",
  
            "--rounded-btn": "9999rem",
  
            ".tooltip": {
              "--tooltip-tail": "6px",
              "--tooltip-color": "oklch(var(--p))",
            },
            ".link": {
              textUnderlineOffset: "2px",
            },
            ".link:hover": {
              opacity: "80%",
            },
          },
        },
      ],
    },
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        boxShadow: {
          center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "pulse-fast": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
          marquee: {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(calc(-100% - var(--gap)))" },
          },
          "marquee-vertical": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(calc(-100% - var(--gap)))" },
          },
          "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "pulse-fast": "pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          marquee: "marquee var(--duration) linear infinite",
          "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
          "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
          slide: "slide var(--speed) ease-in-out infinite alternate",
        },
      },
    },
  };