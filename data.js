// ── CREDENTIALS ─────────────────────────────────────────────
export const CREDENTIALS = {
  admin:   { password:"admin123", market:null,       role:"admin",  label:"Admin" },
  arizona: { password:"arz2024",  market:"ARIZONA",  role:"market", label:"Arizona" },
  dallas:  { password:"dal2024",  market:"DALLAS",   role:"market", label:"Dallas" },
  houston: { password:"hou2024",  market:"HOUSTON",  role:"market", label:"Houston" },
};

// ── MOM DEMO DATA ────────────────────────────────────────────
export const DEMO_MOM_STORE = [
  { doorCode:"70849455", market:"ARIZONA", district:"-", dm:"ALI KHAN", mm:"ALI KHAN", storeName:"1255 W MAIN STREET",
    ppd_curr:385.56, ppd_mtd:199, ppd_prev:371, ppd_pct:0.039,
    acc_curr:34921.95, acc_mtd:18024.23, acc_prev:26592.90, acc_pct:-0.322,
    apo_curr:90.57, apo_prev:71.68, apo_pct:0.264,
    voice_curr:317.75, voice_mtd:164, voice_prev:217, voice_pct:0.464,
    bts_curr:52.31, bts_mtd:27, bts_prev:84, bts_pct:-0.377,
    hint_curr:21.31, hint_mtd:11, hint_prev:18, hint_pct:0.184,
    upgrades_curr:31, upgrades_mtd:16, upgrades_prev:15, upgrades_pct:0.067,
    ret_curr:0.577, ret_prev:0.602, ret_pct:-0.043 },
  { doorCode:"70849456", market:"ARIZONA", district:"-", dm:"ALI KHAN", mm:"ALI KHAN", storeName:"2100 N CENTRAL AVE",
    ppd_curr:420.10, ppd_mtd:210, ppd_prev:390, ppd_pct:0.077,
    acc_curr:31000.00, acc_mtd:15500, acc_prev:28000, acc_pct:0.107,
    apo_curr:80.0, apo_prev:75.0, apo_pct:0.067,
    voice_curr:290, voice_mtd:145, voice_prev:260, voice_pct:0.115,
    bts_curr:60, bts_mtd:30, bts_prev:70, bts_pct:-0.143,
    hint_curr:15, hint_mtd:7, hint_prev:20, hint_pct:-0.25,
    upgrades_curr:22, upgrades_mtd:11, upgrades_prev:18, upgrades_pct:0.222,
    ret_curr:0.611, ret_prev:0.589, ret_pct:0.037 },
  { doorCode:"70849457", market:"DALLAS", district:"-", dm:"SALIM THANAWALA", mm:"SALIM THANAWALA", storeName:"500 COMMERCE ST",
    ppd_curr:500.00, ppd_mtd:250, ppd_prev:480, ppd_pct:0.042,
    acc_curr:42000, acc_mtd:21000, acc_prev:38000, acc_pct:0.105,
    apo_curr:95.0, apo_prev:88.0, apo_pct:0.08,
    voice_curr:340, voice_mtd:170, voice_prev:310, voice_pct:0.097,
    bts_curr:75, bts_mtd:37, bts_prev:80, bts_pct:-0.063,
    hint_curr:25, hint_mtd:12, hint_prev:22, hint_pct:0.136,
    upgrades_curr:40, upgrades_mtd:20, upgrades_prev:35, upgrades_pct:0.143,
    ret_curr:0.63, ret_prev:0.61, ret_pct:0.033 },
  { doorCode:"70849458", market:"HOUSTON", district:"-", dm:"SUBHAN ANSARI", mm:"SUBHAN ANSARI", storeName:"1200 MAIN ST",
    ppd_curr:310, ppd_mtd:155, ppd_prev:330, ppd_pct:-0.061,
    acc_curr:28000, acc_mtd:14000, acc_prev:31000, acc_pct:-0.097,
    apo_curr:72.0, apo_prev:78.0, apo_pct:-0.077,
    voice_curr:200, voice_mtd:100, voice_prev:220, voice_pct:-0.091,
    bts_curr:45, bts_mtd:22, bts_prev:50, bts_pct:-0.1,
    hint_curr:18, hint_mtd:9, hint_prev:20, hint_pct:-0.1,
    upgrades_curr:28, upgrades_mtd:14, upgrades_prev:32, upgrades_pct:-0.125,
    ret_curr:0.55, ret_prev:0.58, ret_pct:-0.052 },
];

export const DEMO_WOW_STORE = [
  { doorCode:"70849455", market:"ARIZONA", district:"-", dm:"ALI KHAN", mm:"ALI KHAN", storeName:"1255 W MAIN STREET",
    ppd_curr:54, ppd_prev:93, ppd_pct:-0.419,
    acc_curr:6654.85, acc_prev:8523.68, acc_pct:-0.219,
    voice_curr:34, voice_prev:65, voice_pct:-0.477,
    bts_curr:9, bts_prev:13, bts_pct:-0.308,
    hint_curr:1, hint_prev:8, hint_pct:-0.875,
    upgrades_curr:7, upgrades_prev:4, upgrades_pct:0.75,
    ret_curr:0.667, ret_prev:0.633, ret_pct:0.053 },
  { doorCode:"70849456", market:"ARIZONA", district:"-", dm:"ALI KHAN", mm:"ALI KHAN", storeName:"2100 N CENTRAL AVE",
    ppd_curr:68, ppd_prev:78, ppd_pct:-0.128,
    acc_curr:7200, acc_prev:8100, acc_pct:-0.111,
    voice_curr:40, voice_prev:55, voice_pct:-0.273,
    bts_curr:12, bts_prev:15, bts_pct:-0.2,
    hint_curr:3, hint_prev:6, hint_pct:-0.5,
    upgrades_curr:9, upgrades_prev:6, upgrades_pct:0.5,
    ret_curr:0.62, ret_prev:0.59, ret_pct:0.05 },
  { doorCode:"70849457", market:"DALLAS", district:"-", dm:"SALIM THANAWALA", mm:"SALIM THANAWALA", storeName:"500 COMMERCE ST",
    ppd_curr:82, ppd_prev:90, ppd_pct:-0.089,
    acc_curr:9100, acc_prev:9800, acc_pct:-0.071,
    voice_curr:55, voice_prev:62, voice_pct:-0.113,
    bts_curr:18, bts_prev:20, bts_pct:-0.1,
    hint_curr:5, hint_prev:7, hint_pct:-0.286,
    upgrades_curr:12, upgrades_prev:10, upgrades_pct:0.2,
    ret_curr:0.65, ret_prev:0.63, ret_pct:0.032 },
  { doorCode:"70849458", market:"HOUSTON", district:"-", dm:"SUBHAN ANSARI", mm:"SUBHAN ANSARI", storeName:"1200 MAIN ST",
    ppd_curr:50, ppd_prev:70, ppd_pct:-0.286,
    acc_curr:5500, acc_prev:7200, acc_pct:-0.236,
    voice_curr:30, voice_prev:45, voice_pct:-0.333,
    bts_curr:8, bts_prev:12, bts_pct:-0.333,
    hint_curr:2, hint_prev:5, hint_pct:-0.6,
    upgrades_curr:6, upgrades_prev:8, upgrades_pct:-0.25,
    ret_curr:0.54, ret_prev:0.57, ret_pct:-0.053 },
];

// ── PARSERS ───────────────────────────────────────────────────
// MOM Store sheet: row 0 = merged title, row 1 = real headers
// Cols: 0=DOOR CODE,1=MARKET,2=MARKET2,3=DISTRICT,4=DM,5=MM,6=STORE NAME
//   PPD: 7=curr_trend,8=curr_mtd,9=prev,10=%
//   ACC: 11=curr_trend,12=curr_mtd,13=prev,14=%
//   APO: 15=curr,16=prev,17=%
//   VOICE: 18=curr_trend,19=curr_mtd,20=prev,21=%
//   BTS: 22=curr_trend,23=curr_mtd,24=prev,25=%
//   HINT: 26=curr_trend,27=curr_mtd,28=prev,29=%
//   UPGRADES: 30=curr_trend,31=curr_mtd,32=prev,33=%
//   RETENTION: 34=curr,35=prev,36=%,37=running
export function parseMomStoreRow(r) {
  return {
    doorCode: r[0] ?? "", market: r[1] ?? "", district: r[3] ?? "",
    dm: r[4] ?? "", mm: r[5] ?? "", storeName: r[6] ?? "",
    ppd_curr: +r[7]||0, ppd_mtd: +r[8]||0, ppd_prev: +r[9]||0, ppd_pct: +r[10]||0,
    acc_curr: +r[11]||0, acc_mtd: +r[12]||0, acc_prev: +r[13]||0, acc_pct: +r[14]||0,
    apo_curr: +r[15]||0, apo_prev: +r[16]||0, apo_pct: +r[17]||0,
    voice_curr: +r[18]||0, voice_mtd: +r[19]||0, voice_prev: +r[20]||0, voice_pct: +r[21]||0,
    bts_curr: +r[22]||0, bts_mtd: +r[23]||0, bts_prev: +r[24]||0, bts_pct: +r[25]||0,
    hint_curr: +r[26]||0, hint_mtd: +r[27]||0, hint_prev: +r[28]||0, hint_pct: +r[29]||0,
    upgrades_curr: +r[30]||0, upgrades_mtd: +r[31]||0, upgrades_prev: +r[32]||0, upgrades_pct: +r[33]||0,
    ret_curr: +r[34]||0, ret_prev: +r[35]||0, ret_pct: +r[36]||0,
  };
}

// MOM Market/District: row 0=title row, row 1=real headers
// Market: 0=MARKET,1=DM — then same metric pattern offset by -5
export function parseMomMarketRow(r) {
  return {
    market: r[0] ?? "", dm: r[1] ?? "",
    ppd_curr: +r[2]||0, ppd_mtd: +r[3]||0, ppd_prev: +r[4]||0, ppd_pct: +r[5]||0,
    acc_curr: +r[6]||0, acc_mtd: +r[7]||0, acc_prev: +r[8]||0, acc_pct: +r[9]||0,
    apo_curr: +r[10]||0, apo_prev: +r[11]||0, apo_pct: +r[12]||0,
    voice_curr: +r[13]||0, voice_mtd: +r[14]||0, voice_prev: +r[15]||0, voice_pct: +r[16]||0,
    bts_curr: +r[17]||0, bts_mtd: +r[18]||0, bts_prev: +r[19]||0, bts_pct: +r[20]||0,
    hint_curr: +r[21]||0, hint_mtd: +r[22]||0, hint_prev: +r[23]||0, hint_pct: +r[24]||0,
    upgrades_curr: +r[25]||0, upgrades_mtd: +r[26]||0, upgrades_prev: +r[27]||0, upgrades_pct: +r[28]||0,
    ret_curr: +r[29]||0, ret_prev: +r[30]||0, ret_pct: +r[31]||0,
  };
}

// MOM District: 0=MARKET,1=MM,2=DM
export function parseMomDistrictRow(r) {
  return {
    market: r[0]??"", mm: r[1]??"", dm: r[2]??"",
    ppd_curr: +r[3]||0, ppd_mtd: +r[4]||0, ppd_prev: +r[5]||0, ppd_pct: +r[6]||0,
    acc_curr: +r[7]||0, acc_mtd: +r[8]||0, acc_prev: +r[9]||0, acc_pct: +r[10]||0,
    apo_curr: +r[11]||0, apo_prev: +r[12]||0, apo_pct: +r[13]||0,
    voice_curr: +r[14]||0, voice_mtd: +r[15]||0, voice_prev: +r[16]||0, voice_pct: +r[17]||0,
    bts_curr: +r[18]||0, bts_mtd: +r[19]||0, bts_prev: +r[20]||0, bts_pct: +r[21]||0,
    hint_curr: +r[22]||0, hint_mtd: +r[23]||0, hint_prev: +r[24]||0, hint_pct: +r[25]||0,
    upgrades_curr: +r[26]||0, upgrades_mtd: +r[27]||0, upgrades_prev: +r[28]||0, upgrades_pct: +r[29]||0,
    ret_curr: +r[30]||0, ret_prev: +r[31]||0, ret_pct: +r[32]||0,
  };
}

// WOW Store: row 0=title, row 1=headers
// Cols: 0=DOOR CODE,1=MARKET,2=MARKET2,3=DISTRICT,4=DM,5=MM,6=STORE NAME
//   PPD: 7=curr,8=prev,9=%
//   ACC: 10=curr,11=prev,12=%
//   VOICE: 13=curr,14=prev,15=%
//   BTS: 16=curr,17=prev,18=%
//   HINT: 19=curr,20=prev,21=%
//   UPGRADES: 22=curr,23=prev,24=%
//   RETENTION: 25=curr,26=prev,27=%,28=running
export function parseWowStoreRow(r) {
  return {
    doorCode: r[0]??"", market: r[1]??"", district: r[3]??"",
    dm: r[4]??"", mm: r[5]??"", storeName: r[6]??"",
    ppd_curr: +r[7]||0, ppd_prev: +r[8]||0, ppd_pct: +r[9]||0,
    acc_curr: +r[10]||0, acc_prev: +r[11]||0, acc_pct: +r[12]||0,
    voice_curr: +r[13]||0, voice_prev: +r[14]||0, voice_pct: +r[15]||0,
    bts_curr: +r[16]||0, bts_prev: +r[17]||0, bts_pct: +r[18]||0,
    hint_curr: +r[19]||0, hint_prev: +r[20]||0, hint_pct: +r[21]||0,
    upgrades_curr: +r[22]||0, upgrades_prev: +r[23]||0, upgrades_pct: +r[24]||0,
    ret_curr: +r[25]||0, ret_prev: +r[26]||0, ret_pct: +r[27]||0,
  };
}

// WOW Market: 0=MARKET,1=DM
export function parseWowMarketRow(r) {
  return {
    market: r[0]??"", dm: r[1]??"",
    ppd_curr: +r[2]||0, ppd_prev: +r[3]||0, ppd_pct: +r[4]||0,
    acc_curr: +r[5]||0, acc_prev: +r[6]||0, acc_pct: +r[7]||0,
    voice_curr: +r[8]||0, voice_prev: +r[9]||0, voice_pct: +r[10]||0,
    bts_curr: +r[11]||0, bts_prev: +r[12]||0, bts_pct: +r[13]||0,
    hint_curr: +r[14]||0, hint_prev: +r[15]||0, hint_pct: +r[16]||0,
    upgrades_curr: +r[17]||0, upgrades_prev: +r[18]||0, upgrades_pct: +r[19]||0,
    ret_curr: +r[20]||0, ret_prev: +r[21]||0, ret_pct: +r[22]||0,
  };
}

// WOW District: 0=MARKET,1=MM,2=DM
export function parseWowDistrictRow(r) {
  return {
    market: r[0]??"", mm: r[1]??"", dm: r[2]??"",
    ppd_curr: +r[3]||0, ppd_prev: +r[4]||0, ppd_pct: +r[5]||0,
    acc_curr: +r[6]||0, acc_prev: +r[7]||0, acc_pct: +r[8]||0,
    voice_curr: +r[9]||0, voice_prev: +r[10]||0, voice_pct: +r[11]||0,
    bts_curr: +r[12]||0, bts_prev: +r[13]||0, bts_pct: +r[14]||0,
    hint_curr: +r[15]||0, hint_prev: +r[16]||0, hint_pct: +r[17]||0,
    upgrades_curr: +r[18]||0, upgrades_prev: +r[19]||0, upgrades_pct: +r[20]||0,
    ret_curr: +r[21]||0, ret_prev: +r[22]||0, ret_pct: +r[23]||0,
  };
}

// ── HELPERS ───────────────────────────────────────────────────
export function pctColor(v) {
  if (v > 0.005) return { bg:"#dcfce7", color:"#15803d" };
  if (v < -0.005) return { bg:"#fee2e2", color:"#dc2626" };
  return { bg:"#f3f4f6", color:"#6b7280" };
}

export function pctLabel(v) {
  const n = (Number(v)||0) * 100;
  const sign = n > 0 ? "+" : "";
  return sign + n.toFixed(1) + "%";
}

export function fmtNum(v, decimals=0) {
  const n = Number(v)||0;
  return n.toLocaleString("en-US", { minimumFractionDigits:decimals, maximumFractionDigits:decimals });
}

export function fmtDollar(v) {
  const n = Number(v)||0;
  if (n >= 1000000) return "$" + (n/1000000).toFixed(1) + "M";
  if (n >= 1000)    return "$" + (n/1000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}

export function fmtRetention(v) {
  return ((Number(v)||0)*100).toFixed(1) + "%";
}

// Column definitions for COLUMN_MAP (legacy compat)
export const COLUMN_MAP = {};
export function parseExcelRow(r, h) { return r; }
export function statusOf(v) { return { label:"—", cls:"miss" }; }
export function pct(a,b) { return b ? Math.round(a/b*100) : 0; }
export function fmt(n) { return fmtNum(n); }
