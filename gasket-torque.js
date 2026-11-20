// ガスケット締付トルク計算（ポケットブック組込み版）
// 画面(HTML)とスタイルをここで差し込み、そのあと計算プログラムを動かす
(function(){
  var st=document.createElement('style'); st.textContent="#page-torque{--card:#fff;--ink:#111827;--sub:#4b5563;--line:#d5dbe3;--main:var(--primary);--main2:#e6edf8;--ok:#166534;--warn:#9a4a05;--warnbg:#fff3e0;--ng:#a61b13;--ngbg:#fde8e6;color:var(--ink);font-size:16px;line-height:1.55}\n#page-torque *{box-sizing:border-box}\n#page-torque .gt-wrap{max-width:720px;margin:0 auto}\n/* ポケットブック共通の表スタイル（固定列・ヘッダ固定）を打ち消す */\n#page-torque table{min-width:0}\n#page-torque th,#page-torque td,#page-torque th:first-child,#page-torque td:first-child{position:static;box-shadow:none;white-space:normal;background:transparent;font-weight:inherit;text-align:left;border:0;border-bottom:1px solid var(--line);color:inherit;font-size:inherit;padding:7px 4px}\n#page-torque th{font-weight:700;color:var(--main)}\n#page-torque tr:nth-child(even) td,#page-torque tr:hover td,#page-torque tr:nth-child(even) td:first-child,#page-torque tr:hover td:first-child{background:transparent}\n#page-torque .badge{border:0;box-shadow:none}\n#page-torque .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;margin-bottom:12px}\n#page-torque .card h2{margin:0 0 10px;font-size:16px;color:var(--main);display:flex;align-items:center;gap:6px}\n#page-torque .num{display:inline-flex;width:24px;height:24px;border-radius:50%;background:var(--main);color:#fff;font-size:13px;align-items:center;justify-content:center}\n#page-torque .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n#page-torque label{display:block;font-size:13px;color:var(--sub);margin-bottom:3px;font-weight:600}\n#page-torque input,#page-torque select{width:100%;padding:10px 8px;border:1px solid var(--line);border-radius:8px;font-size:16px;background:#fff;color:var(--ink)}\n#page-torque input:focus,#page-torque select:focus{outline:2px solid var(--main2);border-color:var(--main)}\n#page-torque .auto{background:#f6f8fb}\n#page-torque .seg{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}\n#page-torque .seg button{flex:1;border:0;background:#fff;padding:10px 4px;font-size:15px;cursor:pointer;color:var(--ink)}\n#page-torque .seg button.on{background:var(--main);color:#fff;font-weight:700}\n#page-torque .badge{display:inline-block;font-size:12px;padding:1px 8px;border-radius:10px;margin-left:4px;vertical-align:middle;font-weight:700}\n#page-torque .b-ok{background:#dcfce7;color:var(--ok)}\n#page-torque .b-warn{background:var(--warnbg);color:var(--warn)}\n#page-torque .note{font-size:13px;color:var(--sub);margin-top:6px}\n#page-torque #gt-result{border:2px solid var(--main)}\n#page-torque .target{background:var(--main);color:#fff;border-radius:12px;padding:14px 12px;text-align:center;margin-bottom:10px}\n#page-torque .target .t{font-size:16px;font-weight:700;letter-spacing:.05em}\n#page-torque .target .v{font-size:56px;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums}\n#page-torque .target .v small{font-size:22px;font-weight:700;margin-left:4px}\n#page-torque .target .s{font-size:14px;opacity:.95;margin-top:2px}\n#page-torque .range{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px}\n#page-torque .range div{background:var(--main2);border-radius:10px;padding:10px;text-align:center}\n#page-torque .range .t{font-size:14px;color:var(--ink);font-weight:700}\n#page-torque .range .v{font-size:32px;font-weight:800;color:var(--main);line-height:1.15;font-variant-numeric:tabular-nums}\n#page-torque .range .v small{font-size:15px;margin-left:3px}\n#page-torque .range .s{font-size:12px;color:var(--sub)}\n#page-torque .alert{border-radius:10px;padding:10px 12px;font-size:15px;margin-top:8px;font-weight:600}\n#page-torque .alert.warn{background:var(--warnbg);color:#7a3405;border-left:5px solid #f59e0b}\n#page-torque .alert.ng{background:var(--ngbg);color:#7d1a14;border-left:5px solid var(--ng)}\n#page-torque .alert.info{background:var(--main2);color:var(--main);border-left:5px solid var(--main)}\n#page-torque h3{font-size:17px;margin:16px 0 6px;color:var(--ink)}\n#page-torque .stepbar{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0 8px}\n#page-torque .stepbar span{text-align:center;background:var(--main2);border-radius:10px;padding:8px 2px;font-size:14px;font-weight:700;color:var(--sub)}\n#page-torque .stepbar b{display:block;font-size:26px;color:var(--main);line-height:1.15}\n#page-torque .stepbar i{font-style:normal;font-size:12px}\n#page-torque ol.steps{margin:6px 0 0;padding-left:22px;font-size:16px}\n#page-torque ol.steps li{margin-bottom:10px}\n#page-torque ol.steps b{color:var(--main)}\n#page-torque table{width:100%;border-collapse:collapse;font-size:14px}\n#page-torque td,#page-torque th{border-bottom:1px solid var(--line);padding:7px 4px;text-align:left}\n#page-torque td.r{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}\n#page-torque details{margin-top:10px}\n#page-torque summary{cursor:pointer;color:var(--main);font-size:15px;font-weight:600}\n#page-torque .btn{border:1px solid var(--main);background:#fff;color:var(--main);border-radius:8px;padding:9px 14px;font-size:14px;cursor:pointer}\n#page-torque .btn.p{background:var(--main);color:#fff}\n#page-torque .gtable input{padding:5px 4px;font-size:14px}\n#page-torque .gtable td{padding:4px 2px}\n#page-torque .gt-foot{font-size:12px;color:var(--sub);text-align:center;padding:10px 12px 24px}\n@media (max-width:420px){#page-torque .target .v{font-size:48px} #page-torque .range .v{font-size:28px} #page-torque .stepbar b{font-size:22px}}";
  document.head.appendChild(st);
  var pg=document.getElementById('page-torque');
  if(pg) pg.innerHTML="<div class=\"page-title\">🔩 ガスケット締付トルク計算</div>\n    <div class=\"gt-wrap\">\n    <p style=\"font-size:12px;color:var(--muted);margin:0 0 10px;\">JIS B 8265（Wm1・Wm2）＋ガスケット面圧から必要トルクを計算</p>\n<section class=\"card\">\n  <h2><span class=\"num\">1</span>フランジ</h2>\n  <div class=\"grid\">\n    <div><label>規格</label>\n      <select id=\"gt-std\">\n        <optgroup label=\"JIS B 2220\">\n          <option value=\"10K\">JIS 10K</option><option value=\"20K\">JIS 20K</option>\n          <option value=\"30K\">JIS 30K</option><option value=\"63K\">JIS 63K</option>\n        </optgroup>\n        <optgroup label=\"ASME B16.5（ANSI）\">\n          <option value=\"150\">ANSI 150LB</option><option value=\"300\">ANSI 300LB</option>\n          <option value=\"600\">ANSI 600LB</option><option value=\"900\">ANSI 900LB</option>\n          <option value=\"1500\">ANSI 1500LB</option>\n        </optgroup>\n        <option value=\"manual\">手入力</option>\n      </select></div>\n    <div><label>呼び径</label><select id=\"gt-size\"></select></div>\n  </div>\n  <div class=\"grid\" style=\"margin-top:10px\">\n    <div><label>ボルト本数 n</label><input id=\"gt-nb\" type=\"number\" inputmode=\"numeric\" class=\"auto\"></div>\n    <div><label>ボルト径</label><select id=\"gt-bd\" class=\"auto\"></select></div>\n  </div>\n  <div class=\"note\" id=\"gt-stdNote\">規格を選ぶと自動で入ります。違う場合は手で直せばOKです。</div>\n</section>\n\n<section class=\"card\">\n  <h2><span class=\"num\">2</span>ガスケット</h2>\n  <div><label>品番</label><select id=\"gt-gk\"></select></div>\n  <div id=\"gt-gkInfo\" class=\"note\"></div>\n  <div class=\"grid\" style=\"margin-top:10px\">\n    <div><label>接触内径 Gi [mm]</label><input id=\"gt-gi\" type=\"number\" inputmode=\"decimal\" class=\"auto\"></div>\n    <div><label>接触外径 Go [mm]</label><input id=\"gt-go\" type=\"number\" inputmode=\"decimal\" class=\"auto\"></div>\n  </div>\n  <div class=\"note\" id=\"gt-dimNote\"></div>\n</section>\n\n<section class=\"card\">\n  <h2><span class=\"num\">3</span>使用条件</h2>\n  <div class=\"grid\">\n    <div><label>内圧 P [MPa]</label><input id=\"gt-p\" type=\"number\" inputmode=\"decimal\" step=\"0.01\" value=\"1.0\"></div>\n    <div><label>流体</label>\n      <div class=\"seg\" id=\"gt-fluid\"><button data-v=\"liq\" class=\"on\">液体</button><button data-v=\"gas\">ガス</button></div></div>\n  </div>\n  <div class=\"grid\" style=\"margin-top:10px\">\n    <div><label>ボルト材質</label>\n      <select id=\"gt-mat\">\n        <option value=\"235\">SS400（降伏 235）</option>\n        <option value=\"205\">SUS304（降伏 205）</option>\n        <option value=\"725\">SNB7 / B7（降伏 725）</option>\n        <option value=\"490\">S45C 調質（降伏 490）</option>\n      </select></div>\n    <div><label>トルク係数 K</label><input id=\"gt-k\" type=\"number\" inputmode=\"decimal\" step=\"0.01\" value=\"0.20\"></div>\n  </div>\n  <div class=\"note\">K は一般的に 0.2（潤滑剤を塗ると小さくなります）。</div>\n</section>\n\n<section class=\"card\" id=\"gt-result\">\n  <div class=\"target\">\n    <div class=\"t\">目標トルク</div>\n    <div class=\"v\"><span id=\"gt-rT\">-</span><small>N·m</small></div>\n    <div class=\"s\" id=\"gt-rTnote\"></div>\n  </div>\n  <div class=\"range\">\n    <div><div class=\"t\">最小トルク</div><div class=\"v\"><span id=\"gt-rTmin\">-</span><small>N·m</small></div><div class=\"s\">これ以上で締める</div></div>\n    <div><div class=\"t\">上限トルク</div><div class=\"v\"><span id=\"gt-rTmax\">-</span><small>N·m</small></div><div class=\"s\" id=\"gt-rTmaxNote\"></div></div>\n  </div>\n  <div id=\"gt-alerts\"></div>\n\n  <h3>段階締めのトルク</h3>\n  <div class=\"stepbar\" id=\"gt-stepbar\"></div>\n  <h3>締付手順</h3>\n  <ol class=\"steps\" id=\"gt-steps\"></ol>\n\n  <details>\n    <summary>計算の中身を見る</summary>\n    <table id=\"gt-detail\"></table>\n  </details>\n</section>\n\n<section class=\"card\">\n  <h2>ガスケット係数の登録・修正</h2>\n  <div class=\"note\">カタログで確認した値に書き換えると、この端末に保存されます。<span class=\"badge b-ok\">確認済</span>はカタログ値、<span class=\"badge b-warn\">仮値</span>はまだ確認できていない値です。</div>\n  <details>\n    <summary>係数表をひらく</summary>\n    <div style=\"overflow-x:auto\"><table class=\"gtable\" id=\"gt-gtable\"></table></div>\n    <div style=\"display:flex;gap:8px;margin-top:8px;flex-wrap:wrap\">\n      <button class=\"btn p\" id=\"gt-saveG\">保存</button>\n      <button class=\"btn\" id=\"gt-resetG\">初期値にもどす</button>\n    </div>\n    <div class=\"note\" id=\"gt-gmsg\" style=\"color:var(--ok);font-weight:700\"></div>\n    <div class=\"note\">m：ガスケット係数 ／ y：最小設計締付圧力 ／ σs：最小（推奨）締付面圧 ／ σmax：許容締付面圧（空欄ならボルト強度だけで上限判定）</div>\n  </details>\n</section>\n\n<div class=\"gt-foot\">参考：ニチアス技術時報 2018 No.2「ガスケットの締付管理について」、JIS B 8265、JIS B 2220、JIS B 2404、ASME B16.5、ASME B16.20、バルカー製品カタログ<br>計算値は目安です。最終判断はメーカー資料・社内基準で確認してください。</div>\n    </div>";
})();
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ガスケット締付トルク計算（独立した計算機を組込み）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function(){
/* ================= ボルト ================= */
// id: {label, d[mm], As[mm2]}
const BOLT = {};
[[12,1.75],[16,2],[20,2.5],[22,2.5],[24,3],[27,3],[30,3.5],[33,3.5],[36,4]].forEach(([d,p])=>{
  BOLT["M"+d] = {label:"M"+d, d, As: Math.PI/4*Math.pow(d-0.9382*p,2)};
});
// インチ：1"以下はUNC、1-1/8"以上は8UN（ASME B16.5のスタッド）
[["1/2",0.5,13],["5/8",0.625,11],["3/4",0.75,10],["7/8",0.875,9],["1",1,8],["1-1/8",1.125,8],["1-1/4",1.25,8],["1-3/8",1.375,8],
 ["1-1/2",1.5,8],["1-5/8",1.625,8],["1-3/4",1.75,8],["1-7/8",1.875,8],["2",2,8],["2-1/4",2.25,8],["2-1/2",2.5,8],["2-3/4",2.75,8],["3",3,8],["3-1/2",3.5,8]]
.forEach(([s,d,n])=>{ BOLT[s+'"'] = {label:s+'"', d:d*25.4, As: Math.PI/4*Math.pow(d-0.9743/n,2)*645.16}; });

/* ================= JIS B 2220 =================
   [ボルト本数, ボルト, 平面座径RF(不明はnull)] */
const J = (n,m,rf)=>[n,"M"+m,rf];
const FLANGE = {
  "10K":{10:J(4,12,46),15:J(4,12,51),20:J(4,12,56),25:J(4,16,67),32:J(4,16,76),40:J(4,16,81),50:J(4,16,96),65:J(4,16,116),
    80:J(8,16,126),90:J(8,16,136),100:J(8,16,151),125:J(8,20,182),150:J(8,20,212),175:J(8,20,237),200:J(12,20,262),
    225:J(12,22,282),250:J(12,22,324),300:J(12,22,368),350:J(16,22,413),400:J(16,24,475),450:J(20,24,530),500:J(20,24,585),
    550:J(24,30,640),600:J(24,30,690)},
  "20K":{10:J(4,12,46),15:J(4,12,51),20:J(4,12,56),25:J(4,16,67),32:J(4,16,76),40:J(4,16,81),50:J(8,16,96),65:J(8,16,116),
    80:J(8,20,132),90:J(8,20,145),100:J(8,20,160),125:J(8,22,195),150:J(12,22,230),200:J(12,22,275),250:J(12,24,345),
    300:J(16,24,395),350:J(16,30,440),400:J(16,30,495)},
  "30K":{10:J(4,16,52),15:J(4,16,55),20:J(4,16,60),25:J(4,16,70),32:J(4,16,80),40:J(4,20,90),50:J(8,16,105),65:J(8,20,130),
    80:J(8,20,140),90:J(8,22,150),100:J(8,22,160),125:J(8,22,195),150:J(12,24,235),200:J(12,24,280),250:J(12,30,345),
    300:J(16,30,405),350:J(16,30,450),400:J(16,36,510)},
  "63K":{10:J(4,16,null),15:J(4,16,null),20:J(4,16,null),25:J(4,20,null),32:J(4,20,null),40:J(4,22,null),50:J(8,20,null),
    65:J(8,22,null),80:J(8,22,null),90:J(8,24,null),100:J(8,27,null),125:J(8,30,null),150:J(12,30,null),200:J(12,33,null),250:J(12,36,null)}
};
// JIS B 2404 リングガスケット（シート系）[内径, 外径]
const RING_ID = {10:18,15:22,20:28,25:35,32:43,40:49,50:61,65:84,80:90,90:102,100:115,125:141,150:167,175:192,200:218,225:244,250:270,300:321,350:359,400:410,450:460,500:513,550:564,600:615};
const RING_OD = {
  "10K":{10:53,15:58,20:63,25:74,32:84,40:89,50:104,65:124,80:134,90:144,100:159,125:190,150:220,175:245,200:270,225:290,250:333,300:378,350:423,400:486,450:541,500:596,550:650,600:700},
  "20K":{10:53,15:58,20:63,25:74,32:84,40:89,50:104,65:124,80:140,90:150,100:165,125:203,150:238,200:283,250:356,300:406,350:450,400:510},
  "30K":{10:59,15:64,20:69,25:79,32:89,40:100,50:114,65:140,80:150,90:163,100:173,125:208,150:251,200:296,250:360,300:420,350:465,400:524},
  "63K":{10:64,15:69,20:75,25:80,32:90,40:108,50:125,65:153,80:163,90:181,100:196,125:235,150:275,200:330,250:394}
};
// うず巻形 本体 [内径D2, 外径D3]（バルカー JIS管フランジ用寸法表）
const sp = (keys,a,b)=>Object.fromEntries(keys.map((k,i)=>[k,[a[i],b[i]]]));
const K24=[10,15,20,25,32,40,50,65,80,90,100,125,150,175,200,225,250,300,350,400,450,500,550,600];
const K18=[10,15,20,25,32,40,50,65,80,90,100,125,150,200,250,300,350,400];
const SPIRAL_JIS = {
  "10K": sp(K24,[24,28,34,40,51,57,69,87,101,112,127,153,182,209,236,256,287,337,375,429,486,536,589,640],
                [37,41,47,53,67,73,89,107,118,130,143,173,203,229,254,272,310,357,400,461,518,568,621,672]),
  "20K": sp(K18,[24,28,34,40,51,57,69,87,99,114,127,152,182,233,288,339,376,432],
                [37,41,47,53,67,73,89,107,119,139,152,177,214,265,328,379,416,482]),
  "30K": sp(K18,[24,28,34,40,51,57,69,78,90,102,116,140,165,218,271,320,356,403],
                [37,41,47,53,67,73,89,98,110,127,141,165,197,250,311,360,396,453]),
  "63K": sp(K18.slice(0,15),[21,24,29,35,44,51,63,78,90,102,116,140,165,218,271],
                [34,37,42,48,60,67,79,98,110,127,141,165,197,250,311])
};

/* ================= ASME B16.5 ================= */
const NPS = ["1/2","3/4","1","1-1/4","1-1/2","2","2-1/2","3","4","5","6","8","10","12","14","16","18","20","24"];
const RF_ANSI = [34.9,42.9,50.8,63.5,73.0,92.1,104.8,127.0,157.2,185.7,215.9,269.9,323.8,381.0,412.8,469.9,533.4,584.2,692.2];
const PIPE_OD = [21.3,26.7,33.4,42.2,48.3,60.3,73.0,88.9,114.3,141.3,168.3,219.1,273.1,323.9,355.6,406.4,457.0,508.0,610.0];
const ANSI_BOLT = { // 本数 x 径
  "150":["4x1/2","4x1/2","4x1/2","4x1/2","4x1/2","4x5/8","4x5/8","4x5/8","8x5/8","8x3/4","8x3/4","8x3/4","12x7/8","12x7/8","12x1","16x1","16x1-1/8","20x1-1/8","20x1-1/4"],
  "300":["4x1/2","4x5/8","4x5/8","4x5/8","4x3/4","8x5/8","8x3/4","8x3/4","8x3/4","8x3/4","12x3/4","12x7/8","16x1","16x1-1/8","20x1-1/8","20x1-1/4","24x1-1/4","24x1-1/4","24x1-1/2"],
  "600":["4x1/2","4x5/8","4x5/8","4x5/8","4x3/4","8x5/8","8x3/4","8x3/4","8x7/8","8x1","12x1","12x1-1/8","16x1-1/4","20x1-1/4","20x1-3/8","20x1-1/2","20x1-5/8","24x1-5/8","24x1-7/8"],
  "900":["4x3/4","4x3/4","4x7/8","4x7/8","4x1","8x7/8","8x1","8x7/8","8x1-1/8","8x1-1/4","12x1-1/8","12x1-3/8","16x1-3/8","20x1-3/8","20x1-1/2","20x1-5/8","20x1-7/8","20x2","20x2-1/2"],
  "1500":["4x3/4","4x3/4","4x7/8","4x7/8","4x1","8x7/8","8x1","8x1-1/8","8x1-1/4","8x1-1/2","12x1-3/8","12x1-5/8","12x1-7/8","16x2","16x2-1/4","16x2-1/2","16x2-3/4","16x3","16x3-1/2"]
};
// ASME B16.20 うず巻形 [d2 本体内径, d3 本体外径]
const D3_LOW = [31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,263.7,317.5,374.7,406.4,463.6,527.1,577.9,685.8];
const D3_HIGH= [31.8,39.6,47.8,60.5,69.9,85.9,98.6,120.7,149.4,177.8,209.6,257.3,311.2,368.3,400.1,457.2,520.7,571.5,679.5];
const D2_ANSI = {
  "150": [19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,127,155.7,182.6,233.4,287.3,339.9,371.6,422.4,474.7,525.5,628.7],
  "300": [19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,127,155.7,182.6,233.4,287.3,339.9,371.6,422.4,474.7,525.6,628.7],
  "600": [19.1,25.4,31.8,47.8,54.1,69.9,82.6,101.6,120.7,147.6,174.8,225.6,274.6,327.2,362,412.8,469.9,520.7,628.7],
  "900": [19.1,25.4,31.8,39.6,47.8,58.7,69.9,95.3,120.7,147.6,174.8,222.3,276.4,323.9,355.6,412.8,463.6,520.7,628.7],
  "1500":[19.1,25.4,31.8,39.6,47.8,58.7,69.9,92.2,117.6,143,171.5,215.9,266.7,323.9,362,406.4,463.6,514.4,616]
};
const isANSI = s => ["150","300","600","900","1500"].includes(s);
const isJIS = s => ["10K","20K","30K","63K"].includes(s);

/* ================= ガスケット係数 ================= */
const G_DEFAULT = [
  {id:"n1120_15",name:"ニチアス TOMBO No.1120 1.5t",kind:"sheet",m:2.75,y:25.5,sl:19.6,sg:34.3,smax:"",
   ok:{m:false,y:false,sl:false,sg:true,smax:false},memo:"ジョイントシート。m・yはJIS B 8265のジョイントシート値（1.6t）を仮置き"},
  {id:"n1120_30",name:"ニチアス TOMBO No.1120 3.0t",kind:"sheet",m:2.00,y:11.0,sl:19.6,sg:34.3,smax:"",
   ok:{m:false,y:false,sl:false,sg:true,smax:false},memo:"ジョイントシート。m・yはJIS B 8265のジョイントシート値（3.2t）を仮置き"},
  {id:"v6590",name:"バルカー No.6590系 ブラックタイト（590/591/592/596）",kind:"spiral",m:3.0,y:68.9,sl:30,sg:50,smax:"",
   ok:{m:true,y:true,sl:true,sg:true,smax:true},memo:"うず巻形（膨張黒鉛フィラー）"},
  {id:"v8590",name:"バルカー No.8590系 クリーンタイト（590/591/592/596）",kind:"spiral",m:3.0,y:68.9,sl:30,sg:70,smax:"",
   ok:{m:true,y:true,sl:true,sg:true,smax:true},memo:"うず巻形（無機質紙フィラー）"},
  {id:"v7590",name:"バルカー No.7590系 ホワイトタイト（590/591/592/596）",kind:"spiral",m:3.0,y:68.9,sl:30,sg:50,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:true},memo:"うず巻形（PTFEフィラー）。値は他のうず巻形と同じものを仮置き"},
  {id:"v7010",name:"バルカー No.7010",kind:"ptfe",m:2.0,y:19.6,sl:10,sg:15,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:false},memo:"PTFEシート。原則 溝形フランジ用"},
  {id:"v7020",name:"バルカー No.7020 バルカロン",kind:"ptfe",m:2.5,y:24.5,sl:20,sg:24.5,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:false},memo:"充てん材入りPTFEシート"},
  {id:"v7030",name:"バルカー No.7030",kind:"ptfe",m:2.5,y:19.6,sl:15,sg:24.5,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:false},memo:"PTFE包みガスケット"},
  {id:"v7031",name:"バルカー No.7031",kind:"ptfe",m:2.5,y:19.6,sl:15,sg:24.5,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:false},memo:"PTFE包みガスケット"},
  {id:"v7035",name:"バルカー No.7035",kind:"ptfe",m:2.5,y:19.6,sl:15,sg:24.5,smax:"",
   ok:{m:false,y:false,sl:false,sg:false,smax:false},memo:"PTFE包みガスケット"}
];
const LS_KEY = "gasketTorque.gaskets.v1";
let GASKETS = loadG();
function loadG(){
  try{ const s = localStorage.getItem(LS_KEY); if(s){ const a = JSON.parse(s); if(Array.isArray(a)&&a.length) return a; } }catch(e){}
  return JSON.parse(JSON.stringify(G_DEFAULT));
}
function saveG(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(GASKETS)); }catch(e){} }

/* ================= UI ================= */
const $ = id => document.getElementById("gt-"+id);
let fluid = "liq";

function sizeList(std){
  if(isJIS(std)) return Object.keys(FLANGE[std]).map(Number).sort((a,b)=>a-b).map(k=>({v:String(k),t:k+"A"}));
  if(isANSI(std)) return NPS.map(n=>({v:n,t:n+'"（'+n+'B）'}));
  return [];
}
function fillSizes(){
  const std = $("std").value, sel = $("size"), prev = sel.value;
  const list = sizeList(std);
  sel.innerHTML = "";
  if(!list.length){ sel.innerHTML = '<option value="">（手入力）</option>'; sel.disabled = true; return; }
  sel.disabled = false;
  list.forEach(o=>{ const e=document.createElement("option"); e.value=o.v; e.textContent=o.t; sel.appendChild(e); });
  const def = isJIS(std) ? "50" : "2";
  sel.value = list.some(o=>o.v===prev) ? prev : def;
}
function fillBolts(){
  const s = $("bd"); s.innerHTML = "";
  const g1 = document.createElement("optgroup"); g1.label = "メートル";
  const g2 = document.createElement("optgroup"); g2.label = "インチ";
  Object.keys(BOLT).forEach(k=>{ const o=document.createElement("option"); o.value=k; o.textContent=BOLT[k].label; (k.startsWith("M")?g1:g2).appendChild(o); });
  s.appendChild(g1); s.appendChild(g2);
}
function fillGaskets(){
  const s = $("gk"), prev = s.value; s.innerHTML = "";
  GASKETS.forEach(g=>{ const o=document.createElement("option"); o.value=g.id; o.textContent=g.name; s.appendChild(o); });
  if(GASKETS.some(g=>g.id===prev)) s.value = prev;
}
function curG(){ return GASKETS.find(g=>g.id===$("gk").value) || GASKETS[0]; }

function autoFill(){
  const std = $("std").value, size = $("size").value, g = curG();
  let n, bolt, gi, go, note = "";
  if(isJIS(std) && FLANGE[std][size]){
    const [nn, bb, rf] = FLANGE[std][size]; n = nn; bolt = bb;
    if(g.kind==="spiral"){
      const s = SPIRAL_JIS[std][size];
      if(s){ [gi,go] = s; note = `うず巻形の本体寸法 ${gi}〜${go} を接触幅にしています。`; }
      else note = "このサイズのうず巻形寸法はデータなし。手入力してください。";
    } else {
      const id = RING_ID[size], od = RING_OD[std][size];
      if(id && od){
        gi = id; go = rf ? Math.min(od, rf) : od;
        note = rf ? `リングガスケット ${id}×${od}。平面座の径 ${rf} の内側だけが当たるので、接触外径は ${go}。`
                  : `リングガスケット ${id}×${od}（平面座の径が未登録なので外径そのまま）。`;
      }
    }
  } else if(isANSI(std)){
    const i = NPS.indexOf(size);
    const [nn, bb] = ANSI_BOLT[std][i].split("x"); n = Number(nn); bolt = bb + '"';
    if(g.kind==="spiral"){
      gi = D2_ANSI[std][i]; go = (std==="900"||std==="1500") ? D3_HIGH[i] : D3_LOW[i];
      note = `ASME B16.20 うず巻形の本体寸法 ${gi}〜${go} を接触幅にしています。`;
    } else {
      gi = PIPE_OD[i]; go = RF_ANSI[i];
      note = `リングガスケット（内径＝管外径 ${gi}）。当たるのは平面座 φ${go} の内側まで。`;
    }
  }
  if(n){ $("nb").value = n; $("bd").value = bolt; }
  if(gi){ $("gi").value = gi; $("go").value = go; }
  if(std==="manual") note = "ガスケットがフランジに当たる範囲の内径・外径を入れてください。";
  $("dimNote").textContent = note;
  $("stdNote").innerHTML = std==="63K"
    ? '<span class="badge b-warn">要確認</span> 63Kのボルト寸法は一部しか照合できていません。図面・現物と合っているか確認してください。'
    : "規格を選ぶと自動で入ります。違う場合は手で直せばOKです。";
}

function okBadge(flag){ return flag ? '<span class="badge b-ok">確認済</span>' : '<span class="badge b-warn">仮値あり</span>'; }
function showGInfo(){
  const g = curG();
  $("gkInfo").innerHTML = `${g.memo}<br>m=${g.m} / y=${g.y} / σs=${fluid==="liq"?g.sl:g.sg} MPa ${okBadge(Object.values(g.ok).every(Boolean))}`;
}

/* ================= 計算 ================= */
function calc(){
  showGInfo();
  const g = curG();
  const P = num("p"), K = num("k"), n = num("nb");
  const B = BOLT[$("bd").value]; const D = B ? B.d : NaN;
  const gi = num("gi"), go = num("go"), yieldS = Number($("mat").value);
  const alerts = [];
  if(!(P>=0 && K>0 && n>0 && D>0 && go>gi && gi>0)){
    setRes("-","-","-"); $("alerts").innerHTML = '<div class="alert warn">入力を確認してください（Go は Gi より大きく）。</div>';
    $("steps").innerHTML=""; $("stepbar").innerHTML=""; $("detail").innerHTML=""; $("rTnote").textContent=""; return;
  }
  const N = (go - gi)/2, b0 = N/2;
  const b = b0 <= 6.35 ? b0 : 2.52*Math.sqrt(b0);
  const G = b0 <= 6.35 ? (go+gi)/2 : go - 2*b;
  const H = Math.PI/4*G*G*P;
  const Hp = 2*Math.PI*b*G*g.m*P;
  const Wm1 = H + Hp;
  const Wm2 = Math.PI*b*G*g.y;
  const Ag = Math.PI/4*(go*go - gi*gi);
  const ss = Number(fluid==="liq" ? g.sl : g.sg) || 0;
  const Wm3 = Ag*ss;
  const Wm = Math.max(Wm1, Wm2, Wm3);
  const governs = Wm===Wm1 ? "Wm1（使用状態）" : Wm===Wm2 ? "Wm2（初期締付）" : "Wm3（最小締付面圧）";
  const T = W => K*(W/n)*D/1000;
  const Tmin = T(Wm);

  const As = B.As;
  const Fbolt = 0.7*yieldS*As;
  const TboltMax = K*Fbolt*D/1000;
  const smax = Number(g.smax);
  const TgMax = smax>0 ? T(Ag*smax) : Infinity;
  const Tmax = Math.min(TboltMax, TgMax);
  const maxBy = TgMax < TboltMax ? "ガスケット許容面圧" : "ボルト降伏の70%";

  const factor = n >= 12 ? 1.10 : 1.00;
  const step = Tmin*factor >= 200 ? 10 : 5;
  const Tt = Math.ceil(Tmin*factor/step)*step;

  if(Tt > Tmax) alerts.push(`<div class="alert ng">目標トルクが上限 ${fmt(Tmax)} N·m（${maxBy}）を超えています。ボルト材質・ガスケットを見直してください。</div>`);
  else if(Tt > Tmax*0.9) alerts.push(`<div class="alert warn">目標トルクが上限 ${fmt(Tmax)} N·m に近いです。</div>`);
  if(!Object.values(g.ok).every(Boolean)) alerts.push('<div class="alert warn">このガスケットは<b>仮値</b>の係数があります。カタログ値に直してから使ってください。</div>');
  if(g.kind==="spiral") alerts.push('<div class="alert info">うず巻形は外輪にフランジが当たるまでが目安。締め過ぎに注意。</div>');

  setRes(fmt(Tmin), Tt.toLocaleString(),isFinite(Tmax)?fmt(Tmax):"-");
  $("rTnote").textContent = (factor>1 ? `ボルト${n}本（12本以上）なので最小トルクの110%` : `ボルト${n}本・${B.label}`);
  $("rTmaxNote").textContent = maxBy;
  $("alerts").innerHTML = alerts.join("");

  const pct = [10,20,60,100];
  $("stepbar").innerHTML = pct.map(p=>`<span>${p}%<b>${Math.round(Tt*p/100)}</b><i>N·m</i></span>`).join("");
  const std = $("std").value, size = $("size").value;
  let big = false;
  if(isJIS(std)) big = Number(size) >= 250;
  else if(isANSI(std)) big = NPS.indexOf(size) >= NPS.indexOf("10");
  const rounds = big ? 6 : 4;
  const steps = [];
  steps.push(`<b>準備</b>：フランジ面・ガスケットの傷や異物を確認。ねじ部とナット座面に潤滑剤を塗る（K値の前提）。`);
  steps.push(`<b>仮締め</b>：${n<=8 ? "全ボルト" : "対角の数本"}を対角（星形）の順に <b>10%→20%→60%→100%</b> と段階的に締める。毎回フランジのすき間が均等か確認。`);
  steps.push(`<b>本締め</b>：全ボルトを <b>${Tt} N·m</b> で周回締め。<b>${rounds}周</b>が目安（ナットが回らなくなるまで）。`);
  if(g.kind==="sheet") steps.push(`<b>増締め</b>：4時間以上たってから同じトルクで1〜2周。<span style="color:var(--ng);font-weight:700">ゴム入りジョイントシートは、昇温後は硬くなるので増締めしない。</span>`);
  else if(g.kind==="ptfe") steps.push(`<b>増締め</b>：PTFE系はへたり（クリープ）が大きいので、4時間以上たってから同じトルクで1〜2周を推奨。`);
  else steps.push(`<b>増締め</b>：必要に応じて4時間以上たってから同じトルクで1〜2周。`);
  $("steps").innerHTML = steps.map(s=>`<li>${s}</li>`).join("");

  const rows = [
    ["接触幅 N",fmt1(N),"mm"],["基本幅 b0 = N/2",fmt1(b0),"mm"],["有効幅 b",fmt1(b),"mm"],["有効径 G",fmt1(G),"mm"],
    ["接触面積 Ag",fmt(Ag),"mm²"],
    ["H = π/4·G²·P",kN(H),"kN"],["Hp = 2π·b·G·m·P",kN(Hp),"kN"],
    ["Wm1 = H + Hp",kN(Wm1),"kN"],["Wm2 = π·b·G·y",kN(Wm2),"kN"],["Wm3 = Ag·σs",kN(Wm3),"kN"],
    ["決まる荷重", governs, ""],["1本あたり Wm/n",kN(Wm/n),"kN"],
    ["ボルト径 D",fmt1(D),"mm"],["Tmin = K·(Wm/n)·D/1000",fmt1(Tmin),"N·m"],
    ["ボルト有効断面積 As",fmt1(As),"mm²"],["ボルト上限 0.7·σy·As",kN(Fbolt),"kN"],
    ["目標時のボルト応力",fmt1((Tt*1000/(K*D))/As),"MPa"]
  ];
  $("detail").innerHTML = rows.map(r=>`<tr><td>${r[0]}</td><td class="r">${r[1]}</td><td>${r[2]}</td></tr>`).join("");
}
function num(id){ return parseFloat($(id).value); }
function fmt(v){ return isFinite(v) ? Math.round(v).toLocaleString() : "-"; }
function fmt1(v){ return isFinite(v) ? (Math.round(v*10)/10).toLocaleString() : "-"; }
function kN(v){ return (Math.round(v/100)/10).toLocaleString(); }
function setRes(a,b,c){ $("rTmin").textContent=a; $("rT").textContent=b; $("rTmax").textContent=c; }

/* ================= 係数表 ================= */
function drawGTable(){
  const f = ["m","y","sl","sg","smax"];
  const head = '<tr><th>品番</th><th>m</th><th>y</th><th>σs液体</th><th>σsガス</th><th>σmax</th></tr>';
  $("gtable").innerHTML = head + GASKETS.map((g,i)=>`<tr><td style="min-width:150px;font-size:13px">${g.name}</td>`+
    f.map(k=>`<td><input data-i="${i}" data-k="${k}" type="number" step="0.01" value="${g[k]}" style="width:64px;${g.ok[k]?'':'background:var(--warnbg)'}"></td>`).join("")+"</tr>").join("");
}
function msg(t){ $("gmsg").textContent = t; setTimeout(()=>{$("gmsg").textContent="";},3000); }
$("saveG").onclick = ()=>{
  document.querySelectorAll("#gt-gtable input").forEach(inp=>{
    const g = GASKETS[inp.dataset.i], k = inp.dataset.k;
    const v = inp.value==="" ? "" : Number(inp.value);
    if(String(g[k])!==String(v)){ g[k]=v; g.ok[k]=true; }
  });
  saveG(); drawGTable(); calc(); msg("保存しました（変更した値は確認済になります）");
};
let resetArmed = false;
$("resetG").onclick = ()=>{
  if(!resetArmed){ resetArmed = true; $("resetG").textContent = "もう一度押すと初期値にもどります"; setTimeout(()=>{resetArmed=false;$("resetG").textContent="初期値にもどす";},4000); return; }
  resetArmed = false; $("resetG").textContent = "初期値にもどす";
  try{ localStorage.removeItem(LS_KEY); }catch(e){}
  GASKETS = JSON.parse(JSON.stringify(G_DEFAULT)); fillGaskets(); drawGTable(); autoFill(); calc(); msg("初期値にもどしました");
};

/* ================= イベント ================= */
$("std").onchange = ()=>{ fillSizes(); autoFill(); calc(); };
$("size").onchange = ()=>{ autoFill(); calc(); };
$("gk").onchange = ()=>{ autoFill(); calc(); };
["nb","bd","gi","go","p","k","mat"].forEach(id=>{ $(id).addEventListener("input", calc); $(id).addEventListener("change", calc); });
document.querySelectorAll("#gt-fluid button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#gt-fluid button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); fluid=b.dataset.v; calc();
});

fillBolts(); fillSizes(); fillGaskets(); drawGTable(); autoFill(); calc();
})();
