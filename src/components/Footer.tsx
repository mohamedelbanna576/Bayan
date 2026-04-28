import Link from "next/link";

const footerLinks = [
  { name: "About", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-gold-soft font-[family-name:var(--font-cairo)]">
              ذِكْر
            </span>
            <span className="text-sm font-medium text-white/60">Dhikr</span>
          </Link>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/60 hover:text-gold-soft transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/30">
          © 2026 Dhikr Platform. Made by Mohamed El Banna.
        </div>
      </div>
    </footer>
  );
}