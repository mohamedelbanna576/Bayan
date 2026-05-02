import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ed-beige flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm text-ed-gold font-semibold tracking-[0.25em] uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-5xl text-ed-green mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Page Not Found
        </h1>
        <p className="text-ed-text-secondary leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-ed-green px-6 py-3 text-sm font-semibold text-ed-beige hover:bg-ed-green-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ed-gold"
        >
          <Home className="w-4 h-4" />
          Back Home
        </Link>
      </div>
    </main>
  );
}
