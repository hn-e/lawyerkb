"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 block dark:hidden" />
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between bg-white/90 dark:bg-background/90 backdrop-blur-md px-8 py-4 border-b border-border/50">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight">
          KhushAI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/acts" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Bare Acts
          </Link>
          <Link href="/search" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Search
          </Link>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Judiciary Preparation
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Legal Drafting
          </a>
          <Link href="/chat" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            AI Assistant
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <button className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            Login
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-border/50 px-8 py-4 space-y-4">
          <Link href="/acts" className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Bare Acts
          </Link>
          <Link href="/search" className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Search
          </Link>
          <a href="#" className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Judiciary Preparation
          </a>
          <a href="#" className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Legal Drafting
          </a>
          <Link href="/chat" className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            AI Assistant
          </Link>
          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
            <button className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Login
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}