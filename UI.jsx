import { pctColor, pctLabel, fmtNum } from "../data";

const PURPLE = "#5b2d8e";
const PINK   = "#e6007e";

export function StatCard({ label, value, sub, accent }) {
  const colors = {
    purple: { bg:"#f3e8ff", text:PURPLE,    sub:"#a855f7" },
    pink:   { bg:"#fce7f3", text:PINK,      sub:"#f472b6" },
    green:  { bg:"#dcfce7", text:"#15803d", sub:"#4ade80" },
    blue:   { bg:"#dbeafe", text:"#1d4ed8", sub:"#60a5fa" },
    amber:  { bg:"#fef3c7", text:"#b45309", sub:"#fbbf24" },
    red:    { bg:"#fee2e2", text:"#dc2626", sub:"#fca5a5" },
  };
  const c = colors[accent] || colors.purple;
  return (
    <div style={{
      background:"#fff", borderRadius:14, padding:"16px 18px",
      border:"1px solid #e9eaf0", flex:1, minWidth:140,
      borderTop:`3px solid ${c.text}`
    }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", letterSpacing:".06em",
        textTransform:"uppercase", marginBottom:8 }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:700, color:c.text, letterSpacing:"-.5px" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#6b7280", marginTop:3 }}>{sub}</div>}
    </div>
  );
}

export function PageHeader({ title, sub, extra }) {
  return (
    <div style={{
      background:`linear-gradient(135deg,${PURPLE},#7c3aed)`,
      padding:"22px 28px", display:"flex", alignItems:"center",
      justifyContent:"space-between", flexWrap:"wrap", gap:12
    }}>
      <div>
        <h1 style={{ fontSize:20, fontWeight:700, color:"#fff", margin:0, letterSpacing:"-.3px" }}>{title}</h1>
        {sub && <p style={{ fontSize:12, color:"rgba(255,255,255,.6)", margin:"3px 0 0" }}>{sub}</p>}
      </div>
      {extra && <div>{extra}</div>}
    </div>
  );
}

export function PctBadge({ value }) {
  const c = pctColor(value);
  return (
    <span style={{
      fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:20,
      background:c.bg, color:c.color, display:"inline-block", whiteSpace:"nowrap"
    }}>
      {pctLabel(value)}
    </span>
  );
}

export function TrendCell({ curr, prev, pct, format }) {
  const fmt = format || (v => fmtNum(v, 0));
  const c   = pctColor(pct);
  return (
    <div style={{ lineHeight:1.4 }}>
      <div style={{ fontWeight:700, color:"#111827", fontSize:13 }}>{fmt(curr)}</div>
      <div style={{ fontSize:10, color:"#9ca3af" }}>prev: {fmt(prev)}</div>
      <div style={{ marginTop:2 }}><PctBadge value={pct}/></div>
    </div>
  );
}

export function Avatar({ name }) {
  const colors = [
    ["#e0e7ff","#4338ca"],["#d1fae5","#065f46"],["#fce7f3","#9d174d"],
    ["#fef3c7","#92400e"],["#f3e8ff","#6b21a8"],["#dbeafe","#1e40af"]
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const [bg, fg] = colors[idx];
  const initials = name ? name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase() : "?";
  return (
    <div style={{
      width:30, height:30, borderRadius:"50%", background:bg, color:fg,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:10, fontWeight:700, flexShrink:0
    }}>{initials}</div>
  );
}

export function RetentionBar({ value }) {
  const pct = Math.min((value||0)*100, 100);
  const color = pct >= 65 ? "#22c55e" : pct >= 55 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:120 }}>
      <div style={{ flex:1, height:6, background:"#f3f4f6", borderRadius:3, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", borderRadius:3, background:color, transition:"width .4s" }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:700, color, minWidth:38 }}>{pct.toFixed(1)}%</span>
    </div>
  );
}

// Generic scrollable data table
export function DataTable({ cols, rows, emptyMsg="No data" }) {
  if (!rows || !rows.length) return (
    <div style={{ textAlign:"center", padding:48, color:"#9ca3af", fontSize:14 }}>{emptyMsg}</div>
  );
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ background:"#faf8ff", borderBottom:"2px solid #ede9f8" }}>
            {cols.map(c => (
              <th key={c.key} style={{
                padding:"9px 12px", textAlign: c.align||"left",
                fontWeight:600, fontSize:10, color:PURPLE,
                textTransform:"uppercase", letterSpacing:".05em",
                whiteSpace:"nowrap", position:"sticky", top:0, background:"#faf8ff"
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i) => (
            <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}
              onMouseEnter={e => e.currentTarget.style.background="#faf5ff"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              {cols.map(c => (
                <td key={c.key} style={{
                  padding:"9px 12px", textAlign: c.align||"left",
                  color: c.muted ? "#6b7280" : "#111827",
                  fontWeight: c.bold ? 700 : 400, whiteSpace:"nowrap"
                }}>
                  {c.render ? c.render(row) : (row[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Reusable filter bar
export function FilterBar({ markets, market, setMarket, dms, dm, setDm, search, setSearch }) {
  const sel = {
    padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,.2)",
    fontSize:12, color:"#fff", background:"rgba(255,255,255,.12)", cursor:"pointer"
  };
  return (
    <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
      {markets && (
        <select value={market} onChange={e => setMarket(e.target.value)} style={sel}>
          <option value="all">All Markets</option>
          {markets.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      )}
      {dms && (
        <select value={dm} onChange={e => setDm(e.target.value)} style={sel}>
          <option value="all">All DMs</option>
          {dms.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      )}
      {setSearch && (
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search…"
          style={{
            padding:"7px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,.2)",
            fontSize:12, color:"#fff", background:"rgba(255,255,255,.12)",
            outline:"none", width:160, "::placeholder":{ color:"rgba(255,255,255,.4)" }
          }}/>
      )}
    </div>
  );
}

// Compact metric group header
export function MetricGroupHeader({ metrics }) {
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", padding:"12px 18px 0" }}>
      {metrics.map(m => (
        <div key={m.label} style={{
          background:"#f3e8ff", borderRadius:8, padding:"5px 12px",
          fontSize:11, fontWeight:600, color:PURPLE, border:"1px solid #e9d5ff"
        }}>{m.label}: <span style={{ color: m.up ? "#15803d":"#dc2626" }}>{m.val}</span></div>
      ))}
    </div>
  );
}

// Legacy compat
export function Table({ cols, rows, emptyMsg }) { return <DataTable cols={cols} rows={rows} emptyMsg={emptyMsg}/>; }
export function Badge() { return null; }
export function ProgressBar() { return null; }
export function CommBar() { return null; }
