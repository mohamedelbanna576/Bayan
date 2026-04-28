import Link from "next/link";
import { BookOpen, Radio, Bookmark, Clock, Hash, Heart } from "lucide-react";

const features = [
  {
    id: "quran",
    title: "Quran Recitations",
    arabic: "القرآن الكريم",
    icon: BookOpen,
    description: "Read and listen to the complete Quran with 30+ reciters",
    href: "/quran",
  },
  {
    id: "radio",
    title: "Islamic Radio",
    arabic: "إذاعة القرآن الكريم",
    icon: Radio,
    description: "Stream live Islamic radio stations from around the world",
    href: "/radio",
  },
  {
    id: "tafsir",
    title: "Quran Tafsir",
    arabic: "تفسير القرآن",
    icon: Bookmark,
    description: "9 tafsir sources including Ibn Katheer, Al-Tabari & Al-Qurtubi",
    href: "/tafsir",
  },
  {
    id: "prayer",
    title: "Prayer Times",
    arabic: "أوقات الصلاة",
    icon: Clock,
    description: "Accurate prayer times for your city with Hijri date",
    href: "/prayer-times",
  },
  {
    id: "tasbeeh",
    title: "Tasbeeh Counter",
    arabic: "التسبيح",
    icon: Hash,
    description: "Digital dhikr counter with presets and daily tracking",
    href: "/tasbeeh",
  },
  {
    id: "azkar",
    title: "Azkar",
    arabic: "الأذكار",
    icon: Heart,
    description: "Morning and evening remembrances with completion tracking",
    href: "/azkar",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-emerald-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} id={feature.id}>
              <Link href={feature.href} className="block group flat-card p-6 card-hover h-full">
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-6 h-6 text-gold-soft" />
                  <span className="text-lg text-gold-soft/80 font-[family-name:var(--font-cairo)] font-bold">
                    {feature.arabic}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-soft transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}