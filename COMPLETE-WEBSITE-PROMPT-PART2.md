## 💻 **FRONTEND IMPLEMENTATION**

### **Package.json Dependencies**
```json
{
  "name": "iit-bombay-agriculture-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "typescript": "^4.9.4",
    "vite": "^4.1.0",
    "tailwindcss": "^3.2.0",
    "@radix-ui/react-slot": "^1.0.0",
    "@radix-ui/react-toast": "^1.1.3",
    "@radix-ui/react-dialog": "^1.0.3",
    "@radix-ui/react-select": "^1.2.0",
    "@radix-ui/react-textarea": "^1.0.0",
    "class-variance-authority": "^0.4.0",
    "clsx": "^1.2.1",
    "lucide-react": "^0.263.1",
    "tailwind-merge": "^1.8.1",
    "tailwindcss-animate": "^1.0.5"
  }
}
```

### **Tailwind Config (Farmer-Responsive)**
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'xs': '320px',    // Basic phones (Jio Phone, Galaxy J2)
        'sm': '360px',    // Standard smartphones (Redmi Note)
        'md': '640px',    // Large smartphones (iPhone, Galaxy S)
        'lg': '768px',    // Tablets (iPad, Android tablets)
        'xl': '1024px',   // Desktop
        '2xl': '1280px',  // Large desktop
      }
    },
    screens: {
      'xs': '320px',    // Basic phones
      'sm': '360px',    // Standard smartphones  
      'md': '640px',    // Large smartphones
      'lg': '768px',    // Tablets
      'xl': '1024px',   // Desktop
      '2xl': '1280px',  // Large desktop
    },
    fontSize: {
      'xs': ['12px', { lineHeight: '16px' }],
      'sm': ['14px', { lineHeight: '20px' }],
      'base': ['16px', { lineHeight: '24px' }],
      'lg': ['18px', { lineHeight: '28px' }],
      'xl': ['20px', { lineHeight: '32px' }],
      '2xl': ['24px', { lineHeight: '36px' }],
      '3xl': ['30px', { lineHeight: '40px' }],
      '4xl': ['36px', { lineHeight: '48px' }],
      '5xl': ['48px', { lineHeight: '64px' }],
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        agri: {
          green: '#4a7c59',
          lightGreen: '#a4c3a2',
          beige: '#f1ece2',
          brown: '#967259',
          blue: '#6a9ec0',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 3s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```