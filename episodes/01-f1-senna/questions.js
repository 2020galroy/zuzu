// ===================================================
// פרק 01 — בנק שאלות מורחב
// 4 רמות גיל | 6 קטגוריות | 15+ שאלות לכל רמה
// בחירה אקראית של 6 שאלות בכניסה
// ===================================================

function buildQuestions(sim) {
  const timeDiff  = sim.mazTime - sim.f1Time;
  const speedDiff = sim.f1Speed - sim.f1Apex;
  const mazMs     = Math.round(sim.mazSpeed / 3.6);
  const f1Ms      = Math.round(sim.f1Speed  / 3.6);
  const time3km   = Math.round(3000 / (sim.mazSpeed / 3.6));
  const rpm       = 250;
  const trackName = sim.trackRadius === 50 ? 'מונאקו' : sim.trackRadius === 150 ? 'Eau Rouge' : 'מונזה';

  // ===================================================
  // 🟢 רמה קלה — גיל 5–7
  // ===================================================
  const easy = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מכונית F1 סיימה את הפנייה ב־${sim.f1Time} שניות. מכונית אבא סיימה ב־${sim.mazTime} שניות. כמה שניות אחרי הגיעה מכונית אבא?`,
      data: `<span class="hi">🏎️ F1: ${sim.f1Time} שניות</span><br><span class="whi">🚗 אבא: ${sim.mazTime} שניות</span>`,
      answers: shuffle([
        { t: `${timeDiff} שניות`, ok: true },
        { t: `${timeDiff + 2} שניות`, ok: false },
        { t: `${timeDiff + 4} שניות`, ok: false },
        { t: `${Math.max(1, timeDiff - 1)} שניות`, ok: false }
      ]),
      ok: `✅ כל הכבוד! ${sim.mazTime} פחות ${sim.f1Time} = ${timeDiff} שניות!`,
      fail: `❌ רמז: ${sim.mazTime} פחות ${sim.f1Time} — כמה נשאר?`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: 'סנה ניצח 6 פעמים במונאקו. כמה ניצחונות עוד חסרים לו ל-10?',
      data: '🇲🇨 ניצחונות מונאקו של סנה: 6',
      answers: shuffle([
        { t: '4', ok: true },
        { t: '3', ok: false },
        { t: '6', ok: false },
        { t: '5', ok: false }
      ]),
      ok: '✅ נכון! 10 פחות 6 = 4. סנה ניצח 6 פעמים במונאקו — שיא בלתי נשבר!',
      fail: '❌ 10 פחות 6 — כמה נשאר?'
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: 'סנה ניצח 3 אליפויות עולם. אם הוא זוכה עוד 2 — כמה יהיו לו?',
      data: '🏆 אליפויות נוכחיות: 3',
      answers: shuffle([
        { t: '5', ok: true },
        { t: '6', ok: false },
        { t: '4', ok: false },
        { t: '7', ok: false }
      ]),
      ok: '✅ נכון! 3 ועוד 2 = 5 אליפויות. מדהים!',
      fail: '❌ 3 ועוד 2 = ?'
    },

    { subject: '🏎️ מרוצי מכוניות', tag: 'tag-racing',
      text: 'כמה גלגלים יש למכונית F1?',
      data: '💡 ספור את הגלגלים בסרטון!',
      answers: shuffle([
        { t: '4', ok: true },
        { t: '6', ok: false },
        { t: '2', ok: false },
        { t: '8', ok: false }
      ]),
      ok: '✅ נכון! 4 גלגלים — כמו מכונית אבא, רק הרבה יותר מהירים! 🏎️',
      fail: '❌ ספור שוב — קדמיים ואחוריים!'
    },

    { subject: '🏎️ מרוצי מכוניות', tag: 'tag-racing',
      text: 'מה הצבע של הדגל שמסמן סיום מירוץ?',
      data: '🏁 הנהג הראשון שרואה אותו — ניצח!',
      answers: shuffle([
        { t: 'שחור-לבן משובץ', ok: true },
        { t: 'אדום', ok: false },
        { t: 'ירוק', ok: false },
        { t: 'צהוב', ok: false }
      ]),
      ok: '✅ נכון! הדגל המשובץ = סיום מירוץ. סנה ראה אותו הרבה פעמים ראשון! 🏆',
      fail: '❌ הדגל המשובץ בשחור-לבן הוא סיום המירוץ!'
    },

    { subject: '🏎️ מרוצי מכוניות', tag: 'tag-racing',
      text: 'איזה דגל אדום אומר ב-F1?',
      data: '🚦 לכל צבע דגל יש משמעות שונה',
      answers: shuffle([
        { t: 'עצור — המירוץ בוטל', ok: true },
        { t: 'צא מהמסלול', ok: false },
        { t: 'האץ — המירוץ התחיל', ok: false },
        { t: 'כנס לפיט', ok: false }
      ]),
      ok: '✅ נכון! דגל אדום = עצור הכל. בדרך כלל בגלל תאונה או גשם חזק.',
      fail: '❌ דגל אדום ב-F1 = עצירה מיידית!'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'למה מכונית המרוץ הצליחה לפנות ומכונית אבא לא?',
      data: `🏎️ F1 — צמיגים מיוחדים<br>🚗 אבא — צמיגים רגילים`,
      answers: shuffle([
        { t: '🔴 הצמיגים של F1 אוחזים חזק יותר', ok: true },
        { t: '🎵 יש לה מוסיקה חזקה יותר', ok: false },
        { t: '🎨 הצבע האדום עוזר לה לפנות', ok: false },
        { t: '💺 הנהג קטן יותר', ok: false }
      ]),
      ok: '✅ נכון! הצמיגים של F1 עשויים מגומי מיוחד שנדבק לאספלט!',
      fail: '❌ חשוב על מה שנוגע בכביש...'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'מה קורה כשגשם יורד על מסלול F1?',
      data: '🌧️ גשם + מהירות גבוהה = ?',
      answers: shuffle([
        { t: 'המסלול חלקלק יותר וקשה לפנות', ok: true },
        { t: 'המכוניות הולכות יותר מהר', ok: false },
        { t: 'הצמיגים מתחממים יותר', ok: false },
        { t: 'לא קורה כלום', ok: false }
      ]),
      ok: '✅ נכון! גשם = מסלול חלקלק. לכן F1 מחליפה לצמיגי גשם מיוחדים!',
      fail: '❌ נסה לרוץ על ריצפה רטובה — מה קורה?'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'סנה נולד בברזיל. באיזה יבשת נמצאת ברזיל?',
      data: '🇧🇷 ברזיל — המדינה הגדולה ביותר ב...?',
      answers: shuffle([
        { t: 'דרום אמריקה', ok: true },
        { t: 'אפריקה', ok: false },
        { t: 'אסיה', ok: false },
        { t: 'אירופה', ok: false }
      ]),
      ok: '✅ נכון! ברזיל נמצאת בדרום אמריקה. סנה גאה! 🇧🇷',
      fail: '❌ ברזיל נמצאת בדרום אמריקה!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'מונאקו היא מדינה קטנה מאוד ליד הים. באיזה ים?',
      data: '🇲🇨 מונאקו — אחת המדינות הקטנות בעולם',
      answers: shuffle([
        { t: 'הים התיכון', ok: true },
        { t: 'האוקיינוס האטלנטי', ok: false },
        { t: 'הים הצפוני', ok: false },
        { t: 'הים הכספי', ok: false }
      ]),
      ok: '✅ נכון! מונאקו על הים התיכון — אותו ים שגם לנו יש! 🌊',
      fail: '❌ מונאקו ליד ים שגם ישראל נוגעת בו!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'מונזה נמצאת באיטליה. מה בירת איטליה?',
      data: '🇮🇹 איטליה — צורתה כמו מגף!',
      answers: shuffle([
        { t: 'רומא', ok: true },
        { t: 'מילאנו', ok: false },
        { t: 'נאפולי', ok: false },
        { t: 'ורונה', ok: false }
      ]),
      ok: '✅ נכון! רומא היא בירת איטליה — עיר בת 2,800 שנה! 🏛️',
      fail: '❌ הבירה של איטליה היא העיר העתיקה רומא!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'כמה כוכבי לכת יש במערכת השמש שלנו?',
      data: '☀️ השמש + כוכבי הלכת = מערכת השמש',
      answers: shuffle([
        { t: '8', ok: true },
        { t: '9', ok: false },
        { t: '6', ok: false },
        { t: '12', ok: false }
      ]),
      ok: '✅ נכון! 8 כוכבי לכת: כוכב חמה, נוגה, כדור הארץ, מאדים, צדק, שבתאי, אורנוס, נפטון!',
      fail: '❌ פעם היו 9 — אבל פלוטו הוצא מהרשימה ב-2006!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'מה הכוכב הכי קרוב לכדור הארץ?',
      data: '☀️ הוא מאיר לנו כל יום...',
      answers: shuffle([
        { t: 'השמש', ok: true },
        { t: 'הירח', ok: false },
        { t: 'כוכב הצפון', ok: false },
        { t: 'מאדים', ok: false }
      ]),
      ok: '✅ נכון! השמש היא כוכב — הכוכב הכי קרוב אלינו! הירח הוא ירח, לא כוכב.',
      fail: '❌ הירח הוא ירח, לא כוכב. הכוכב הכי קרוב הוא...'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'איזה כוכב לכת הכי גדול במערכת השמש?',
      data: '🪐 הוא גדול כל כך שכל שאר הכוכבים נכנסים בתוכו!',
      answers: shuffle([
        { t: 'צדק', ok: true },
        { t: 'שבתאי', ok: false },
        { t: 'נפטון', ok: false },
        { t: 'כדור הארץ', ok: false }
      ]),
      ok: '✅ נכון! צדק (Jupiter) ענק כל כך — יותר מ-1,300 כדורי ארץ נכנסים בתוכו! 🪐',
      fail: '❌ הוא כל כך גדול שאפשר לשים בו 1,300 כדורי ארץ!'
    },

    { subject: '📚 ידע כללי', tag: 'tag-general',
      text: 'סנה בא מברזיל. מה השפה שמדברים בברזיל?',
      data: '🇧🇷 ברזיל — מדינה ייחודית בדרום אמריקה',
      answers: shuffle([
        { t: 'פורטוגזית', ok: true },
        { t: 'ספרדית', ok: false },
        { t: 'אנגלית', ok: false },
        { t: 'ברזילית', ok: false }
      ]),
      ok: '✅ נכון! בברזיל מדברים פורטוגזית — בגלל שפורטוגל גילתה אותה לפני 500 שנה!',
      fail: '❌ שאר דרום אמריקה דוברת ספרדית — אבל ברזיל שונה!'
    }

  ];

  // ===================================================
  // 🟡 רמה בינונית — גיל 8–10
  // ===================================================
  const medium = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מכונית אבא נסעה ב־${sim.mazSpeed} קמ"ש. כמה זמן ייקח לה לנסוע 3 קילומטר?`,
      data: `<span class="whi">🚗 אבא: ${sim.mazSpeed} קמ"ש</span><br>📏 מרחק: 3,000 מטר`,
      answers: shuffle([
        { t: `${time3km} שניות`, ok: true },
        { t: `${time3km + 10} שניות`, ok: false },
        { t: `${Math.max(1, time3km - 8)} שניות`, ok: false },
        { t: `${Math.round(time3km * 1.5)} שניות`, ok: false }
      ]),
      ok: `✅ מדויק! ב־${sim.mazSpeed} קמ"ש, 3 ק"מ לוקחים ${time3km} שניות.`,
      fail: `❌ רמז: ${sim.mazSpeed} קמ"ש = ${mazMs} מ/ש. 3000 ÷ ${mazMs} = ?`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `סנה נכנס לפנייה ב־${sim.f1Speed} קמ"ש והאט ל־${sim.f1Apex} קמ"ש ב-Apex. כמה קמ"ש האט?`,
      data: `<span class="hi">כניסה: ${sim.f1Speed} קמ"ש</span><br><span class="hi">Apex: ${sim.f1Apex} קמ"ש</span>`,
      answers: shuffle([
        { t: `${speedDiff} קמ"ש`, ok: true },
        { t: `${speedDiff + 10} קמ"ש`, ok: false },
        { t: `${Math.max(1, speedDiff - 15)} קמ"ש`, ok: false },
        { t: `${speedDiff + 25} קמ"ש`, ok: false }
      ]),
      ok: `✅ נכון! ${sim.f1Speed} פחות ${sim.f1Apex} = ${speedDiff} קמ"ש.`,
      fail: `❌ ${sim.f1Speed} פחות ${sim.f1Apex} — נסה שוב!`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: 'סנה עקף את המקום השני בפנייה האחרונה. מה המקום שלו עכשיו?',
      data: '🏎️ לפני העקיפה: מקום שני<br>✅ אחרי העקיפה: ?',
      answers: shuffle([
        { t: 'מקום ראשון', ok: true },
        { t: 'מקום שלישי', ok: false },
        { t: 'מקום שני', ok: false },
        { t: 'מקום רביעי', ok: false }
      ]),
      ok: '✅ נכון! עקפת את הראשון — אתה ראשון! 🏆',
      fail: '❌ אם היית שני ועקפת את הראשון — מה אתה עכשיו?'
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `סנה זכה באליפות ב-1988, 1990 ו-1991. כמה שנים עברו מהאליפות הראשונה לאחרונה?`,
      data: `🏆 אליפויות: 1988, 1990, 1991`,
      answers: shuffle([
        { t: '3 שנים', ok: true },
        { t: '5 שנים', ok: false },
        { t: '2 שנים', ok: false },
        { t: '4 שנים', ok: false }
      ]),
      ok: '✅ נכון! 1991 פחות 1988 = 3 שנים — ו-3 אליפויות!',
      fail: '❌ 1991 פחות 1988 = ?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'ל-F1 יש כנפיות שדוחפות אותה למטה. איך זה עוזר לה לפנות?',
      data: `🏎️ ב־${sim.f1Speed} קמ"ש הכנפיות דוחפות בכוח של פי 2 ממשקל הרכב`,
      answers: shuffle([
        { t: 'יותר לחץ על הצמיגים = יותר אחיזה', ok: true },
        { t: 'הכנפיות פועלות כמו מנוע נוסף', ok: false },
        { t: 'הרוח מסובבת את ההגה', ok: false },
        { t: 'זה רק לנראות', ok: false }
      ]),
      ok: `✅ נכון! Downforce = לחץ = אחיזה. ב־${sim.f1Speed} קמ"ש זה קריטי!`,
      fail: '❌ חשוב: הכנפיות דוחפות למטה — מה זה עושה לצמיגים?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: `מה קורה לכוח האחיזה כשעוברים מ${trackName} לפנייה יותר הדוקה?`,
      data: `📐 פנייה הדוקה יותר = רדיוס קטן יותר<br>🧮 כוח = מהירות² ÷ רדיוס`,
      answers: shuffle([
        { t: 'צריך יותר כוח אחיזה לאותה מהירות', ok: true },
        { t: 'צריך פחות כוח אחיזה', ok: false },
        { t: 'אין שינוי', ok: false },
        { t: 'תלוי בצבע הצמיגים', ok: false }
      ]),
      ok: '✅ נכון! פנייה הדוקה = רדיוס קטן = יותר כוח. לכן מונאקו הכי מסוכן!',
      fail: '❌ פנייה הדוקה = רדיוס קטן. אם הרדיוס קטן, הכוח...?'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'מונזה נמצאת באיטליה. באיזה ים שוטפת איטליה?',
      data: '🇮🇹 איטליה — מגף אירופה',
      answers: shuffle([
        { t: 'הים התיכון', ok: true },
        { t: 'האוקיינוס האטלנטי', ok: false },
        { t: 'הים הצפוני', ok: false },
        { t: 'הים השחור', ok: false }
      ]),
      ok: '✅ נכון! איטליה שוטפת בים התיכון — אותו ים שגם לנו יש! 🌊',
      fail: '❌ רמז: אותו ים שיש לישראל!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'סנה נולד בסאו פאולו. כמה אנשים גרים בסאו פאולו?',
      data: '🇧🇷 סאו פאולו — העיר הגדולה ביותר בברזיל',
      answers: shuffle([
        { t: 'כ-22 מיליון', ok: true },
        { t: 'כ-5 מיליון', ok: false },
        { t: 'כ-1 מיליון', ok: false },
        { t: 'כ-50 מיליון', ok: false }
      ]),
      ok: '✅ נכון! סאו פאולו היא העיר הגדולה בחצי הכדור הדרומי — 22 מיליון איש!',
      fail: '❌ סאו פאולו ענקית — יותר ממדינות שלמות!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'מסלול מונאקו עובר דרך עיר. מה שם העיר?',
      data: '🇲🇨 המסלול בנוי ברחובות של העיר עצמה!',
      answers: shuffle([
        { t: 'מונטה קרלו', ok: true },
        { t: 'נייס', ok: false },
        { t: 'קאן', ok: false },
        { t: 'מרסיי', ok: false }
      ]),
      ok: '✅ נכון! גרנד פרי מונאקו עובר ברחובות מונטה קרלו — העיר הכי יקרה בעולם! 💎',
      fail: '❌ המסלול עובר ברחובות העיר מונטה קרלו!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'Eau Rouge נמצאת בבלגיה. מה השפות הרשמיות של בלגיה?',
      data: '🇧🇪 בלגיה — מדינה קטנה עם הרבה שפות',
      answers: shuffle([
        { t: 'צרפתית, הולנדית וגרמנית', ok: true },
        { t: 'צרפתית ואנגלית', ok: false },
        { t: 'גרמנית בלבד', ok: false },
        { t: 'ספרדית וצרפתית', ok: false }
      ]),
      ok: '✅ נכון! 3 שפות רשמיות במדינה קטנה אחת — בלגיה ייחודית! 🇧🇪',
      fail: '❌ בבלגיה מדברים 3 שפות שונות — האזור של Eau Rouge דובר צרפתית!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'ברזיל גובלת במספר מדינות. כמה מדינות גובלות בברזיל?',
      data: '🗺️ ברזיל היא המדינה הרביעית בגודלה בעולם',
      answers: shuffle([
        { t: '10 מדינות', ok: true },
        { t: '5 מדינות', ok: false },
        { t: '3 מדינות', ok: false },
        { t: '15 מדינות', ok: false }
      ]),
      ok: '✅ נכון! ברזיל גובלת ב-10 מדינות — כמעט כל דרום אמריקה! רק צ\'ילה ואקוודור לא גובלות.',
      fail: '❌ ברזיל ענקית כל כך שהיא גובלת בכמעט כל מדינות דרום אמריקה!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'כמה זמן לוקח לאור מהשמש להגיע לכדור הארץ?',
      data: '💡 אור נוסע במהירות של 300,000 ק"מ לשנייה!',
      answers: shuffle([
        { t: 'כ-8 דקות', ok: true },
        { t: 'כ-8 שניות', ok: false },
        { t: 'כ-8 שעות', ok: false },
        { t: 'כ-8 ימים', ok: false }
      ]),
      ok: '✅ נכון! 8 דקות! המרחק לשמש הוא 150 מיליון ק"מ. אפילו אור לוקח 8 דקות! ☀️',
      fail: '❌ המרחק לשמש הוא 150 מיליון ק"מ — גם אור לוקח זמן!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'לאיזה כוכב לכת יש הטבעות המפורסמות ביותר?',
      data: '🪐 לו יש טבעות עשויות קרח וסלעים',
      answers: shuffle([
        { t: 'שבתאי', ok: true },
        { t: 'צדק', ok: false },
        { t: 'אורנוס', ok: false },
        { t: 'נפטון', ok: false }
      ]),
      ok: '✅ נכון! טבעות שבתאי (Saturn) — הכי יפות במערכת השמש! 🪐',
      fail: '❌ הטבעות המפורסמות הן של שבתאי!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: `מכונית F1 נוסעת ב-${sim.f1Speed} קמ"ש. כמה שנים ייקח לה להגיע לשמש (150 מיליון ק"מ)?`,
      data: `🏎️ ${sim.f1Speed} קמ"ש<br>☀️ מרחק לשמש: 150,000,000 ק"מ`,
      answers: shuffle([
        { t: `כ-${Math.round(150000000 / sim.f1Speed / 8760)} שנים`, ok: true },
        { t: '100 שנים', ok: false },
        { t: '10 שנים', ok: false },
        { t: 'שנה אחת', ok: false }
      ]),
      ok: `✅ נכון! ${sim.f1Speed} קמ"ש × 8,760 שעות בשנה = כ-${Math.round(150000000/sim.f1Speed/8760)} שנים לשמש. חלל הוא ענק!`,
      fail: `❌ 150 מיליון ÷ ${sim.f1Speed} ÷ 8,760 שעות בשנה = ?`
    },

    { subject: '📚 ידע כללי', tag: 'tag-general',
      text: 'באיזה ספורט עוד יש פניות מהירות מאוד שמשתמשות בפיזיקה של כוח צנטריפטלי?',
      data: '🔄 כוח צנטריפטלי קיים בהרבה מקומות!',
      answers: shuffle([
        { t: 'אופנועים, אופניים ורכיבה על סוסים', ok: true },
        { t: 'שחייה וצלילה', ok: false },
        { t: 'כדורגל וכדורסל', ok: false },
        { t: 'שחמט ומשחקי לוח', ok: false }
      ]),
      ok: '✅ נכון! כל ספורט עם פניות — אופנועים, אופניים, אפילו סקי! אותה פיזיקה!',
      fail: '❌ חשוב על ספורטים שכוללים פניות מהירות...'
    },

    { subject: '📚 ידע כללי', tag: 'tag-general',
      text: 'כמה ק"מ נוסעת מכונית F1 במרוץ ממוצע?',
      data: '🏁 מרוץ F1 הוא סביב 300 ק"מ',
      answers: shuffle([
        { t: 'כ-300 ק"מ', ok: true },
        { t: 'כ-100 ק"מ', ok: false },
        { t: 'כ-1,000 ק"מ', ok: false },
        { t: 'כ-50 ק"מ', ok: false }
      ]),
      ok: '✅ נכון! כ-300 ק"מ — בין תל אביב לאילת! כל זה תוך פחות משעה וחצי! 🏎️',
      fail: '❌ מרוץ F1 = כ-300 ק"מ. כמו לנסוע מתל אביב לאילת!'
    }

  ];

  // ===================================================
  // 🔴 רמה בינונית-מתקדמת — גיל 11–14
  // ===================================================
  const medhard = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מכונית אבא נסעה ב־${sim.mazSpeed} קמ"ש. כמה מטר לשנייה זה?`,
      data: `<span class="whi">💡 קמ"ש ÷ 3.6 = מ/ש</span>`,
      answers: shuffle([
        { t: `${mazMs} מ/ש`, ok: true },
        { t: `${mazMs + 8} מ/ש`, ok: false },
        { t: `${Math.max(1, mazMs - 5)} מ/ש`, ok: false },
        { t: `${Math.round(mazMs * 1.4)} מ/ש`, ok: false }
      ]),
      ok: `✅ נכון! ${sim.mazSpeed} ÷ 3.6 = ${mazMs} מ/ש.`,
      fail: `❌ רמז: ק"מ = 1000 מ, שעה = 3600 שנ. ${sim.mazSpeed} ÷ 3.6 = ?`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `F1 עושה ${sim.f1Time} שניות בפנייה. מכונית אבא ${sim.mazTime} שניות. כמה אחוז יותר מהיר ה-F1?`,
      data: `<span class="hi">F1: ${sim.f1Time} שנ'</span><br><span class="whi">אבא: ${sim.mazTime} שנ'</span>`,
      answers: shuffle([
        { t: `${Math.round((sim.mazTime - sim.f1Time) / sim.mazTime * 100)}%`, ok: true },
        { t: `${Math.round((sim.mazTime - sim.f1Time) / sim.mazTime * 100) + 10}%`, ok: false },
        { t: `${Math.round((sim.mazTime - sim.f1Time) / sim.f1Time * 100)}%`, ok: false },
        { t: `${Math.round((sim.mazTime - sim.f1Time) / sim.mazTime * 100) - 15}%`, ok: false }
      ]),
      ok: `✅ נכון! (${sim.mazTime}-${sim.f1Time}) ÷ ${sim.mazTime} × 100 = ${Math.round((sim.mazTime - sim.f1Time) / sim.mazTime * 100)}% מהיר יותר!`,
      fail: `❌ הפרש ÷ הגדול × 100`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מסלול ${trackName} הוא ${sim.trackRadius === 50 ? '3.3' : sim.trackRadius === 150 ? '7' : '5.7'} ק"מ. אם מכונית F1 עושה 70 קפות — כמה ק"מ היא עשתה?`,
      data: `📏 אורך מסלול: ${sim.trackRadius === 50 ? '3.3' : sim.trackRadius === 150 ? '7' : '5.7'} ק"מ | קפות: 70`,
      answers: shuffle(() => {
        const len = sim.trackRadius === 50 ? 3.3 : sim.trackRadius === 150 ? 7 : 5.7;
        const total = Math.round(len * 70);
        return [
          { t: `${total} ק"מ`, ok: true },
          { t: `${total + 50} ק"מ`, ok: false },
          { t: `${Math.round(total * 0.7)} ק"מ`, ok: false },
          { t: `${total - 100} ק"מ`, ok: false }
        ];
      })(),
      ok: `✅ נכון! ${sim.trackRadius === 50 ? '3.3' : sim.trackRadius === 150 ? '7' : '5.7'} × 70 = ${Math.round((sim.trackRadius === 50 ? 3.3 : sim.trackRadius === 150 ? 7 : 5.7) * 70)} ק"מ. כמו לנסוע מתל אביב ל...!`,
      fail: `❌ אורך מסלול × מספר קפות = ?`
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: `מהו כוח G שחווה נהג F1 בפנייה ב-${sim.f1Speed} קמ"ש עם רדיוס ${sim.trackRadius} מטר?`,
      data: `<span class="hi">נוסחה: G = v² ÷ (r × 9.81)</span><br>v = ${f1Ms} מ/ש, r = ${sim.trackRadius} מ`,
      answers: shuffle([
        { t: `${(f1Ms*f1Ms/(sim.trackRadius*9.81)).toFixed(1)}G`, ok: true },
        { t: `${((f1Ms*f1Ms/(sim.trackRadius*9.81))+1.5).toFixed(1)}G`, ok: false },
        { t: `${Math.max(0.1,(f1Ms*f1Ms/(sim.trackRadius*9.81)-2)).toFixed(1)}G`, ok: false },
        { t: `${((f1Ms*f1Ms/(sim.trackRadius*9.81))*1.5).toFixed(1)}G`, ok: false }
      ]),
      ok: `✅ נכון! ${f1Ms}² ÷ (${sim.trackRadius} × 9.81) = ${(f1Ms*f1Ms/(sim.trackRadius*9.81)).toFixed(1)}G. טייסי קרב חווים עד 9G — ואז מאבדים הכרה!`,
      fail: `❌ v² ÷ (r × 9.81): ${f1Ms}² = ${f1Ms*f1Ms}. ${f1Ms*f1Ms} ÷ ${sim.trackRadius * 9.81} = ?`
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'Aquaplaning — מה זה, ומתי זה קורה ב-F1?',
      data: '🌧️ מים על מסלול + מהירות גבוהה = ?',
      answers: shuffle([
        { t: 'שכבת מים בין צמיג לאספלט — הצמיג מאבד אחיזה לגמרי', ok: true },
        { t: 'המנוע נחנק ממים', ok: false },
        { t: 'הבלמים מתחממים יותר מהרגיל', ok: false },
        { t: 'הכנפיות מפסיקות לעבוד', ok: false }
      ]),
      ok: '✅ נכון! Aquaplaning = הצמיג "שט" על מים. לכן F1 מחליפה מיד לצמיגי גשם!',
      fail: '❌ "aqua" = מים. מה קורה כשמים נכנסים בין הגומי לכביש?'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'על איזה נהר נמצאת בואנוס איירס, בירת ארגנטינה — יריבתה הגדולה של ברזיל?',
      data: '🇦🇷 ארגנטינה — יריבת ברזיל הגדולה בכדורגל ו-F1',
      answers: shuffle([
        { t: 'ריו דה לה פלטה', ok: true },
        { t: 'האמזונס', ok: false },
        { t: 'הפרנה', ok: false },
        { t: 'הנילוס', ok: false }
      ]),
      ok: '✅ נכון! ריו דה לה פלטה — אחד הנהרות הרחבים בעולם! 🌊',
      fail: '❌ הנהר של בואנוס איירס הוא ריו דה לה פלטה!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'יער הגשם האמזוני נמצא בעיקר בברזיל. כמה אחוז מחמצן העולם הוא מייצר?',
      data: '🌳 האמזון — "ריאות העולם"',
      answers: shuffle([
        { t: 'כ-20%', ok: true },
        { t: 'כ-5%', ok: false },
        { t: 'כ-50%', ok: false },
        { t: 'כ-1%', ok: false }
      ]),
      ok: '✅ נכון! האמזון מייצר כ-20% מחמצן כדור הארץ — לכן הוא קריטי לכולנו!',
      fail: '❌ האמזון נקרא "ריאות העולם" — הוא מייצר כ-20% מהחמצן שלנו!'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'F1 מתמודד ב-20+ מדינות. באיזה יבשת אין מסלול F1?',
      data: '🗺️ F1 מסייר: אירופה, אסיה, אמריקה, אוסטרליה, המזרח התיכון...',
      answers: shuffle([
        { t: 'אנטארקטיקה', ok: true },
        { t: 'אפריקה', ok: false },
        { t: 'דרום אמריקה', ok: false },
        { t: 'אוסטרליה', ok: false }
      ]),
      ok: '✅ נכון! אנטארקטיקה — אין מי שגר שם (רק מדענים) ואין כבישים! ❄️',
      fail: '❌ חשוב: איפה אין אוכלוסייה ואין כבישים?'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'מהירות האור היא 300,000 ק"מ לשנייה. כמה שנים יקח לאור להגיע לכוכב הקרוב ביותר?',
      data: '⭐ Proxima Centauri — הכוכב הקרוב ביותר לשמש (חוץ מהשמש)',
      answers: shuffle([
        { t: 'כ-4.2 שנות אור', ok: true },
        { t: 'כ-100 שנות אור', ok: false },
        { t: 'כ-1 שנה', ok: false },
        { t: 'כ-1,000 שנות אור', ok: false }
      ]),
      ok: '✅ נכון! 4.2 שנות אור = 4.2 שנים בנסיעה במהירות האור. החלל ענק!',
      fail: '❌ Proxima Centauri נמצא 4.2 שנות אור מאיתנו!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'מה הגורם שמחזיק כוכבי לכת במסלולם סביב השמש?',
      data: '☀️ אותו כוח שמורד את התפוח מהעץ...',
      answers: shuffle([
        { t: 'כוח הכבידה של השמש', ok: true },
        { t: 'רוחות חזקות בחלל', ok: false },
        { t: 'מגנטיות', ok: false },
        { t: 'החום של השמש', ok: false }
      ]),
      ok: '✅ נכון! כוח הכבידה — אותו כוח שמשפיע על המסלול של המכוניות בפנייה!',
      fail: '❌ אותו כוח שמורד תפוחים מעצים — ניוטון גילה אותו!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: `F1 נוסעת ב-${sim.f1Speed} קמ"ש. מהירות האור היא 1,080,000,000 קמ"ש. כמה פעמים מהיר יותר האור?`,
      data: `🏎️ F1: ${sim.f1Speed} קמ"ש<br>💡 אור: 1,080,000,000 קמ"ש`,
      answers: shuffle([
        { t: `כ-${Math.round(1080000000/sim.f1Speed/100000)*100000 > 1000000 ? (Math.round(1080000000/sim.f1Speed/100000)).toLocaleString() : Math.round(1080000000/sim.f1Speed/1000)*1000} פעמים`, ok: true },
        { t: '1,000 פעמים', ok: false },
        { t: '10,000 פעמים', ok: false },
        { t: '100,000 פעמים', ok: false }
      ]),
      ok: `✅ נכון! 1,080,000,000 ÷ ${sim.f1Speed} ≈ ${Math.round(1080000000/sim.f1Speed).toLocaleString()} פעמים. האור מנצח כל F1! 😄`,
      fail: `❌ 1,080,000,000 ÷ ${sim.f1Speed} = ?`
    },

    { subject: '📚 ידע כללי', tag: 'tag-general',
      text: 'כמה קבוצות (צוותים) משתתפות בעונת F1 2024?',
      data: '🏎️ כל קבוצה מפעילה 2 מכוניות',
      answers: shuffle([
        { t: '10 קבוצות, 20 מכוניות', ok: true },
        { t: '8 קבוצות, 16 מכוניות', ok: false },
        { t: '12 קבוצות, 24 מכוניות', ok: false },
        { t: '6 קבוצות, 12 מכוניות', ok: false }
      ]),
      ok: '✅ נכון! 10 קבוצות × 2 נהגים = 20 מכוניות על המסלול. כולם מתחרים בו-זמנית!',
      fail: '❌ F1 2024: 10 קבוצות, 2 נהגים לכל אחת = 20 מכוניות!'
    }

  ];

  // ===================================================
  // 🔥 רמה מתקדמת — גיל 14+
  // ===================================================
  const hard = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `F1 נוסעת ב-${sim.f1Speed} קמ"ש. כמה מטר לשנייה?`,
      data: `<span class="hi">💡 קמ"ש ÷ 3.6 = מ/ש</span>`,
      answers: shuffle([
        { t: `${f1Ms} מ/ש`, ok: true },
        { t: `${f1Ms + 12} מ/ש`, ok: false },
        { t: `${Math.max(1, f1Ms - 8)} מ/ש`, ok: false },
        { t: `${Math.round(f1Ms * 1.5)} מ/ש`, ok: false }
      ]),
      ok: `✅ נכון! ${sim.f1Speed} ÷ 3.6 = ${f1Ms} מ/ש. ב-F1 מודדים הכל במ/ש!`,
      fail: `❌ קילומטר = 1000 מ, שעה = 3600 שנ. ${sim.f1Speed} ÷ 3.6 = ?`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מנוע F1 מסתובב ב-15,000 סיבובים לדקה. כמה סיבובים בשנייה?`,
      data: '⚙️ 15,000 RPM = ? סיבובים לשנייה',
      answers: shuffle([
        { t: `${rpm}`, ok: true },
        { t: '150', ok: false },
        { t: '500', ok: false },
        { t: '1,000', ok: false }
      ]),
      ok: `✅ נכון! 15,000 ÷ 60 = ${rpm} סיבובים/שנייה. סנה שמע הבדל בין 14,800 ל-15,000 RPM!`,
      fail: '❌ דקה = 60 שניות. 15,000 ÷ 60 = ?'
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `כוח צנטריפטלי: F = mv²/r. אם סנה מכפיל את מהירותו — הכוח יגדל פי כמה?`,
      data: `<span class="hi">נוסחה: F = mv²/r</span><br>v מוכפל ב-2 — מה קורה ל-v²?`,
      answers: shuffle([
        { t: 'פי 4', ok: true },
        { t: 'פי 2', ok: false },
        { t: 'פי 8', ok: false },
        { t: 'נשאר אותו דבר', ok: false }
      ]),
      ok: '✅ נכון! v² — מהירות בריבוע. ×2 מהירות = ×4 כוח. לכן מהירות כפולה = סכנה פי ארבע!',
      fail: '❌ v² — אם v=2 אז 2²=4. אם v=4 אז 4²=16. פי 4!'
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `חישוב כוח G: v²/(r×9.81). F1 ב-${sim.f1Speed} קמ"ש, רדיוס ${sim.trackRadius}m. כמה G?`,
      data: `<span class="hi">v = ${f1Ms} מ/ש | r = ${sim.trackRadius} מ</span><br>G = ${f1Ms}² ÷ (${sim.trackRadius} × 9.81)`,
      answers: shuffle([
        { t: `${(f1Ms*f1Ms/(sim.trackRadius*9.81)).toFixed(2)}G`, ok: true },
        { t: `${((f1Ms*f1Ms/(sim.trackRadius*9.81))+2).toFixed(2)}G`, ok: false },
        { t: `${Math.max(0.01,(f1Ms*f1Ms/(sim.trackRadius*9.81)-1.5)).toFixed(2)}G`, ok: false },
        { t: `${((f1Ms*f1Ms/(sim.trackRadius*9.81))*2).toFixed(2)}G`, ok: false }
      ]),
      ok: `✅ ${f1Ms}²=${f1Ms*f1Ms} ÷ (${sim.trackRadius}×9.81=${(sim.trackRadius*9.81).toFixed(0)}) = ${(f1Ms*f1Ms/(sim.trackRadius*9.81)).toFixed(2)}G. מעל 5G נהגים מאבדים ראייה!`,
      fail: `❌ ${f1Ms}² = ${f1Ms*f1Ms}. ${f1Ms*f1Ms} ÷ ${(sim.trackRadius*9.81).toFixed(0)} = ?`
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'מהו Downforce ואיך הוא משפיע על מהירות הפנייה?',
      data: `🏎️ ב-${sim.f1Speed} קמ"ש הכנפיות מייצרות כוח של פי 2-3 ממשקל הרכב`,
      answers: shuffle([
        { t: 'כוח לחיצה למטה — מגדיל אחיזה — מאפשר פנייה מהירה יותר', ok: true },
        { t: 'מאיץ את המכונית קדימה', ok: false },
        { t: 'מוריד עמידות אוויר', ok: false },
        { t: 'מקרר את המנוע', ok: false }
      ]),
      ok: `✅ נכון! Downforce = לחיצה למטה = יותר אחיזה. ב-${sim.f1Speed} קמ"ש F1 "שוקלת" פי 3 ממשקלה!`,
      fail: '❌ Downforce = "כוח למטה". אם דוחפים את הצמיגים חזק יותר לאספלט — מה קורה לאחיזה?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: `ב-${sim.tireType === 'slicks' ? 'Slicks' : sim.tireType === 'rain' ? 'צמיגי גשם' : 'צמיגי כביש'} — מה קורה לאחיזה כשיורד גשם?`,
      data: `<span class="hi">Slicks:</span> גומי חלק — מקסימום אחיזה ביבש<br><span class="whi">גשם:</span> מים = שכבת הפרדה`,
      answers: shuffle([
        { t: 'יורדת דרמטית — מים שוברים את הקשר גומי-אספלט (Aquaplaning)', ok: true },
        { t: 'עולה — המים מקררים ומשפרים', ok: false },
        { t: 'לא משתנה — הגומי חזק', ok: false },
        { t: 'עולה מעט', ok: false }
      ]),
      ok: '✅ נכון! Aquaplaning — שכבת מים מנתקת את הצמיג. F1 מחליפה לצמיגי Wet מיד!',
      fail: '❌ מים בין גומי לאספלט = Aquaplaning. מה זה עושה לחיכוך?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'מדוע נהג F1 לובש בגד מיוחד (Nomex) שיכול לעמוד בחום של 800 מעלות?',
      data: '🔥 מנוע F1 + גחון = חום קיצוני',
      answers: shuffle([
        { t: 'בגלל סכנת שריפה מדלק בתאונה — הנהג חייב הגנה לכמה שניות קריטיות', ok: true },
        { t: 'כדי להיראות מגניב', ok: false },
        { t: 'בגלל הקור בגובה גבוה', ok: false },
        { t: 'בגלל חום השמש על המסלול', ok: false }
      ]),
      ok: '✅ נכון! Nomex יכול לעמוד 12 שניות ב-800°C — מספיק לצאת מהמכונית בשריפה!',
      fail: '❌ F1 יש בה 100+ ליטר דלק. תאונה + ניצוץ = ? ולכן הנהג צריך...'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'ברזיל היא המדינה הגדולה בדרום אמריקה. מה השפה הרשמית שלה ולמה לא ספרדית?',
      data: '🇧🇷 ברזיל קיבלה עצמאות ב-1822 מ... ?',
      answers: shuffle([
        { t: 'פורטוגזית — בגלל הקולוניזציה הפורטוגלית מ-1500', ok: true },
        { t: 'ספרדית — כמו שאר דרום אמריקה', ok: false },
        { t: 'אנגלית — שפת הספורט', ok: false },
        { t: 'ברזילית — שפה עצמאית', ok: false }
      ]),
      ok: '✅ נכון! ב-1500 פורטוגל הגיעה ראשונה. שאר דרום אמריקה — ספרדית!',
      fail: '❌ כל דרום אמריקה ספרדית — למה ברזיל שונה? מי הגיע לשם ראשון?'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'F1 מתחרה ב-Interlagos, סאו פאולו. באיזה קו רוחב (latitude) נמצאת סאו פאולו?',
      data: '🌐 קו רוחב 0° = קו המשווה<br>+° = צפון, -° = דרום',
      answers: shuffle([
        { t: 'כ-23° דרום — מתחת לקו המשווה', ok: true },
        { t: 'כ-23° צפון — מעל לקו המשווה', ok: false },
        { t: 'קו המשווה — 0°', ok: false },
        { t: 'כ-45° דרום', ok: false }
      ]),
      ok: '✅ נכון! סאו פאולו ב-23°S — מתחת לקו המשווה. לכן עונות הפוכות מאירופה!',
      fail: '❌ ברזיל בחצי הכדור הדרומי — איזה סימן?'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'מה הכוח שגורם לכוכבי לכת לנוע במסלול אליפטי ולא בקו ישר?',
      data: '🔄 ניוטון הבין את זה מתפוח שנפל...',
      answers: shuffle([
        { t: 'כוח הכבידה של השמש — אותו כוח שמחזיק אתכם על הכיסא', ok: true },
        { t: 'לחץ רוח השמש (Solar Wind)', ok: false },
        { t: 'כוח מגנטי', ok: false },
        { t: 'חיכוך עם חלקיקים בחלל', ok: false }
      ]),
      ok: '✅ נכון! כבידה = המסלול האליפטי. אותה פיזיקה שמחזיקה F1 בכביש — רק בגדול!',
      fail: '❌ ניוטון הבין שהכוח שמורד תפוחים = הכוח שמחזיק את הירח!'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: 'מהי "שנת אור" ומה המרחק שהיא מייצגת בקילומטרים?',
      data: '💡 אור נוסע 300,000 ק"מ לשנייה × 31,536,000 שניות בשנה',
      answers: shuffle([
        { t: 'כ-9.46 טריליון ק"מ (9,460,000,000,000)', ok: true },
        { t: 'כ-1 מיליון ק"מ', ok: false },
        { t: 'כ-1 מיליארד ק"מ', ok: false },
        { t: 'כ-100 מיליארד ק"מ', ok: false }
      ]),
      ok: '✅ נכון! 300,000 × 31,536,000 ≈ 9.46 × 10¹² ק"מ. מספר שקשה לדמיין! 🌌',
      fail: '❌ 300,000 ק"מ/שנ × 86,400 שנ/יום × 365 ימים = ?'
    },

    { subject: '🔭 אסטרונומיה', tag: 'tag-astro',
      text: `F1 נוסעת ב-${sim.f1Speed} קמ"ש. מהירות בריחה מכדור הארץ היא 40,320 קמ"ש. כמה פעמים מהירה יותר?`,
      data: `🚀 מהירות בריחה = 40,320 קמ"ש<br>🏎️ F1 = ${sim.f1Speed} קמ"ש`,
      answers: shuffle([
        { t: `כ-${Math.round(40320/sim.f1Speed * 10)/10} פעמים`, ok: true },
        { t: `כ-${Math.round(40320/sim.f1Speed * 10)/10 + 20} פעמים`, ok: false },
        { t: `כ-10 פעמים`, ok: false },
        { t: `כ-${Math.round(40320/sim.f1Speed * 10)/10 - 30} פעמים`, ok: false }
      ]),
      ok: `✅ נכון! 40,320 ÷ ${sim.f1Speed} ≈ ${Math.round(40320/sim.f1Speed * 10)/10}x. F1 צריכה לרוץ פי ${Math.round(40320/sim.f1Speed * 10)/10} יותר מהר כדי לצאת מכדור הארץ!`,
      fail: `❌ 40,320 ÷ ${sim.f1Speed} = ?`
    },

    { subject: '🎯 אסטרטגיה', tag: 'tag-strategy',
      text: `סנה נכנס לפנייה ב-${sim.f1Speed} קמ"ש. יש מתחרה בצידו הפנימי. מה ההחלטה הנכונה?`,
      data: `<span class="hi">מהיר מדי:</span> יוצא מהמסלול<br><span class="whi">איטי מדי:</span> מתחרה עובר<br><span style="color:#2ecc71">מדויק:</span> שומר עמדה`,
      answers: shuffle([
        { t: 'להאט מעט ולשמור על הקו — לא להסתכן', ok: true },
        { t: 'להאיץ ולנסות לחסום', ok: false },
        { t: 'לעצור לגמרי', ok: false },
        { t: 'לצאת מהמסלול', ok: false }
      ]),
      ok: '✅ בדיוק כמו סנה! "פנייה מושלמת שווה יותר מעקיפה מסוכנת."',
      fail: '❌ מהירות פחות שליטה בפנייה = תאונה. מה עדיף?'
    },

    { subject: '📚 ידע כללי', tag: 'tag-general',
      text: 'מה ה-DRS ב-F1 המודרני וכיצד הוא עוזר לעקיפה?',
      data: '🔧 DRS = Drag Reduction System',
      answers: shuffle([
        { t: 'פותח את הכנף האחורית — מפחית עמידות אוויר — מגביר מהירות ישרה', ok: true },
        { t: 'מגביר את כוח הבלמים', ok: false },
        { t: 'מוסיף הספק למנוע', ok: false },
        { t: 'משנה את זווית הגה', ok: false }
      ]),
      ok: '✅ נכון! DRS פותח את הכנף = פחות Downforce = פחות גרר = יותר מהירות. עד 25 קמ"ש יותר!',
      fail: '❌ Drag = עמידות אוויר. Reduction = הפחתה. מה קורה כשמפחיתים עמידות אוויר?'
    }

  ];

  return { easy, medium, medhard, hard };
}

// ===================================================
// בחירת 6 שאלות אקראיות לפי גיל
// ===================================================
function selectQuestions(age, sim) {
  const all = buildQuestions(sim);
  let pool;

  if      (age <= 7)  pool = all.easy;
  else if (age <= 10) pool = all.medium;
  else if (age <= 14) pool = all.medhard;
  else                pool = all.hard;

  return shuffle([...pool]).slice(0, 6);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
