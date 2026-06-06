// ===================================================
// פרק 01 — F1 עם סנה
// Roy ממלא קובץ זה לכל פרק חדש
// ===================================================

const EPISODE_CONFIG = {

  // --- פרטי הפרק ---
  id: '01-f1-senna',
  title: 'סנה בפנייה',
  subtitle: 'מה קורה כשמכונית מרוץ פונה?',
  color: '#f5a623',        // צבע ראשי של הפרק
  bgColor: '#111111',      // רקע

  // --- סרטון YouTube ---
  video: {
    id: '5H4Ee5jY3YA',     // YouTube ID
    start: 0,
    title: 'סנה בפנייה'
  },

  // --- דמות מלווה ---
  character: {
    name: 'סנה',
    emoji: '🏎️',
    quote: 'אם אתה לא הולך לפרצה שקיימת — אתה כבר לא נהג מרוץ.',
    quoteCredit: 'איירטון סנה, 1990'
  },

  // --- נתוני הסימולטור ---
  simulator: {
    trackName: 'מונזה',
    trackCountry: 'איטליה',
    cornerRadius: 250,      // מטר
    cornerLength: 200,      // מטר

    car1: {
      name: 'F1 של סנה',
      emoji: '🏎️',
      color: '#f5a623',
      defaultSpeed: 290,
      minSpeed: 100,
      maxSpeed: 330
    },

    car2: {
      name: 'מכונית אבא',
      emoji: '🚗',
      color: '#ffffff',
      defaultSpeed: 120,
      minSpeed: 40,
      maxSpeed: 200
    }
  },

  // --- נתוני הנהג ---
  driver: {
    name: 'איירטון סנה',
    country: 'ברזיל',
    language: 'פורטוגזית',
    continent: 'דרום אמריקה',
    championships: 3,
    championshipYears: [1988, 1990, 1991],
    monacoWins: 6
  }

};
