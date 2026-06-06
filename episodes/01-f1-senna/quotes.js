// ===================================================
// מאגר ציטוטים — זוזו
//
// verified: true  → מקור ידוע ומתועד
// verified: false → "פתגם סיני עתיק 😉"
//
// tags: אילו מצבים מתאימים לציטוט
//   'correct'  — תשובה נכונה
//   'fail'     — תשובה שגויה
//   'lab'      — שלב המעבדה
//   'score'    — מסך ציון
//   'filter'   — בחירת פילטר (מסלול/צמיג/מזג אוויר)
//   'math' / 'physics' / 'geo' / 'racing' / 'astro' / 'strategy'
// ===================================================

const QUOTES = [

  // ── מאומתים ──────────────────────────────────────

  {
    text: 'אם אתה לא הולך לפרצה שקיימת — אתה כבר לא נהג מרוץ.',
    author: 'איירטון סנה, 1990',
    verified: true,
    tags: ['correct', 'racing', 'strategy', 'lab', 'filter']
  },
  {
    text: 'הדמיון חשוב יותר מהידע.',
    author: 'אלברט איינשטיין, Saturday Evening Post, 1929',
    verified: true,
    tags: ['correct', 'math', 'physics', 'astro']
  },
  {
    text: 'הדבר החשוב הוא לא להפסיק לשאול שאלות.',
    author: 'אלברט איינשטיין, LIFE Magazine, 1955',
    verified: true,
    tags: ['correct', 'fail', 'lab', 'all']
  },
  {
    text: 'אם ראיתי רחוק יותר — זה רק בגלל שעמדתי על כתפי ענקים.',
    author: 'אייזק ניוטון, מכתב לרוברט הוק, 1675',
    verified: true,
    tags: ['correct', 'physics', 'astro', 'score']
  },
  {
    text: 'אנחנו בוחרים לטוס לירח — לא כי זה קל, אלא כי זה קשה.',
    author: "ג'ון קנדי, נאום אוניברסיטת רייס, 1962",
    verified: true,
    tags: ['correct', 'astro', 'lab', 'score']
  },
  {
    text: 'אל תשאל מה המדינה יכולה לעשות בשבילך — שאל מה אתה יכול לעשות בשביל המדינה.',
    author: "ג'ון קנדי, נאום ההשבעה, 1961",
    verified: true,
    tags: ['correct', 'geo', 'score']
  },

  // ── לא מאומתים → "פתגם סיני עתיק 😉" ────────────

  {
    text: 'להיות שני זה להיות הראשון מבין המפסידים.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'racing', 'score', 'strategy']
  },
  {
    text: 'תמיד נראה בלתי אפשרי — עד שעושים את זה.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['fail', 'lab', 'score']
  },
  {
    text: 'אני לא מהמר — אבל אם יש דבר אחד שאני מוכן להמר עליו, זה על עצמי.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'strategy', 'score']
  },
  {
    text: 'הגבול קיים רק בראש.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'fail', 'lab', 'filter', 'all']
  },
  {
    text: 'כל ניסיון שנכשל הוא שיעור שצלח.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['fail', 'lab']
  },
  {
    text: 'המהירות לא רק בגוף — היא קודם כל בראש.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'racing', 'physics', 'filter']
  },
  {
    text: 'מי שלא מסתכן — לא מגיע לפודיום.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'racing', 'strategy', 'lab']
  },
  {
    text: 'הכוכבים לא זזים — אתה זה שצריך לנוע לקראתם.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'astro', 'score']
  },
  {
    text: 'שאלה טובה שווה יותר מתשובה בינונית.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['fail', 'lab', 'all']
  },
  {
    text: 'הפנייה הכי קשה היא זו שאתה לא מוכן לה.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['filter', 'lab', 'racing']
  },
  {
    text: 'מי שמפחד לטעות — לא ילמד דבר.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['fail', 'lab']
  },
  {
    text: 'המוח הוא השריר הכי חשוב בגוף.',
    author: 'פתגם סיני עתיק 😉',
    verified: false,
    tags: ['correct', 'math', 'score']
  },

];

// ===================================================
// פונקציות עזר
// ===================================================

function getQuote(tags = ['all']) {
  const pool = QUOTES.filter(q =>
    tags.some(t => q.tags.includes(t) || q.tags.includes('all'))
  );
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function renderQuote(q) {
  if (!q) return '';
  return `<div class="zuzu-quote">
    <span class="zuzu-quote-text">"${q.text}"</span>
    <span class="zuzu-quote-author">— ${q.author}</span>
  </div>`;
}
