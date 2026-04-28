"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the Dhikr Platform?",
    answer: "Dhikr (ذِكْر) is a modern Islamic digital companion that brings together essential spiritual tools in one place — Quran reading with audio from 30+ reciters, 9 tafsir sources, live Islamic radio, accurate prayer times, a digital tasbeeh counter, and daily azkar (morning & evening remembrances)."
  },
  {
    question: "How many reciters are available?",
    answer: "We offer all reciters available through the AlQuran Cloud API, including both Murattal and Mujawwad styles. This includes famous sheikhs like Mishary Al-Afasy, Abdul Basit, Al-Husary, As-Sudais, Al-Minshawi, Maher Al-Muaiqly, and many more. Each reciter's name is displayed in both Arabic and English."
  },
  {
    question: "What tafsir sources are available?",
    answer: "We provide 9 authenticated tafsir sources, all fetched from the AlQuran Cloud API: Tafsir Al-Muyassar, Tafsir Al-Jalalayn, Tafsir Al-Qurtubi, Tafsir Ibn Katheer, Tafsir Al-Tabari, Tafsir As-Sa'di, Tafsir Al-Baghawi, Tafsir Al-Waseet, and At-Tahrir wa At-Tanwir. You can switch between them on any surah."
  },
  {
    question: "How are prayer times calculated?",
    answer: "Prayer times are fetched from the Aladhan API, which uses high-precision astronomical algorithms. You can select from 8 major cities worldwide. Times are displayed in 12-hour format (AM/PM) and include all 5 daily prayers along with both Hijri and Gregorian dates."
  },
  {
    question: "What is the Tasbeeh Counter?",
    answer: "The Tasbeeh Counter is a digital dhikr tool with 9 preset adhkar (SubhanAllah, Alhamdulillah, Allahu Akbar, etc.). It features a circular progress ring, customizable count targets (33, 100, 500, 1000), round tracking, daily total that persists across sessions, and keyboard support (Space/Enter)."
  },
  {
    question: "Where do the Azkar come from?",
    answer: "Morning and evening azkar are sourced from an authenticated hadith-based API. Each zikr includes the original Arabic text, its reference, and the recommended number of repetitions. You can tap to track your progress through each zikr."
  },
  {
    question: "Is the radio broadcast live?",
    answer: "Yes, we provide 24/7 live streaming of Quran recitations through verified radio stations sourced from mp3quran.net. You can search stations by name and switch between them freely."
  },
  {
    question: "Does the platform work on mobile?",
    answer: "Yes! The entire platform is fully responsive and works on mobile phones, tablets, and desktop browsers. The interface adapts to your screen size for the best reading and listening experience."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-emerald-deep border-t border-emerald-forest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Questions & Answers
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Find answers to commonly asked questions about the Dhikr platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="flat-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-emerald-mid transition-colors"
              >
                <span className={`text-base font-semibold transition-colors ${openIndex === index ? 'text-gold-soft' : 'text-white/90 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-gold-soft' : 'text-white/50 group-hover:text-gold-soft'}`} />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out origin-top ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-white/70 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
