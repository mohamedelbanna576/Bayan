"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Loader2, Calendar, Navigation } from "lucide-react";

interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const commonLocations = [
  { country: "Egypt", city: "Cairo", label: "Cairo, Egypt - القاهرة، مصر" },
  { country: "Egypt", city: "Alexandria", label: "Alexandria, Egypt - الإسكندرية، مصر" },
  { country: "Saudi Arabia", city: "Makkah", label: "Makkah, Saudi Arabia - مكة المكرمة، السعودية" },
  { country: "Saudi Arabia", city: "Madinah", label: "Madinah, Saudi Arabia - المدينة المنورة، السعودية" },
  { country: "Saudi Arabia", city: "Riyadh", label: "Riyadh, Saudi Arabia - الرياض، السعودية" },
  { country: "United Arab Emirates", city: "Dubai", label: "Dubai, UAE - دبي، الإمارات" },
  { country: "Palestine", city: "Jerusalem", label: "Jerusalem, Palestine - القدس، فلسطين" },
  { country: "Jordan", city: "Amman", label: "Amman, Jordan - عمّان، الأردن" },
  { country: "Morocco", city: "Casablanca", label: "Casablanca, Morocco - الدار البيضاء، المغرب" },
  { country: "Algeria", city: "Algiers", label: "Algiers, Algeria - الجزائر، الجزائر" },
  { country: "Turkey", city: "Istanbul", label: "Istanbul, Turkey - إسطنبول، تركيا" },
  { country: "United Kingdom", city: "London", label: "London, UK - لندن، بريطانيا" },
  { country: "United States", city: "New York", label: "New York, USA - نيويورك، أمريكا" }
];

export default function PrayerTimes() {
  const [times, setTimes] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>("Detecting location...");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    // Format current date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDateStr(now.toLocaleDateString('en-US', options));

    // Try geolocation first, if denied, fallback to Cairo
    handleDetectLocation(true);
  }, []);

  const handleDetectLocation = (isInitial = false) => {
    setLoading(true);
    setError(null);
    setLocationName("Detecting GPS location...");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimesByCoords(latitude, longitude);
          
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await res.json();
            setLocationName(`${data.city || data.locality || 'Unknown City'}, ${data.countryName || ''}`);
          } catch {
            setLocationName("Your GPS Location");
          }
        },
        (err) => {
          console.error(err);
          if (isInitial) {
            // Fallback to default if denied on first load
            fetchPrayerTimesByCity("Cairo", "Egypt");
            setError("Location access denied. Displaying default location (Cairo).");
          } else {
            setError("Location access denied. Please enable location services in your browser.");
            setLoading(false);
          }
        }
      );
    } else {
      if (isInitial) {
        fetchPrayerTimesByCity("Cairo", "Egypt");
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
      }
    }
  };

  const fetchPrayerTimesByCoords = async (lat: number, lng: number) => {
    try {
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);
      const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();
      
      if (data.code === 200) {
        setPrayerData(data.data.timings);
      } else {
        setError("Could not fetch prayer times.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to prayer times service.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrayerTimesByCity = async (city: string, country: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`);
      const data = await res.json();
      
      if (data.code === 200) {
        setPrayerData(data.data.timings);
        setLocationName(`${city}, ${country}`);
      } else {
        setError("Could not fetch prayer times for this location.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to prayer times service.");
    } finally {
      setLoading(false);
    }
  };

  const setPrayerData = (pt: any) => {
    setTimes({
      Fajr: pt.Fajr,
      Sunrise: pt.Sunrise,
      Dhuhr: pt.Dhuhr,
      Asr: pt.Asr,
      Maghrib: pt.Maghrib,
      Isha: pt.Isha
    });
  };

  const convertTo12Hour = (time24: string) => {
    // Aladhan API returns times like "05:12 (EET)", so strip everything after the space
    const cleanTime = time24.split(" ")[0];
    const [hours, minutes] = cleanTime.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; 
    return `${h}:${minutes} ${ampm}`;
  };

  const prayersList = times ? [
    { name: "Fajr", arabic: "الفَجْر", time: times.Fajr },
    { name: "Sunrise", arabic: "الشروق", time: times.Sunrise },
    { name: "Dhuhr", arabic: "الظُّهْر", time: times.Dhuhr },
    { name: "Asr", arabic: "العَصْر", time: times.Asr },
    { name: "Maghrib", arabic: "المَغْرِب", time: times.Maghrib },
    { name: "Isha", arabic: "العِشَاء", time: times.Isha }
  ] : [];

  return (
    <main className="min-h-screen bg-emerald-forest pt-24">
      <Navbar />

      <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-in slide-in-from-bottom-5 duration-500">
          <h1 className="text-5xl font-bold text-gold-soft font-[family-name:var(--font-tajawal)] mb-4">مَوَاقِيتُ الصَّلَاة</h1>
          <p className="text-white text-lg">Prayer Times</p>
        </div>

        {/* Location Selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-in fade-in duration-700 delay-100">
          <select 
            className="glass-card bg-emerald-deep/80 text-white px-4 py-3 rounded-xl border border-gold-soft/30 focus:outline-none focus:border-gold-soft cursor-pointer w-full sm:w-auto"
            onChange={(e) => {
              if (e.target.value === "gps") {
                handleDetectLocation(false);
              } else {
                const loc = commonLocations[parseInt(e.target.value)];
                fetchPrayerTimesByCity(loc.city, loc.country);
              }
            }}
            defaultValue="default"
          >
            <option value="default" disabled>Select a City / اختر مدينة</option>
            {commonLocations.map((loc, idx) => (
              <option key={idx} value={idx}>{loc.label}</option>
            ))}
          </select>
          
          <button 
            onClick={() => handleDetectLocation(false)}
            className="glass-card px-6 py-3 rounded-xl border border-gold-soft/30 hover:bg-gold-soft/10 text-white flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <Navigation className="w-4 h-4 text-gold-soft" />
            <span>Use My Location</span>
          </button>
        </div>

        {error && !times && (
           <div className="glass-card p-6 mb-8 rounded-2xl text-center text-red-400 max-w-md mx-auto">
             {error}
           </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-24 glass-card rounded-2xl">
            <Loader2 className="w-12 h-12 text-gold-soft animate-spin" />
            <span className="ml-4 text-white/60">{locationName.includes("GPS") ? "Getting GPS signal..." : "Loading times..."}</span>
          </div>
        ) : times ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center text-sm">
                {error}
              </div>
            )}
            
            {/* Header Card */}
            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-soft/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 text-white z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-mid flex items-center justify-center border border-white/10">
                  <MapPin className="w-6 h-6 text-gold-soft" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">{locationName}</h2>
                  <p className="text-white/60 text-sm flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" /> {dateStr}
                  </p>
                </div>
              </div>
            </div>

            {/* Times Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {prayersList.map((prayer, index) => (
                <div 
                  key={prayer.name} 
                  className="glass-card p-6 text-center card-hover relative overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-mid/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <Clock className="w-8 h-8 text-gold-soft/50 mx-auto mb-4 group-hover:text-gold-soft transition-colors" />
                  
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-amiri)] text-white mb-1">
                    {prayer.arabic}
                  </h3>
                  <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
                    {prayer.name}
                  </p>
                  <div className="inline-block bg-emerald-deep px-4 py-2 rounded-lg border border-gold-soft/20 text-gold-light font-bold font-mono text-lg">
                    {convertTo12Hour(prayer.time)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </main>
  );
}
