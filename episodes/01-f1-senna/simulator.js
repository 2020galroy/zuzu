// ===================================================
// פרק 01 — סימולטור F1
// ===================================================

function loadSimulator() {
  const ep = document.getElementById('episode-content');
  ep.innerHTML = `
<style>
.sim-wrap { max-width: 680px; margin: 0 auto; }
.video-wrap { margin-bottom: 20px; }
.video-wrap iframe { border-radius: 10px; max-width: 100%; }

/* פאנלים */
.main-layout { display:flex; justify-content:center; align-items:flex-start; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
.panel { background:#1e1e1e; border:1px solid #333; border-radius:10px; padding:14px 12px; width:175px; text-align:right; }
.panel.f1-panel    { border-top:3px solid #f5a623; }
.panel.mazda-panel { border-top:3px solid #ffffff; }
.panel.weather-panel { border-top:3px solid #555; }
.panel h3 { font-size:13px; margin-bottom:12px; border-bottom:1px solid #333; padding-bottom:6px; }
.f1-panel h3    { color:#f5a623; }
.mazda-panel h3 { color:#ffffff; }
.weather-panel h3 { color:#aaa; }
.speed-value { font-size:28px; font-weight:bold; text-align:center; margin-bottom:2px; }
.f1-panel    .speed-value { color:#f5a623; }
.mazda-panel .speed-value { color:#ffffff; }
.speed-unit { font-size:11px; color:#888; text-align:center; margin-bottom:10px; }
.speed-sub  { font-size:10px; color:#666; text-align:center; margin-top:5px; }
.f1-panel   .speed-sub { color:#a07020; }
input[type=range] { width:100%; cursor:pointer; }
.f1-panel    input[type=range] { accent-color:#f5a623; }
.mazda-panel input[type=range] { accent-color:#cccccc; }
.speed-labels { display:flex; justify-content:space-between; font-size:10px; color:#555; margin-top:3px; }
.opt-btn { display:block; width:100%; padding:7px 10px; margin-bottom:7px; background:#2a2a2a;
  border:2px solid #444; border-radius:7px; color:#ccc; font-size:12px; cursor:pointer;
  text-align:right; transition:all 0.15s; }
.opt-btn:hover { border-color:#888; color:#fff; }
.f1-panel     .opt-btn.selected { border-color:#f5a623; background:#3a2e00; color:#f5a623; font-weight:bold; }
.weather-panel .opt-btn.selected { border-color:#777; background:#2a2a2a; color:#fff; font-weight:bold; }

/* Canvas */
.canvas-wrap { flex-shrink:0; }
canvas { background:#1a6b1a; border-radius:12px; display:block; }
.legend { display:flex; justify-content:center; gap:16px; margin:8px 0; font-size:12px; flex-wrap:wrap; }
.legend-dot { width:12px; height:12px; border-radius:50%; display:inline-block; margin-left:5px; }

/* HUD */
#speed-hud { display:none; margin:8px auto 0; max-width:520px; gap:8px; justify-content:center; }
.hud-box { background:#1e1e1e; border-radius:6px; padding:6px 12px; font-size:12px; border:1px solid #333; flex:1; }
.hud-box .hud-label { color:#888; font-size:10px; margin-bottom:2px; }
.hud-box .hud-val   { font-size:16px; font-weight:bold; }
.hud-f1    { border-top:2px solid #f5a623; }
.hud-mazda { border-top:2px solid #fff; }

/* כפתור הרצה */
#run-btn { display:block; margin:12px auto 0; padding:12px 42px; font-size:17px;
  background:#e74c3c; color:#fff; border:none; border-radius:9px; cursor:pointer; transition:background 0.15s; }
#run-btn:hover { background:#c0392b; }

/* מסך תוצאות */
#results-screen { display:none; max-width:680px; margin:0 auto; }
.insights-box { background:#1a1a1a; border-right:4px solid #f5a623; border-radius:10px; padding:20px; text-align:right; margin-bottom:16px; }
.insights-box h3 { color:#f5a623; font-size:16px; margin-bottom:14px; }
.compare-table { width:100%; border-collapse:collapse; font-size:13px; margin-top:8px; }
.compare-table th { background:#2a2a2a; padding:8px 12px; color:#888; font-weight:normal; }
.compare-table td { padding:8px 12px; border-top:1px solid #2a2a2a; }
.compare-table tr:nth-child(even) td { background:#181818; }
.f1-val  { color:#f5a623; font-weight:bold; }
.maz-val { color:#fff; font-weight:bold; }
.senna-quote { background:#1a1a1a; border:1px solid #333; border-radius:10px; padding:18px 20px;
  margin-bottom:20px; text-align:right; font-style:italic; font-size:15px; line-height:1.7; color:#ddd; }
.senna-quote .credit { color:#f5a623; font-size:12px; margin-top:8px; font-style:normal; font-weight:bold; }

/* חגיגה */
.celebration { position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:999; }
.confetti-piece { position:absolute; width:10px; height:10px; border-radius:2px; animation:fall 1.5s ease-in forwards; }
@keyframes fall { to { transform:translateY(100vh) rotate(720deg); opacity:0; } }

/* שאלות */
#quiz-area { max-width:680px; margin:0 auto; }
.q-card { display:none; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:12px; padding:24px 22px; text-align:right; }
.q-card.active { display:block; }
.q-num { font-size:11px; color:#666; margin-bottom:6px; letter-spacing:1px; }
.q-subject-tag { display:inline-block; padding:3px 10px; border-radius:4px; font-size:11px; font-weight:bold; margin-bottom:12px; }
.tag-math    { background:#1a2a3a; color:#66aaff; }
.tag-physics { background:#2a1a00; color:#f5a623; }
.tag-geo     { background:#1a2a1a; color:#66cc66; }
.tag-racing  { background:#2a2a1a; color:#cccc44; }
.q-text { font-size:17px; font-weight:bold; color:#fff; margin-bottom:8px; line-height:1.5; }
.q-data-box { background:#141414; border-right:3px solid #444; border-radius:6px; padding:12px 14px; margin-bottom:16px; font-size:13px; line-height:1.8; color:#ccc; }
.q-data-box .hi  { color:#f5a623; font-weight:bold; }
.q-data-box .whi { color:#fff; font-weight:bold; }
.q-opts { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
.q-btn { padding:12px 16px; font-size:14px; background:#222; border:2px solid #333; border-radius:8px; color:#ddd; cursor:pointer; transition:all 0.15s; text-align:right; }
.q-btn:hover:not(:disabled) { border-color:#555; background:#2a2a2a; color:#fff; }
.q-btn:disabled { cursor:default; }
.q-btn.correct { border-color:#2ecc71; background:#0d2a1a; color:#2ecc71; font-weight:bold; }
.q-btn.wrong   { border-color:#e74c3c; background:#2a0a0a; color:#e74c3c; }
.q-btn.reveal  { border-color:#2ecc71; background:#0d2a1a; color:#2ecc71; opacity:0.7; }
.q-feedback { font-size:14px; min-height:22px; margin-bottom:12px; line-height:1.6; padding-right:4px; }
.q-feedback.ok   { color:#2ecc71; }
.q-feedback.fail { color:#e74c3c; }
#next-btn { display:none; margin:0 auto 20px; padding:11px 36px; font-size:15px;
  background:#f5a623; color:#111; font-weight:bold; border:none; border-radius:8px; cursor:pointer; }
#next-btn:hover { background:#ffb733; }

/* ציון */
#score-screen { display:none; max-width:480px; margin:20px auto; text-align:center;
  background:#1a1a1a; border-radius:14px; padding:30px 24px; border:1px solid #333; }
#score-screen h2 { font-size:22px; color:#f5a623; margin-bottom:10px; }
.score-big { font-size:60px; font-weight:bold; margin:16px 0; }
.score-msg { font-size:15px; color:#aaa; margin-bottom:20px; line-height:1.6; }
#restart-btn { padding:12px 36px; font-size:16px; background:#333; color:#fff; border:1px solid #555; border-radius:9px; cursor:pointer; }
#restart-btn:hover { background:#444; }

.hi    { color:#f5a623; font-weight:bold; }
.whi   { color:#fff; font-weight:bold; }
.green { color:#2ecc71; font-weight:bold; }
.red   { color:#e74c3c; font-weight:bold; }
</style>

<div class="sim-wrap">

  <!-- סרטון -->
  <div class="video-wrap">
    <iframe width="560" height="315"
      src="https://www.youtube.com/embed/${EPISODE_CONFIG.video.id}?start=${EPISODE_CONFIG.video.start}&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

  <!-- שלב 1: סימולטור -->
  <div id="phase1">
    <div class="main-layout">

      <!-- F1 -->
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
        <div class="panel f1-panel">
          <h3>🔧 צמיגי F1</h3>
          <button class="opt-btn selected" onclick="selTire(this,'slicks')">🔴 Slicks מירוץ</button>
          <button class="opt-btn" onclick="selTire(this,'rain')">🔵 צמיגי גשם</button>
          <button class="opt-btn" onclick="selTire(this,'road')">⚫ צמיגי כביש</button>
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

      <!-- מזדה + מזג אוויר -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="panel mazda-panel">
          <h3>🚗 מכונית אבא</h3>
          <div class="speed-value" id="maz-spd-disp">120</div>
          <div class="speed-unit">קמ"ש כניסה</div>
          <input type="range" id="maz-slider" min="40" max="200" step="10" value="120" oninput="updateMaz(this.value)">
          <div class="speed-labels"><span>40</span><span>120</span><span>200</span></div>
          <div class="speed-sub" id="maz-apex-disp">Apex: ~74 קמ"ש</div>
          <div class="speed-sub" id="maz-exit-disp">יציאה: ~94 קמ"ש</div>
        </div>
        <div class="panel weather-panel">
          <h3>🌤️ מזג אוויר</h3>
          <button class="opt-btn selected" onclick="selWeather(this,'dry')">☀️ יבש</button>
          <button class="opt-btn" onclick="selWeather(this,'wet')">🌧️ גשום</button>
          <button class="opt-btn" onclick="selWeather(this,'storm')">⛈️ סופה</button>
        </div>
      </div>

    </div>
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

  initSimulator();
}

// ===================================================
// לוגיקת סימולטור
// ===================================================

function initSimulator() {
  const canvas = document.getElementById('track');
  const ctx    = canvas.getContext('2d');

  let f1Speed = 290, mazSpeed = 120, tireType = 'slicks', weather = 'dry';
  let animFrame = null;
  let _f1Makes, _mazMakes, _f1Grip, _mazGrip;

  const RADIUS = EPISODE_CONFIG.simulator.cornerRadius;
  const G = 9.81;

  const F1_GRIP = {
    slicks: { dry:4.5, wet:1.8, storm:0.9 },
    rain:   { dry:3.2, wet:3.8, storm:2.2 },
    road:   { dry:1.5, wet:0.9, storm:0.5 }
  };
  const MAZ_GRIP = { dry:0.85, wet:0.50, storm:0.28 };

  const reqG  = kmh => { const ms = kmh/3.6; return (ms*ms)/(RADIUS*G); };
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
        showResults(f1Speed, mazSpeed, _f1Makes, _mazMakes, _f1Grip, tireType, weather);
      }
    }
    animFrame = requestAnimationFrame(animate);
  };

  drawTrack();
}

// ===================================================
// תוצאות
// ===================================================
function showResults(f1Speed, mazSpeed, f1Makes, mazMakes, f1Grip, tireType, weather) {
  document.getElementById('speed-hud').style.display = 'none';
  document.getElementById('phase1').style.display    = 'none';
  document.getElementById('phase2').style.display    = 'block';

  const apexS = e => Math.round(e * 0.62);
  const exitS = e => Math.round(e * 0.78);
  const avgS  = e => (e + apexS(e) + exitS(e)) / 3;
  const MAZ_GRIP = { dry:0.85, wet:0.50, storm:0.28 };
  const CORNER = EPISODE_CONFIG.simulator.cornerLength;
  const reqG = kmh => { const ms=kmh/3.6; return (ms*ms)/(250*9.81); };

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
  document.getElementById('run-btn').style.display = 'block';
  document.getElementById('speed-hud').style.display = 'none';
  document.getElementById('score-screen').style.display = 'none';
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('quiz-area').innerHTML = '';
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
