// ===================================================
// פרק 01 — סימולטור F1
// ===================================================

function loadSimulator() {
  const ep = document.getElementById('episode-content');
  ep.innerHTML = `
<style>
.sim-wrap { max-width: 720px; margin: 0 auto; }

/* סרטון */
.video-wrap { margin-bottom: 20px; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.video-wrap iframe { border-radius: 14px; max-width: 100%; display: block; }

/* פאנלים */
.main-layout { display:flex; justify-content:center; align-items:flex-start; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
.panel { background:#fff; border:2px solid #e8e8e8; border-radius:14px; padding:14px 12px; width:175px; text-align:right; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.panel.f1-panel    { border-top:4px solid #f5a623; }
.panel.mazda-panel { border-top:4px solid #3498db; }
.panel.weather-panel { border-top:4px solid #9b59b6; }
.panel.track-panel  { border-top:4px solid #1abc9c; }
.track-panel h3 { color:#0e8c7a; }
.track-panel .opt-btn.selected { border-color:#1abc9c; background:#eafaf7; color:#0e8c7a; font-weight:bold; }
.panel h3 { font-size:15px; font-weight:bold; margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:8px; color:#333; }
.f1-panel h3      { color:#d4880a; }
.mazda-panel h3   { color:#2176ae; }
.weather-panel h3 { color:#7d3c98; }
.speed-value { font-size:36px; font-weight:900; text-align:center; margin-bottom:2px; }
.f1-panel    .speed-value { color:#f5a623; }
.mazda-panel .speed-value { color:#3498db; }
.speed-unit { font-size:13px; font-weight:bold; color:#aaa; text-align:center; margin-bottom:10px; }
.speed-sub  { font-size:12px; color:#bbb; text-align:center; margin-top:5px; }
.f1-panel   .speed-sub { color:#c4882a; }
.mazda-panel .speed-sub { color:#5588bb; }
input[type=range] { width:100%; cursor:pointer; height:6px; }
.f1-panel    input[type=range] { accent-color:#f5a623; }
.mazda-panel input[type=range] { accent-color:#3498db; }
.weather-panel input[type=range] { accent-color:#9b59b6; }
.speed-labels { display:flex; justify-content:space-between; font-size:11px; color:#bbb; margin-top:4px; }
.opt-btn { display:block; width:100%; padding:10px 12px; margin-bottom:8px; background:#f8f8f8;
  border:2px solid #e0e0e0; border-radius:8px; color:#444; font-size:14px; font-weight:bold; cursor:pointer;
  text-align:right; transition:all 0.15s; }
.opt-btn:hover { border-color:#bbb; color:#222; background:#f0f0f0; }
.f1-panel     .opt-btn.selected { border-color:#f5a623; background:#fff8ee; color:#c4880a; font-weight:bold; }
.weather-panel .opt-btn.selected { border-color:#9b59b6; background:#f8f0ff; color:#7d3c98; font-weight:bold; }

/* Canvas */
.canvas-wrap { flex-shrink:0; }
canvas { background:#2d8a2d; border-radius:14px; display:block; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
.legend { display:flex; justify-content:center; gap:16px; margin:8px 0; font-size:14px; font-weight:bold; flex-wrap:wrap; color:#444; }
.legend-dot { width:12px; height:12px; border-radius:50%; display:inline-block; margin-left:5px; }

/* HUD */
#speed-hud { display:none; margin:8px auto 0; max-width:520px; gap:8px; justify-content:center; }
.hud-box { background:#fff; border-radius:10px; padding:8px 14px; font-size:12px; border:1px solid #e0e0e0; flex:1; box-shadow:0 2px 6px rgba(0,0,0,0.06); }
.hud-box .hud-label { color:#aaa; font-size:12px; font-weight:bold; margin-bottom:2px; }
.hud-box .hud-val   { font-size:20px; font-weight:900; color:#333; }
.hud-f1    { border-top:3px solid #f5a623; }
.hud-mazda { border-top:3px solid #3498db; }

/* כפתור הרצה */
#run-btn { display:block; margin:12px auto 0; padding:13px 44px; font-size:17px;
  background:linear-gradient(135deg,#e74c3c,#c0392b); color:#fff; border:none; border-radius:10px;
  cursor:pointer; transition:all 0.15s; box-shadow:0 3px 12px rgba(231,76,60,0.35); font-weight:bold; }
#run-btn:hover { transform:translateY(-1px); box-shadow:0 5px 16px rgba(231,76,60,0.45); }

/* שלב מעבדה */
#lab-banner { display:none; max-width:720px; margin:14px auto 0; background:#f0fff4;
  border:2px solid #2ecc71; border-radius:14px; padding:18px 22px; text-align:right; box-shadow:0 2px 10px rgba(46,204,113,0.15); }
#lab-banner h3 { color:#1a8a47; font-size:16px; margin-bottom:6px; }
#lab-banner p  { color:#555; font-size:13px; margin:0 0 12px; line-height:1.6; }
#lab-counter   { font-size:13px; color:#1a8a47; font-weight:bold; margin-bottom:12px; }
#lab-go-quiz   { display:block; margin:0 auto; padding:12px 36px; font-size:16px;
  background:linear-gradient(135deg,#2ecc71,#27ae60); color:#fff; font-weight:bold; border:none; border-radius:10px; cursor:pointer; box-shadow:0 3px 10px rgba(46,204,113,0.3); }
#lab-go-quiz:hover { transform:translateY(-1px); box-shadow:0 5px 14px rgba(46,204,113,0.4); }

/* מסך תוצאות */
#results-screen { display:none; max-width:720px; margin:0 auto; }
.insights-box { background:#fff; border-right:5px solid #f5a623; border-radius:14px; padding:22px; text-align:right; margin-bottom:16px; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
.insights-box h3 { color:#c4880a; font-size:19px; font-weight:bold; margin-bottom:14px; }
.compare-table { width:100%; border-collapse:collapse; font-size:15px; margin-top:8px; }
.compare-table th { background:#f8f8f8; padding:10px 12px; color:#666; font-weight:bold; border-bottom:2px solid #eee; }
.compare-table td { padding:10px 12px; border-top:1px solid #f0f0f0; color:#333; font-weight:500; }
.compare-table tr:nth-child(even) td { background:#fafafa; }
.f1-val  { color:#d4880a; font-weight:bold; }
.maz-val { color:#2176ae; font-weight:bold; }
.senna-quote { background:#fff8ee; border:2px solid #f5a623; border-radius:14px; padding:20px 22px;
  margin-bottom:20px; text-align:right; font-style:italic; font-size:17px; line-height:1.9; color:#444; box-shadow:0 2px 10px rgba(245,166,35,0.12); }
.senna-quote .credit { color:#d4880a; font-size:12px; margin-top:10px; font-style:normal; font-weight:bold; }

/* חגיגה */
.confetti-piece { position:fixed; width:10px; height:10px; border-radius:2px; animation:fall 1.5s ease-in forwards; z-index:999; pointer-events:none; }
@keyframes fall { to { transform:translateY(100vh) rotate(720deg); opacity:0; } }

/* שאלות */
#quiz-area { max-width:720px; margin:0 auto; }
.q-card { display:none; background:#fff; border:1px solid #e8e8e8; border-radius:16px; padding:26px 24px; text-align:right; box-shadow:0 3px 14px rgba(0,0,0,0.07); }
.q-card.active { display:block; }
.q-num { font-size:13px; color:#bbb; font-weight:bold; margin-bottom:6px; letter-spacing:1px; }
.q-subject-tag { display:inline-block; padding:5px 14px; border-radius:6px; font-size:13px; font-weight:bold; margin-bottom:14px; }
.tag-math    { background:#e8f0ff; color:#2255cc; }
.tag-physics { background:#fff4e0; color:#c4880a; }
.tag-geo     { background:#e8fff0; color:#1a8a47; }
.tag-racing  { background:#fff0e8; color:#c04020; }
.q-text { font-size:22px; font-weight:bold; color:#1a1a2e; margin-bottom:12px; line-height:1.5; }
.q-data-box { background:#f8f8f8; border-right:4px solid #e0e0e0; border-radius:8px; padding:14px 16px; margin-bottom:18px; font-size:15px; line-height:2; color:#444; }
.q-data-box .hi  { color:#d4880a; font-weight:bold; }
.q-data-box .whi { color:#2176ae; font-weight:bold; }
.q-opts { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; }
.q-btn { padding:16px 18px; font-size:17px; background:#f8f8f8; border:2px solid #e0e0e0; border-radius:12px; color:#333; cursor:pointer; transition:all 0.15s; text-align:right; font-weight:600; }
.q-btn:hover:not(:disabled) { border-color:#bbb; background:#f0f0f0; }
.q-btn:disabled { cursor:default; }
.q-btn.correct { border-color:#2ecc71; background:#eafaf1; color:#1a8a47; font-weight:bold; }
.q-btn.wrong   { border-color:#e74c3c; background:#fef0ef; color:#c0392b; }
.q-btn.reveal  { border-color:#2ecc71; background:#eafaf1; color:#1a8a47; opacity:0.75; }
.q-feedback { font-size:16px; font-weight:bold; min-height:24px; margin-bottom:14px; line-height:1.6; padding-right:4px; }
.q-feedback.ok   { color:#1a8a47; }
.q-feedback.fail { color:#c0392b; }
#next-btn { display:none; margin:0 auto 20px; padding:12px 40px; font-size:16px;
  background:linear-gradient(135deg,#f5a623,#e67e22); color:#fff; font-weight:bold; border:none; border-radius:10px; cursor:pointer; box-shadow:0 3px 10px rgba(245,166,35,0.3); }
#next-btn:hover { transform:translateY(-1px); }

/* ציון */
#score-screen { display:none; max-width:480px; margin:20px auto; text-align:center;
  background:#fff; border-radius:18px; padding:32px 26px; box-shadow:0 6px 30px rgba(0,0,0,0.10); }
#score-screen h2 { font-size:28px; font-weight:bold; color:#d4880a; margin-bottom:10px; }
.score-big { font-size:72px; font-weight:900; margin:16px 0; }
.score-msg { font-size:18px; color:#555; margin-bottom:22px; line-height:1.6; font-weight:500; }
#restart-btn { padding:13px 40px; font-size:16px; background:#f8f8f8; color:#333; border:2px solid #e0e0e0; border-radius:12px; cursor:pointer; font-weight:bold; }
#restart-btn:hover { background:#f0f0f0; border-color:#ccc; }

.hi    { color:#d4880a; font-weight:bold; }
.whi   { color:#2176ae; font-weight:bold; }
.green { color:#1a8a47; font-weight:bold; }
.red   { color:#c0392b; font-weight:bold; }

/* ── מובייל ── */
@media (max-width: 600px) {
  .sim-wrap { padding: 0 8px; }

  /* layout אנכי */
  .main-layout { flex-direction: column; align-items: stretch; gap: 10px; }

  /* פאנלי מהירות — שניים בשורה */
  .main-layout > div:first-child { flex-direction: row !important; }
  .main-layout > div:first-child .panel { flex: 1; width: auto; min-width: 0; }

  /* canvas — מוקטן לרוחב המסך */
  .canvas-wrap { width: 100%; overflow: hidden; }
  canvas {
    width: 100% !important;
    height: auto !important;
    max-width: 100%;
    display: block;
  }
  .legend { font-size: 11px; gap: 8px; }

  /* HUD */
  #speed-hud { flex-wrap: wrap; gap: 6px; }
  .hud-box { flex: 1; min-width: 80px; padding: 6px 8px; }
  .hud-box .hud-val { font-size: 16px; }

  /* כפתור הרצה */
  #run-btn { width: 100%; padding: 14px; font-size: 16px; }

  /* שלושת פאנלי הפילטר — עמודה אחת */
  .main-layout > div:last-child { flex-direction: column !important; gap: 8px; }
  .main-layout > div:last-child > div { flex-direction: row !important; gap: 8px; }
  .main-layout > div:last-child .panel { flex: 1; width: auto; min-width: 0; }
  .main-layout > div:last-child .track-panel { width: 100%; flex: none; }
  .track-panel .opt-btn { display: inline-block; width: auto; padding: 8px 10px; margin: 0 4px 6px 0; }
  #track-radius-info { text-align: right; }

  /* שאלות */
  .q-opts { grid-template-columns: 1fr; }
  .q-text { font-size: 18px; }
  .q-btn  { font-size: 15px; padding: 14px; }

  /* ציון */
  #score-screen { margin: 10px 0; }
  .score-big { font-size: 56px; }
}
</style>

<div class="sim-wrap">

  <!-- שלב 0: סרטון -->
  <div id="phase0" style="max-width:640px;margin:0 auto 0;">
    <div class="video-wrap" style="background:#111;border-radius:14px;overflow:hidden;margin-bottom:16px;">
      <div style="position:relative;padding-bottom:56.25%;height:0;">
        <iframe
          style="position:absolute;top:0;right:0;width:100%;height:100%;"
          src="https://www.youtube.com/embed/${EPISODE_CONFIG.video.id}?start=${EPISODE_CONFIG.video.start}&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <button onclick="startSimulator()" style="display:block;margin:0 auto 24px;padding:15px 52px;
      font-size:19px;font-weight:bold;background:linear-gradient(135deg,#f5a623,#e74c3c);
      color:#fff;border:none;border-radius:12px;cursor:pointer;
      box-shadow:0 4px 16px rgba(245,166,35,0.4);letter-spacing:0.5px;">
      🏎️ בוא נשחק עם הפיזיקה!
    </button>
  </div>

  <!-- שלב 1: סימולטור -->
  <div id="phase1" style="display:none;">
    <div class="main-layout">

      <!-- F1 מהירות + מכונית אבא -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="panel f1-panel">
          <h3>🏎️ F1 של סנה</h3>
          <div class="speed-value" id="f1-spd-disp">290</div>
          <div class="speed-unit">קמ"ש כניסה</div>
          <input type="range" id="f1-slider" min="100" max="330" step="10" value="290" oninput="updateF1(this.value)">
          <div class="speed-labels"><span>100</span><span>215</span><span>330</span></div>
          <div class="speed-sub" id="f1-apex-disp">Apex: ~180 קמ"ש</div>
          <div class="speed-sub" id="f1-exit-disp">יציאה: ~225 קמ"ש</div>
        </div>
        <div class="panel mazda-panel">
          <h3>🚗 מכונית אבא</h3>
          <div class="speed-value" id="maz-spd-disp">120</div>
          <div class="speed-unit">קמ"ש כניסה</div>
          <input type="range" id="maz-slider" min="40" max="200" step="10" value="120" oninput="updateMaz(this.value)">
          <div class="speed-labels"><span>40</span><span>120</span><span>200</span></div>
          <div class="speed-sub" id="maz-apex-disp">Apex: ~74 קמ"ש</div>
          <div class="speed-sub" id="maz-exit-disp">יציאה: ~94 קמ"ש</div>
        </div>
      </div>

      <!-- Canvas -->
      <div class="canvas-wrap">
        <div class="legend">
          <span><span class="legend-dot" style="background:#f5a623"></span>F1 סנה</span>
          <span><span class="legend-dot" style="background:#fff"></span>מכונית אבא</span>
          <span><span class="legend-dot" style="background:#00ff88"></span>כוח צנטריפטלי</span>
          <span><span class="legend-dot" style="background:#ff4444"></span>בלימה</span>
        </div>
        <canvas id="track" width="520" height="390"></canvas>
        <div id="speed-hud" style="display:flex">
          <div class="hud-box hud-f1">
            <div class="hud-label">F1 — מהירות</div>
            <div class="hud-val" id="hud-f1" style="color:#f5a623">—</div>
          </div>
          <div class="hud-box">
            <div class="hud-label">שלב</div>
            <div class="hud-val" id="hud-phase" style="color:#aaa">—</div>
          </div>
          <div class="hud-box hud-mazda">
            <div class="hud-label">אבא — מהירות</div>
            <div class="hud-val" id="hud-maz" style="color:#fff">—</div>
          </div>
        </div>
        <button id="run-btn" onclick="startAnim()">▶ הרץ סימולציה</button>
      </div>

      <!-- צמיגים + מזג אוויר + מסלול -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:10px;">
          <div class="panel f1-panel" style="flex:1;min-width:0;">
            <h3>🔧 צמיגים</h3>
            <button class="opt-btn selected" onclick="selTire(this,'slicks')">🔴 מירוץ</button>
            <button class="opt-btn" onclick="selTire(this,'rain')">🔵 גשם</button>
            <button class="opt-btn" onclick="selTire(this,'road')">⚫ כביש</button>
          </div>
          <div class="panel weather-panel" style="flex:1;min-width:0;">
            <h3>🌤️ מזג אוויר</h3>
            <button class="opt-btn selected" onclick="selWeather(this,'dry')">☀️ יבש</button>
            <button class="opt-btn" onclick="selWeather(this,'wet')">🌧️ גשום</button>
            <button class="opt-btn" onclick="selWeather(this,'storm')">⛈️ סופה</button>
          </div>
          <div class="panel track-panel" style="flex:1;min-width:0;">
            <h3>🏁 מסלול</h3>
            <button class="opt-btn" onclick="selTrack(this,50,'מונאקו','🇲🇨 מונאקו')">🇲🇨 מונאקו</button>
            <button class="opt-btn" onclick="selTrack(this,150,'Eau Rouge','🇧🇪 Eau Rouge')">🇧🇪 Eau Rouge</button>
            <button class="opt-btn selected" onclick="selTrack(this,250,'מונזה','🇮🇹 מונזה')">🇮🇹 מונזה</button>
            <div style="font-size:11px;color:#aaa;margin-top:6px;text-align:center;" id="track-radius-info">רדיוס: 250 מ'</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- שלב מעבדה: אחרי ריצה ראשונה -->
  <div id="lab-banner">
    <h3>🔬 רוצה לנסות שוב עם הגדרות אחרות?</h3>
    <p>מה קורה אם תגדיל את המהירות? ואם תחליף צמיגים? ואם ירד גשם?<br>
    כל ניסוי מלמד אותך משהו חדש.</p>
    <div id="lab-counter"></div>
    <button id="lab-go-quiz" onclick="goToQuiz()">✅ סיימתי לנסות — בוא לשאלות!</button>
  </div>

  <!-- שלב 2: תוצאות + שאלות -->
  <div id="phase2" style="display:none; padding-top:10px;">

    <div id="results-screen">
      <div class="insights-box">
        <h3>🔬 מה למדנו מהסימולציה?</h3>
        <div id="insights-content"></div>
      </div>
      <div class="senna-quote">
        😏 סנה מציץ אליך ואומר:<br><br>
        <em>"${EPISODE_CONFIG.character.quote}"</em>
        <div class="credit">— ${EPISODE_CONFIG.character.quoteCredit} 🏆</div>
      </div>
      <button onclick="startQuiz()" style="display:block;margin:0 auto 24px;padding:14px 48px;
        font-size:18px;background:#f5a623;color:#111;font-weight:bold;
        border:none;border-radius:10px;cursor:pointer;">
        🎯 בוא נבחן את עצמנו!
      </button>
    </div>

    <div id="quiz-area"></div>
    <button id="next-btn" onclick="nextQuestion()">השאלה הבאה ←</button>

    <div id="score-screen">
      <h2>🏁 סיימנו!</h2>
      <div class="score-big" id="score-big"></div>
      <div class="score-msg" id="score-msg"></div>
      <button id="restart-btn" onclick="restartAll()">🔄 שחק שוב</button>
    </div>

  </div>

</div><!-- end sim-wrap -->
`;

  window.startSimulator = function() {
    document.getElementById('phase0').style.display = 'none';
    document.getElementById('phase1').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  initSimulator();
}

// ===================================================
// לוגיקת סימולטור
// ===================================================

function initSimulator() {
  const canvas = document.getElementById('track');
  const ctx    = canvas.getContext('2d');

  let f1Speed = 290, mazSpeed = 120, tireType = 'slicks', weather = 'dry', trackRadius = 250;
  let animFrame = null;
  let _f1Makes, _mazMakes, _f1Grip, _mazGrip;
  let _runCount = 0;

  const G = 9.81;

  const F1_GRIP = {
    slicks: { dry:4.5, wet:1.8, storm:0.9 },
    rain:   { dry:3.2, wet:3.8, storm:2.2 },
    road:   { dry:1.5, wet:0.9, storm:0.5 }
  };
  const MAZ_GRIP = { dry:0.85, wet:0.50, storm:0.28 };

  const reqG  = kmh => { const ms = kmh/3.6; return (ms*ms)/(trackRadius*G); };
  const apexS = e   => Math.round(e * 0.62);
  const exitS = e   => Math.round(e * 0.78);
  const avgS  = e   => (e + apexS(e) + exitS(e)) / 3;

  window.updateF1 = v => {
    f1Speed = +v;
    document.getElementById('f1-spd-disp').textContent = v;
    document.getElementById('f1-apex-disp').textContent = `Apex: ~${apexS(+v)} קמ"ש`;
    document.getElementById('f1-exit-disp').textContent = `יציאה: ~${exitS(+v)} קמ"ש`;
  };

  window.updateMaz = v => {
    mazSpeed = +v;
    document.getElementById('maz-spd-disp').textContent = v;
    document.getElementById('maz-apex-disp').textContent = `Apex: ~${apexS(+v)} קמ"ש`;
    document.getElementById('maz-exit-disp').textContent = `יציאה: ~${exitS(+v)} קמ"ש`;
  };

  window.selTire = (btn, t) => {
    document.querySelectorAll('.f1-panel .opt-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    tireType = t;
  };

  window.selWeather = (btn, w) => {
    document.querySelectorAll('.weather-panel .opt-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    weather = w;
  };

  window.selTrack = (btn, radius, name, label) => {
    document.querySelectorAll('.track-panel .opt-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    trackRadius = radius;
    document.getElementById('track-radius-info').textContent = `רדיוס פנייה: ${radius} מטר`;
  };

  // ---- ציור מסלול ----
  function drawTrack() {
    ctx.clearRect(0, 0, 520, 390);
    ctx.fillStyle = '#1a6b1a';
    ctx.fillRect(0, 0, 520, 390);

    if (weather === 'wet')   { ctx.fillStyle = 'rgba(0,80,160,0.18)';  ctx.fillRect(0,0,520,390); }
    if (weather === 'storm') { ctx.fillStyle = 'rgba(0,0,80,0.30)';    ctx.fillRect(0,0,520,390); }

    ctx.beginPath();
    ctx.moveTo(20,90); ctx.lineTo(300,90);
    ctx.quadraticCurveTo(500,90,500,290);
    ctx.lineTo(500,380); ctx.lineTo(415,380);
    ctx.quadraticCurveTo(415,180,235,180);
    ctx.lineTo(20,180); ctx.closePath();
    ctx.fillStyle = weather==='storm'?'#3a3a4a':weather==='wet'?'#4a4a5a':'#606060';
    ctx.fill();

    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(20,90); ctx.lineTo(300,90); ctx.quadraticCurveTo(500,90,500,290); ctx.lineTo(500,380); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20,180); ctx.lineTo(235,180); ctx.quadraticCurveTo(415,180,415,380); ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,80,0.4)'; ctx.setLineDash([14,10]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(20,135); ctx.lineTo(280,135); ctx.quadraticCurveTo(458,135,458,335); ctx.lineTo(458,380); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ff4444';
    ctx.beginPath(); ctx.arc(418,185,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffaaaa'; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText('APEX',418,172);

    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Arial';
    ctx.fillText('① כניסה',80,78);
    ctx.fillText('② בלימה',260,78);
    ctx.fillText('③ יציאה',490,375);
    ctx.textAlign = 'left';

    if (weather==='wet' || weather==='storm') {
      ctx.strokeStyle = 'rgba(150,200,255,0.35)'; ctx.lineWidth = 1;
      const n = weather==='storm' ? 38 : 16;
      for (let i=0; i<n; i++) {
        const rx=(i*173)%500, ry=(i*97)%370;
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx+2,ry+7); ctx.stroke();
      }
    }
  }

  function drawCar(x,y,color,label,angle) {
    ctx.save(); ctx.translate(x,y); ctx.rotate(angle||0);
    ctx.beginPath(); ctx.ellipse(0,0,15,8,0,0,Math.PI*2);
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    ctx.fillStyle = color; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
    ctx.fillText(label,x,y-18); ctx.textAlign = 'left';
  }

  function drawArrow(x,y,dx,dy,color,label) {
    if (Math.hypot(dx,dy) < 2) return;
    const a = Math.atan2(dy,dx);
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx,y+dy);
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+dx,y+dy);
    ctx.lineTo(x+dx-10*Math.cos(a-0.4), y+dy-10*Math.sin(a-0.4));
    ctx.lineTo(x+dx-10*Math.cos(a+0.4), y+dy-10*Math.sin(a+0.4));
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    if (label) {
      ctx.fillStyle = color; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center';
      ctx.fillText(label, x+dx+16*Math.cos(a), y+dy+16*Math.sin(a));
      ctx.textAlign = 'left';
    }
  }

  function drawSpdBubble(x,y,spd,color) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath(); ctx.roundRect(x-26,y-11,52,16,4); ctx.fill();
    ctx.fillStyle = color; ctx.font = 'bold 11px Arial'; ctx.textAlign = 'center';
    ctx.fillText(Math.round(spd)+' km/h', x, y);
    ctx.textAlign = 'left';
  }

  function buildPath(makes, yOff) {
    const pts = []; const N = 300;
    for (let i=0; i<=N; i++) {
      const t = i/N; let x, y;
      if (makes) {
        if (t < 0.38) { x=20+t/0.38*270; y=135+yOff; }
        else { const a=(t-0.38)/0.62*(Math.PI/2); x=290+Math.sin(a)*160; y=(135+yOff)+(1-Math.cos(a))*220; }
      } else {
        if (t < 0.38) { x=20+t/0.38*275; y=112+yOff; }
        else { const p=(t-0.38)/0.62; x=295+Math.sin(p*0.3)*50+p*195; y=112+yOff+p*25; }
      }
      pts.push({x,y});
    }
    return pts;
  }

  function getPoint(path,t) {
    const i = Math.min(Math.floor(t*path.length), path.length-1);
    return path[Math.max(0,i)];
  }

  function spdAtT(entry,t,makes) {
    if (!makes) return entry;
    if (t < 0.38) return entry-(entry-apexS(entry))*(t/0.38);
    return apexS(entry)+(exitS(entry)-apexS(entry))*((t-0.38)/0.62);
  }

  function phaseAt(t) {
    return t<0.15?'① כניסה':t<0.38?'② בלימה':t<0.65?'③ Apex':'④ האצה';
  }

  // ---- אנימציה ----
  window.startAnim = () => {
    document.getElementById('run-btn').style.display = 'none';
    document.getElementById('speed-hud').style.display = 'flex';

    _f1Grip   = F1_GRIP[tireType][weather];
    _mazGrip  = MAZ_GRIP[weather];
    _f1Makes  = _f1Grip  >= reqG(f1Speed);
    _mazMakes = _mazGrip >= reqG(mazSpeed);

    const f1Path  = buildPath(_f1Makes,  0);
    const mazPath = buildPath(_mazMakes, 18);
    const baseSpd = avgS(f1Speed);
    const mazRatio = avgS(mazSpeed) / baseSpd;
    const SLIP = 0.42;
    let tF1=0, tMaz=0;

    function animate() {
      drawTrack();
      const tiF1=Math.min(tF1,1), tiMaz=Math.min(tMaz,1);
      const fp=getPoint(f1Path,tiF1), fp2=getPoint(f1Path,Math.min(tiF1+0.01,1));

      drawCar(fp.x,fp.y,'#f5a623','F1 סנה',Math.atan2(fp2.y-fp.y,fp2.x-fp.x));
      drawSpdBubble(fp.x,fp.y+28, spdAtT(f1Speed,tiF1,_f1Makes),'#f5a623');

      if (tiF1>0.05 && tiF1<0.36) { const b=Math.sin((tiF1/0.36)*Math.PI)*38; drawArrow(fp.x,fp.y,-b*0.9,0,'#ff4444','בלימה'); }
      if (tiF1>0.38 && tiF1<0.85) { const p=(tiF1-0.38)/0.47; drawArrow(fp.x,fp.y,-20*Math.sin(p*1.2),20*Math.sin(p*0.8)+14,'#00ff88','צנטריפטלי'); }
      if (tiF1>0.65 && _f1Makes)  { const p=(tiF1-0.65)/0.35; drawArrow(fp.x,fp.y,8,22*p,'#88eeff','האצה'); }

      if (!_f1Makes && tiF1>SLIP) {
        ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(25,48,200,26);
        ctx.fillStyle='#f5a623'; ctx.font='bold 13px Arial'; ctx.textAlign='center';
        ctx.fillText('⚠️ F1 גם לא מחזיקה!',125,65); ctx.textAlign='left';
      }

      if (!_mazMakes) {
        if (tiMaz < SLIP) {
          const mp=getPoint(mazPath,tiMaz), mp2=getPoint(mazPath,Math.min(tiMaz+0.01,1));
          drawCar(mp.x,mp.y,'#fff','מכונית אבא',Math.atan2(mp2.y-mp.y,mp2.x-mp.x));
          drawSpdBubble(mp.x,mp.y+28,spdAtT(mazSpeed,tiMaz,false),'#ccc');
        } else {
          const sp=getPoint(mazPath,SLIP), ov=(tiMaz-SLIP)*350;
          const sx=sp.x+ov*0.55, sy=sp.y+ov*0.06;
          drawCar(sx,sy,'#aaa','אבא 💥',0.04);
          if (tiMaz < SLIP+0.14) drawArrow(sp.x,sp.y,52,3,'#ccc','מחליקה');
          if (tiMaz > SLIP+0.1) {
            ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(95,205,330,52);
            ctx.fillStyle='#fff'; ctx.font='bold 14px Arial'; ctx.textAlign='center';
            ctx.fillText('הצמיגים איבדו אחיזה!',260,232);
            ctx.fillText('לא פונה — ממשיכה ישר 💥',260,252);
            ctx.textAlign='left';
          }
        }
      } else {
        const mp=getPoint(mazPath,tiMaz), mp2=getPoint(mazPath,Math.min(tiMaz+0.01,1));
        drawCar(mp.x,mp.y,'#fff','אבא ✅',Math.atan2(mp2.y-mp.y,mp2.x-mp.x));
        drawSpdBubble(mp.x,mp.y+28,spdAtT(mazSpeed,tiMaz,true),'#ccc');
      }

      document.getElementById('hud-f1').textContent   = Math.round(spdAtT(f1Speed,tiF1,_f1Makes))+' קמ"ש';
      document.getElementById('hud-maz').textContent  = Math.round(spdAtT(mazSpeed,tiMaz,_mazMakes))+' קמ"ש';
      document.getElementById('hud-phase').textContent = phaseAt(tiF1);

      tF1  += 0.006;
      tMaz += 0.006 * mazRatio;

      if (tF1 < 1.35 || tMaz < 1.35) {
        animFrame = requestAnimationFrame(animate);
      } else {
        _runCount++;
        showLabBanner(f1Speed, mazSpeed, _f1Makes, _mazMakes, _f1Grip, tireType, weather, trackRadius);
      }
    }
    animFrame = requestAnimationFrame(animate);
  };

  drawTrack();
}

// ===================================================
// שלב מעבדה
// ===================================================
let _lastSimArgs = null;

function showLabBanner(f1Speed, mazSpeed, f1Makes, mazMakes, f1Grip, tireType, weather, trackRadius) {
  _lastSimArgs = { f1Speed, mazSpeed, f1Makes, mazMakes, f1Grip, tireType, weather, trackRadius };

  document.getElementById('run-btn').style.display = 'block';
  document.getElementById('run-btn').textContent = '🔄 נסה שוב עם הגדרות אחרות';
  document.getElementById('speed-hud').style.display = 'none';

  const banner = document.getElementById('lab-banner');
  banner.style.display = 'block';

  const runCount = document.getElementById('run-btn').dataset.runCount
    ? +document.getElementById('run-btn').dataset.runCount
    : 1;
  document.getElementById('run-btn').dataset.runCount = runCount;

  const labels = ['🔬 ניסוי ראשון', '🧪 ניסוי שני', '🏆 ניסוי שלישי', '🚀 מדען F1 אמיתי!'];
  const idx = Math.min(runCount - 1, labels.length - 1);
  const msgs = [
    'ניסית פעם אחת — מה קורה אם תחליף צמיגים? ואם ירד גשם?',
    'ניסית פעמיים — אתה מתחיל להבין! עוד ניסוי אחד?',
    'שלושה ניסויים! אתה מדען F1 אמיתי. מוכן לשאלות?',
    'וואו — כל כך הרבה ניסויים! סנה היה גאה. מוכן לשאלות?'
  ];
  document.getElementById('lab-counter').textContent = labels[idx] + ' — ' + msgs[idx];
  document.getElementById('run-btn').dataset.runCount = runCount + 1;
}

window.goToQuiz = function() {
  document.getElementById('lab-banner').style.display = 'none';
  document.getElementById('run-btn').style.display = 'none';
  if (_lastSimArgs) {
    const a = _lastSimArgs;
    showResults(a.f1Speed, a.mazSpeed, a.f1Makes, a.mazMakes, a.f1Grip, a.tireType, a.weather, a.trackRadius);
  }
};

// ===================================================
// תוצאות
// ===================================================
function showResults(f1Speed, mazSpeed, f1Makes, mazMakes, f1Grip, tireType, weather, trackRadius) {
  document.getElementById('speed-hud').style.display = 'none';
  document.getElementById('phase1').style.display    = 'none';
  document.getElementById('phase2').style.display    = 'block';

  const apexS = e => Math.round(e * 0.62);
  const exitS = e => Math.round(e * 0.78);
  const avgS  = e => (e + apexS(e) + exitS(e)) / 3;
  const MAZ_GRIP = { dry:0.85, wet:0.50, storm:0.28 };
  const CORNER = EPISODE_CONFIG.simulator.cornerLength;
  const reqG = kmh => { const ms=kmh/3.6; return (ms*ms)/(_lastSimArgs.trackRadius*9.81); };

  const f1Time  = Math.round(CORNER / (avgS(f1Speed)/3.6));
  const mazTime = Math.round(CORNER / (avgS(mazSpeed)/3.6));

  document.getElementById('insights-content').innerHTML = `
    <table class="compare-table">
      <tr><th></th><th style="color:#f5a623">🏎️ F1 של סנה</th><th style="color:#fff">🚗 מכונית אבא</th></tr>
      <tr><td>מהירות כניסה</td><td class="f1-val">${f1Speed} קמ"ש</td><td class="maz-val">${mazSpeed} קמ"ש</td></tr>
      <tr><td>מהירות Apex</td><td class="f1-val">~${apexS(f1Speed)} קמ"ש</td><td class="maz-val">~${apexS(mazSpeed)} קמ"ש</td></tr>
      <tr><td>מהירות יציאה</td><td class="f1-val">~${exitS(f1Speed)} קמ"ש</td><td class="maz-val">~${exitS(mazSpeed)} קמ"ש</td></tr>
      <tr><td>זמן בפנייה</td><td class="f1-val">${f1Time} שנ'</td><td class="maz-val">${mazTime} שנ'</td></tr>
      <tr><td>כוח אחיזה זמין</td><td class="f1-val">${f1Grip}G</td><td class="maz-val">${MAZ_GRIP[weather]}G</td></tr>
      <tr><td>כוח נדרש לפנייה</td><td class="f1-val">${reqG(f1Speed).toFixed(2)}G</td><td class="maz-val">${reqG(mazSpeed).toFixed(2)}G</td></tr>
      <tr><td>תוצאה</td>
        <td>${f1Makes?'<span class="green">✅ מחזיקה</span>':'<span class="red">❌ לא מחזיקה</span>'}</td>
        <td>${mazMakes?'<span class="green">✅ מחזיקה</span>':'<span class="red">❌ יוצאת מהמסלול</span>'}</td>
      </tr>
    </table>`;

  document.getElementById('results-screen').style.display = 'block';

  // שמירת נתוני הסימולציה לשאלות
  window._simData = {
    f1Speed, mazSpeed,
    f1Apex:  apexS(f1Speed),
    mazApex: apexS(mazSpeed),
    f1Time, mazTime,
    f1Ms:  Math.round(f1Speed  / 3.6),
    mazMs: Math.round(mazSpeed / 3.6),
    tireType, weather
  };
}

// ===================================================
// קוויז
// ===================================================
let _questions = [], _qIndex = 0, _score = 0;

function startQuiz() {
  _questions = selectQuestions(playerAge, window._simData);
  _qIndex = 0; _score = 0;

  document.getElementById('results-screen').style.display = 'none';
  const qa = document.getElementById('quiz-area');
  qa.innerHTML = '';

  _questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'q-card' + (i===0 ? ' active' : '');
    card.id = 'q-card-' + i;
    card.innerHTML = `
      <div class="q-num">שאלה ${i+1} מתוך ${_questions.length}</div>
      <div class="q-subject-tag ${q.tag}">${q.subject}</div>
      <div class="q-text">${q.text}</div>
      <div class="q-data-box">${q.data}</div>
      <div class="q-opts" id="opts-${i}"></div>
      <div class="q-feedback" id="fb-${i}"></div>`;

    q.answers.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'q-btn';
      btn.textContent = a.t;
      btn.onclick = () => answerQuestion(i, btn, a.ok, q.ok, q.fail);
      card.querySelector('#opts-'+i).appendChild(btn);
    });

    qa.appendChild(card);
  });

  document.getElementById('next-btn').style.display = 'none';
  window.scrollTo({ top: document.getElementById('phase2').offsetTop - 20, behavior: 'smooth' });
}

function answerQuestion(i, btn, ok, okMsg, failMsg) {
  const opts = document.querySelectorAll('#opts-'+i+' .q-btn');
  opts.forEach(b => b.disabled = true);

  const fb = document.getElementById('fb-'+i);

  if (ok) {
    btn.classList.add('correct');
    fb.innerHTML = okMsg;
    fb.className = 'q-feedback ok';
    _score++;
    celebrate();
  } else {
    btn.classList.add('wrong');
    fb.innerHTML = failMsg;
    fb.className = 'q-feedback fail';
    // הראה את התשובה הנכונה
    opts.forEach(b => {
      if (b.textContent === _questions[i].answers.find(a => a.ok).t) {
        b.classList.add('reveal');
      }
    });
  }

  if (i < _questions.length - 1) {
    document.getElementById('next-btn').style.display = 'block';
  } else {
    setTimeout(showScore, 900);
  }
}

function nextQuestion() {
  document.getElementById('q-card-'+_qIndex).classList.remove('active');
  _qIndex++;
  document.getElementById('q-card-'+_qIndex).classList.add('active');
  document.getElementById('next-btn').style.display = 'none';
  window.scrollTo({ top: document.getElementById('quiz-area').offsetTop - 20, behavior: 'smooth' });
}

function showScore() {
  document.getElementById('next-btn').style.display = 'none';
  const ss = document.getElementById('score-screen');
  ss.style.display = 'block';

  const pct = _score / _questions.length;
  document.getElementById('score-big').textContent = `${_score}/${_questions.length}`;
  document.getElementById('score-big').style.color = pct===1?'#2ecc71':pct>=0.7?'#f5a623':'#e74c3c';

  const name = playerName || 'אלוף';
  const msgs = {
    6: `🏆 מושלם ${name}! סנה היה גאה בך!`,
    5: `🎉 מצוין! עוד שאלה אחת ואתה אלוף!`,
    4: `👍 יפה מאוד ${name}! בפעם הבאה תשבור את השיא!`,
    3: `💪 לא רע! כל מירוץ מלמד — נסה שוב!`,
    2: `🔄 עוד קצת אימון ותהיה מוכן למירוץ!`,
    1: `🚀 זו רק ההתחלה — סנה גם הפסיד לפני שניצח!`,
    0: `😄 אפס — אבל גם סנה התחיל מאפס!`
  };

  document.getElementById('score-msg').textContent = msgs[_score] || 'כל הכבוד!';

  // שמירת ניקוד
  const saved = JSON.parse(localStorage.getItem('zuzu_player') || '{}');
  saved.scores = saved.scores || {};
  saved.scores[EPISODE_CONFIG.id] = { score: _score, total: _questions.length, date: new Date().toISOString() };
  localStorage.setItem('zuzu_player', JSON.stringify(saved));

  if (pct === 1) bigCelebrate();
  ss.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function restartAll() {
  if (window.animFrame) cancelAnimationFrame(window.animFrame);
  document.getElementById('phase1').style.display = 'block';
  document.getElementById('phase2').style.display = 'none';
  const runBtn = document.getElementById('run-btn');
  runBtn.style.display = 'block';
  runBtn.textContent = '▶ הרץ סימולציה';
  runBtn.dataset.runCount = '1';
  document.getElementById('lab-banner').style.display = 'none';
  document.getElementById('lab-counter').textContent = '';
  document.getElementById('speed-hud').style.display = 'none';
  document.getElementById('phase1').style.display = 'block';
  document.getElementById('score-screen').style.display = 'none';
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('quiz-area').innerHTML = '';
  _lastSimArgs = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================================
// חגיגות
// ===================================================
function celebrate() {
  const colors = ['#f5a623','#2ecc71','#3498db','#e74c3c','#9b59b6'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random()*100}%;
      top: ${Math.random()*30}%;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration: ${0.8+Math.random()*0.7}s;
      animation-delay: ${Math.random()*0.3}s;
      transform: rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

function bigCelebrate() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => celebrate(), i * 300);
  }
}
