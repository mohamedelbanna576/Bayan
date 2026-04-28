"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";

function to12Hour(time24: string): string {
  if (!time24) return "--:--";
  const [timePart] = time24.split(" ");
  const [hourStr, minuteStr] = timePart.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

const locations = [
  { city: "Cairo", country: "Egypt", name: "Cairo" },
  { city: "Makkah", country: "Saudi Arabia", name: "Mecca" },
  { city: "Madinah", country: "Saudi Arabia", name: "Medina" },
  { city: "Istanbul", country: "Turkey", name: "Istanbul" },
  { city: "Dubai", country: "United Arab Emirates", name: "Dubai" },
  { city: "Riyadh", country: "Saudi Arabia", name: "Riyadh" },
  { city: "London", country: "United Kingdom", name: "London" },
  { city: "New York", country: "United States", name: "New York" },
];

const prayerData = [
  { id: "Fajr", name: "Fajr", arabic: "الفجر", color: "text-emerald-500", bg: "bg-[#1A2A3A]", img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop" },
  { id: "Dhuhr", name: "Dhuhr", arabic: "الظهر", color: "text-blue-400", bg: "bg-[#3A5A7A]", img: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=1000&auto=format&fit=crop" },
  { id: "Asr", name: "Asr", arabic: "العصر", color: "text-orange-400", bg: "bg-[#8C6239]", img: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop" },
  { id: "Maghrib", name: "Maghrib", arabic: "المغرب", color: "text-red-400", bg: "bg-[#6A3A3A]", img: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=1000&auto=format&fit=crop" },
  { id: "Isha", name: "Isha", arabic: "العشاء", color: "text-indigo-400", bg: "bg-[#1A1A2A]", img: "https://images.unsplash.com/photo-1519817914152-2a6401de37b4?q=80&w=1000&auto=format&fit=crop" },
];

export default function PrayerTimes() {
  const [selectedLoc, setSelectedLoc] = useState(0);
  const [timings, setTimings] = useState<any>(null);
  const [dateInfo, setDateInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      try {
        const loc = locations[selectedLoc];
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${loc.city}&country=${loc.country}&method=8`);
        const data = await res.json();
        
        if (data.code === 200) {
          setTimings(data.data.timings);
          setDateInfo({
            gregorian: data.data.date.gregorian.date,
            hijri: `${data.data.date.hijri.day}-${data.data.date.hijri.month.number}-${data.data.date.hijri.year}`
          });
        }
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [selectedLoc]);

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />
      
      <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-cairo)] mb-4">أوقات الصلاة</h1>
          <p className="text-white text-lg">Prayer Times</p>
        </div>

        {/* Location Bar */}
        <div className="flat-card p-6 flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-6 sm:gap-12 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-3 shrink-0">
              <Calendar className="w-5 h-5 text-gold-soft" />
              <div>
                <div className="text-white font-bold">{dateInfo ? dateInfo.gregorian : "..."}</div>
                <div className="text-white/50 text-xs">{dateInfo ? dateInfo.hijri : "..."}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <MapPin className="w-5 h-5 text-gold-soft" />
              <div>
                <div className="text-white font-bold">{locations[selectedLoc].city}</div>
                <div className="text-white/50 text-xs">{locations[selectedLoc].country}</div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64">
            <select 
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(Number(e.target.value))}
              className="w-full bg-emerald-forest border border-gold-soft/30 text-white rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-gold-soft"
            >
              {locations.map((loc, index) => (
                <option key={index} value={index}>{loc.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Times Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {prayerData.map((prayer) => (
              <div key={prayer.id} className="flat-card overflow-hidden h-full flex flex-col">
                <div className={`h-24 ${prayer.bg} relative flex items-center justify-center border-b border-white/5`}>
                  <div 
                    className="absolute inset-0 opacity-50 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${prayer.img}')` }}
                  />
                  <Clock className="w-8 h-8 text-white/50 relative z-10" />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-white font-bold text-base mb-1">{prayer.name}</h3>
                  <p className="text-white/80 font-[family-name:var(--font-cairo)] text-lg mb-3">{prayer.arabic}</p>
                  <div className={`text-2xl font-bold ${prayer.color}`}>
                    {timings ? to12Hour(timings[prayer.id]) : "--:--"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 text-white/50 text-sm max-w-lg mx-auto">
          Prayer times are calculated based on your selected location in real-time.
        </div>
      </div>

      <Footer />
    </main>
  );
}
