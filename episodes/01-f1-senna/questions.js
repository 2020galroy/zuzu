// ===================================================
// פרק 01 — בנק שאלות
// כל השאלות דינמיות — מקבלות את ערכי הסימולציה
// ===================================================

function buildQuestions(sim) {
  // sim = { f1Speed, mazSpeed, f1Apex, mazApex, f1Time, mazTime, f1Ms, mazMs, tireType, weather }

  const timeDiff   = sim.mazTime - sim.f1Time;
  const speedDiff  = sim.f1Speed - sim.f1Apex;
  const mazMs      = Math.round(sim.mazSpeed / 3.6);
  const f1Ms       = Math.round(sim.f1Speed / 3.6);
  const time3km    = Math.round(3000 / (sim.mazSpeed / 3.6));
  const rpm        = 250; // 15000/60

  // ===================================================
  // רמה קלה — גיל 5–7
  // ===================================================
  const easy = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מכונית המרוץ סיימה את הפנייה ב־${sim.f1Time} שניות. מכונית אבא סיימה ב־${sim.mazTime} שניות. אחרי כמה שניות הגיעה מכונית אבא?`,
      data: `<span class="hi">🏎️ F1: ${sim.f1Time} שניות</span><br><span class="whi">🚗 אבא: ${sim.mazTime} שניות</span>`,
      answers: shuffle([
        { t: `${timeDiff} שניות`, ok: true },
        { t: `${timeDiff + 2} שניות`, ok: false },
        { t: `${timeDiff - 1} שניות`, ok: false },
        { t: `${timeDiff + 4} שניות`, ok: false }
      ]),
      ok: `✅ כל הכבוד! ${sim.mazTime} פחות ${sim.f1Time} = ${timeDiff} שניות!`,
      fail: `❌ רמז: ${sim.mazTime} פחות ${sim.f1Time} — כמה נשאר?`
    },

    { subject: '🏁 מרוצים', tag: 'tag-racing',
      text: 'כמה גלגלים יש למכונית F1?',
      data: '💡 ספור את הגלגלים בסרטון!',
      answers: shuffle([
        { t: '4', ok: true },
        { t: '6', ok: false },
        { t: '2', ok: false },
        { t: '8', ok: false }
      ]),
      ok: '✅ נכון! 4 גלגלים — כמו מכונית אבא. רק הרבה יותר מהירים! 🏎️',
      fail: '❌ ספור שוב — קדמיים ואחוריים!'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'למה מכונית המרוץ הצליחה לפנות ומכונית אבא לא?',
      data: `🏎️ F1 — צמיגים מיוחדים<br>🚗 אבא — צמיגים רגילים`,
      answers: shuffle([
        { t: '🔴 הצמיגים של F1 אוחזים חזק יותר', ok: true },
        { t: '🎵 יש לה מוסיקה חזקה יותר', ok: false },
        { t: '🎨 הצבע האדום עוזר לפנות', ok: false },
        { t: '💺 הנהג קטן יותר', ok: false }
      ]),
      ok: '✅ נכון! הצמיגים של F1 עשויים מגומי מיוחד שנדבק לאספלט!',
      fail: '❌ חשוב על מה שנוגע בכביש...'
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

    { subject: '🏁 מרוצים', tag: 'tag-racing',
      text: 'מה הצבע של הדגל שמסמן סיום מירוץ?',
      data: '🏁 הנהג הראשון שרואה את הדגל — ניצח!',
      answers: shuffle([
        { t: 'שחור-לבן משובץ', ok: true },
        { t: 'אדום', ok: false },
        { t: 'ירוק', ok: false },
        { t: 'צהוב', ok: false }
      ]),
      ok: '✅ נכון! הדגל המשובץ = סיום מירוץ. סנה ראה אותו הרבה פעמים ראשון! 🏆',
      fail: '❌ הדגל המשובץ בשחור-לבן הוא סיום המירוץ!'
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: 'סנה ניצח 3 פעמים באליפות. בכמה זכיות הוא עוד צריך כדי להגיע ל-5?',
      data: '🏆 אליפויות עולם של סנה: 3',
      answers: shuffle([
        { t: '2', ok: true },
        { t: '3', ok: false },
        { t: '1', ok: false },
        { t: '4', ok: false }
      ]),
      ok: '✅ נכון! 5 פחות 3 = 2. עוד שתי אליפויות!',
      fail: '❌ 5 פחות 3 — כמה נשאר?'
    }

  ];

  // ===================================================
  // רמה בינונית — גיל 8–10
  // ===================================================
  const medium = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `הפנייה היא 200 מטר. מכונית אבא נסעה ב־${sim.mazSpeed} קמ"ש. כמה זמן ייקח לה לנסוע 3 קילומטר?`,
      data: `<span class="whi">🚗 אבא: ${sim.mazSpeed} קמ"ש</span><br>📏 מרחק: 3,000 מטר`,
      answers: shuffle([
        { t: `${time3km} שניות`, ok: true },
        { t: `${time3km + 10} שניות`, ok: false },
        { t: `${time3km - 8} שניות`, ok: false },
        { t: `${Math.round(time3km * 1.5)} שניות`, ok: false }
      ]),
      ok: `✅ מדויק! ב־${sim.mazSpeed} קמ"ש, שלושה ק"מ לוקחים ${time3km} שניות.`,
      fail: `❌ רמז: קודם חשב כמה מטר בשנייה. ${sim.mazSpeed} קמ"ש = ? מ/ש`
    },

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `סנה נכנס לפנייה ב־${sim.f1Speed} קמ"ש והאט ל־${sim.f1Apex} קמ"ש ב-Apex. כמה קמ"ש הוא הפסיד?`,
      data: `<span class="hi">כניסה: ${sim.f1Speed} קמ"ש</span><br><span class="hi">Apex: ${sim.f1Apex} קמ"ש</span>`,
      answers: shuffle([
        { t: `${speedDiff} קמ"ש`, ok: true },
        { t: `${speedDiff + 10} קמ"ש`, ok: false },
        { t: `${speedDiff - 15} קמ"ש`, ok: false },
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
      ok: '✅ נכון! עקפת את המקום הראשון — אתה ראשון! 🏆',
      fail: '❌ אם היית שני ועקפת את הראשון — מה אתה עכשיו?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'ל-F1 יש כנפיות שדוחפות אותה לאספלט. איך זה עוזר לה לפנות?',
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

    { subject: '🏁 מרוצים', tag: 'tag-racing',
      text: `סנה זכה באליפות ב-${EPISODE_CONFIG.driver.championshipYears.join(', ')}. כמה שנים עברו מהאליפות הראשונה לאחרונה?`,
      data: `🏆 אליפויות: ${EPISODE_CONFIG.driver.championshipYears.join(', ')}`,
      answers: shuffle([
        { t: '3 שנים', ok: true },
        { t: '5 שנים', ok: false },
        { t: '2 שנים', ok: false },
        { t: '4 שנים', ok: false }
      ]),
      ok: '✅ נכון! 1991 פחות 1988 = 3 שנים. תוך 3 שנים — 3 אליפויות!',
      fail: '❌ 1991 פחות 1988 = ?'
    }

  ];

  // ===================================================
  // רמה מתקדמת — גיל 11–14
  // ===================================================
  const hard = [

    { subject: '📐 חשבון', tag: 'tag-math',
      text: `מכונית אבא נסעה ב־${sim.mazSpeed} קמ"ש. כמה מטר לשנייה זה?`,
      data: `<span class="whi">💡 קמ"ש ÷ 3.6 = מ/ש</span>`,
      answers: shuffle([
        { t: `${mazMs} מ/ש`, ok: true },
        { t: `${mazMs + 8} מ/ש`, ok: false },
        { t: `${mazMs - 5} מ/ש`, ok: false },
        { t: `${Math.round(mazMs * 1.4)} מ/ש`, ok: false }
      ]),
      ok: `✅ נכון! ${sim.mazSpeed} ÷ 3.6 = ${mazMs} מ/ש. ב-F1 מודדים הכל במטר לשנייה!`,
      fail: `❌ רמז: קילומטר = 1000 מטר, שעה = 3600 שניות. ${sim.mazSpeed} ÷ 3.6 = ?`
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
      ok: `✅ נכון! 15,000 ÷ 60 = ${rpm} סיבובים בשנייה. סנה שמע את ההבדל בין 14,800 ל-15,000 RPM!`,
      fail: '❌ רמז: דקה = 60 שניות. 15,000 ÷ 60 = ?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: 'כוח צנטריפטלי תלוי במהירות בריבוע. אם סנה מכפיל את מהירותו — הכוח יגדל פי כמה?',
      data: `<span class="hi">נוסחה: F = mv²/r</span><br>v מוכפל ב-2 — מה קורה ל-v²?`,
      answers: shuffle([
        { t: 'פי 4', ok: true },
        { t: 'פי 2', ok: false },
        { t: 'פי 8', ok: false },
        { t: 'נשאר אותו דבר', ok: false }
      ]),
      ok: '✅ נכון! v² — המהירות בריבוע. כפול 2 במהירות = כפול 4 בכוח. לכן מהירות כפולה = סכנה פי ארבע!',
      fail: '❌ רמז: v² — אם v=2, אז 2²=4. אם v=4, אז 4²=?'
    },

    { subject: '🌍 גאוגרפיה', tag: 'tag-geo',
      text: 'ברזיל היא המדינה הגדולה בדרום אמריקה. מה השפה הרשמית שלה ולמה לא ספרדית?',
      data: '🇧🇷 ברזיל קיבלה עצמאות ב-1822 מ... ?',
      answers: shuffle([
        { t: 'פורטוגזית — בגלל הקולוניזציה הפורטוגלית', ok: true },
        { t: 'ספרדית — כמו שאר דרום אמריקה', ok: false },
        { t: 'אנגלית — שפת הספורט העולמי', ok: false },
        { t: 'ברזילית — שפה עצמאית', ok: false }
      ]),
      ok: '✅ נכון! ב-1500 פורטוגל הגיעה לברזיל — ומאז פורטוגזית. כל שאר דרום אמריקה — ספרדית!',
      fail: '❌ כל שאר דרום אמריקה ספרדית — למה ברזיל שונה? מי הגיע לשם ראשון?'
    },

    { subject: '🏁 תורת משחקים', tag: 'tag-racing',
      text: `סנה נכנס לפנייה ב-${sim.f1Speed} קמ"ש. יש מתחרה בצידו הפנימי. מה החלטה הנכונה?`,
      data: `<span class="hi">מהיר מדי:</span> יוצא מהמסלול<br><span class="whi">איטי מדי:</span> מתחרה עובר<br><span style="color:#2ecc71">מדויק:</span> שומר עמדה`,
      answers: shuffle([
        { t: 'להאט מעט ולשמור על הקו — לא להסתכן', ok: true },
        { t: 'להאיץ ולנסות לחסום', ok: false },
        { t: 'לעצור לגמרי', ok: false },
        { t: 'לצאת מהמסלול כדי להימנע', ok: false }
      ]),
      ok: '✅ בדיוק כמו סנה! הוא תמיד אמר: "פנייה מושלמת שווה יותר מעקיפה מסוכנת."',
      fail: '❌ בפנייה עם מתחרה — מהירות פחות שליטה = תאונה. מה עדיף?'
    },

    { subject: '⚡ פיזיקה', tag: 'tag-physics',
      text: `ב-${sim.tireType === 'slicks' ? 'צמיגי Slicks יבשים' : sim.tireType === 'rain' ? 'צמיגי גשם' : 'צמיגי כביש'} — מה קורה לאחיזה כשיורד גשם?`,
      data: `<span class="hi">Slicks:</span> גומי חלק — מקסימום אחיזה ביבש<br><span class="whi">גשם:</span> מים יוצרים שכבה בין הגומי לאספלט`,
      answers: shuffle([
        { t: 'האחיזה יורדת דרמטית — המים "שוברים" את הקשר עם האספלט', ok: true },
        { t: 'האחיזה עולה — המים מקררים את הצמיגים', ok: false },
        { t: 'לא משתנה — הגומי חזק מספיק', ok: false },
        { t: 'האחיזה עולה מעט', ok: false }
      ]),
      ok: '✅ נכון! Aquaplaning — שכבת מים מנתקת את הצמיג מהאספלט. לכן F1 מחליפה ל-Wet צמיגים כשיורד גשם!',
      fail: '❌ מים בין גומי לאספלט — מה זה עושה לחיכוך?'
    }

  ];

  return { easy, medium, hard };
}

// ===================================================
// בחירת 6 שאלות לפי גיל
// ===================================================
function selectQuestions(age, sim) {
  const all = buildQuestions(sim);
  let pool;

  if (age <= 7)       pool = all.easy;
  else if (age <= 10) pool = all.medium;
  else                pool = all.hard;

  // ערבב ובחר 6
  const shuffled = shuffle([...pool]);
  return shuffled.slice(0, Math.min(6, shuffled.length));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
