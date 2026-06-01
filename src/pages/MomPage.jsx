import { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend
} from "recharts";
import { fmtNum, fmtDollar, fmtRetention } from "../data";
import { StatCard, PageHeader, PctBadge, RetentionBar } from "../components/UI";

const PURPLE = "#5b2d8e";
const PINK   = "#e6007e";
const COLORS = [PURPLE,"#7c3aed","#9333ea","#a855f7","#c026d3",PINK,"#db2777","#be185d","#065f46","#0e7490"];

function CustomTrendCell({ curr, prev, mtd, pct, format = fmtNum }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
      <div style={{ fontWeight:600, color:"#111827", fontSize:13 }}>{format(curr)}</div>
      <div style={{ fontSize:11, color:"#6b7280", fontWeight:400 }}>
        <span>PREV: {format(prev)}</span>
        {mtd !== undefined && mtd !== null && <span> | MTD: {format(mtd)}</span>}
      </div>
      <div style={{ marginTop:1 }}><PctBadge value={pct}/></div>
    </div>
  );
}

function MultiSelect({ options, selected, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  function toggle(val) {
    onChange(selected.includes(val) ? selected.filter(v=>v!==val) : [...selected, val]);
  }
  const label = selected.length===0 ? placeholder : selected.length===1 ? selected[0] : `${selected.length} selected`;
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={() => setOpen(o=>!o)} style={{
        padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,.2)",
        fontSize:12, color:"#fff", background:"rgba(255,255,255,.12)", cursor:"pointer",
        minWidth:140, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
      }}>
        <span>{label}</span><span style={{fontSize:9}}>▼</span>
      </button>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 4px)", left:0, zIndex:999,
          background:"#fff", borderRadius:10, boxShadow:"0 8px 24px rgba(0,0,0,.15)",
          border:"1px solid #e5e7eb", minWidth:180, maxHeight:260, overflowY:"auto", padding:"6px 0",
        }}>
          {selected.length > 0 && (
            <div onClick={() => onChange([])} style={{
              padding:"7px 14px", fontSize:11, color:PINK, cursor:"pointer",
              fontWeight:600, borderBottom:"1px solid #f3f4f6",
            }}>✕ Clear all</div>
          )}
          {options.map(opt => (
            <div key={opt} onClick={() => toggle(opt)} style={{
              padding:"8px 14px", fontSize:12, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
              background: selected.includes(opt) ? "#f3e8ff" : "transparent",
              color: selected.includes(opt) ? PURPLE : "#374151",
              fontWeight: selected.includes(opt) ? 600 : 400,
            }}>
              <span style={{
                width:14, height:14, borderRadius:4,
                border:`2px solid ${selected.includes(opt) ? PURPLE : "#d1d5db"}`,
                background: selected.includes(opt) ? PURPLE : "transparent",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontSize:9, color:"#fff", flexShrink:0,
              }}>{selected.includes(opt) ? "✓" : ""}</span>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SortableTable({ cols, rows, emptyMsg }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  function handleSort(key) {
    if (sortKey !== key) { setSortKey(key); setSortDir("desc"); }
    else if (sortDir === "desc") setSortDir("asc");
    else { setSortKey(null); setSortDir(null); }
  }
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return rows;
    return [...rows].sort((a, b) => {
      let av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "desc" ? 1 : -1;
      if (av > bv) return sortDir === "desc" ? -1 : 1;
      return 0;
    });
  }, [rows, sortKey, sortDir]);
  function arrow(key) {
    if (sortKey !== key) return <span style={{color:"#d1d5db",marginLeft:3}}>⇅</span>;
    return <span style={{color:PURPLE,marginLeft:3}}>{sortDir==="desc"?"↓":"↑"}</span>;
  }
  if (!rows.length) return <div style={{padding:"40px",textAlign:"center",color:"#9ca3af",fontSize:13}}>{emptyMsg}</div>;
  return (
    <div style={{ overflowX:"auto", maxWidth:"100%" }}>
      <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:0, fontSize:12 }}>
        <thead>
          <tr style={{ background:"#fafafa" }}>
            {cols.map(c => (
              <th key={c.key} onClick={() => handleSort(c.sortKey||c.key)} style={{
                padding:"12px 12px", textAlign:"left", fontWeight:700, color:PURPLE,
                fontSize:11, letterSpacing:.5, textTransform:"uppercase",
                cursor:"pointer", userSelect:"none", whiteSpace:"nowrap",
                borderBottom:"2px solid #f3f4f6", background:"#fafafa",
                zIndex: c.sticky ? 20 : 1,
                ...(c.sticky && { position:"sticky", left:c.leftOffset||0, boxShadow: c.lastSticky ? "4px 0 8px -4px rgba(0,0,0,0.12)" : "none" })
              }}>
                {c.label}{arrow(c.sortKey||c.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const rowBg = i%2===0 ? "#fff" : "#fdfcff";
            return (
              <tr key={i} style={{ background:rowBg }}>
                {cols.map(c => (
                  <td key={c.key} style={{
                    padding:"14px 12px", whiteSpace:"nowrap", verticalAlign:"top",
                    color: c.muted?"#9ca3af":c.bold?"#111827":"#374151",
                    fontWeight: c.bold?600:400,
                    borderBottom:"1px solid #f9fafb",
                    background: c.sticky ? rowBg : "transparent",
                    zIndex: c.sticky ? 10 : 1,
                    ...(c.sticky && { position:"sticky", left:c.leftOffset||0, boxShadow: c.lastSticky ? "4px 0 8px -4px rgba(0,0,0,0.12)" : "none" })
                  }}>
                    {c.render ? c.render(row) : row[c.key] ?? "—"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// APO format: $122.1
const fmtApo = v => `$${(+v||0).toFixed(1)}`;

function momStoreCols() {
  return [
    { key:"doorCode",  sortKey:"doorCode",     label:"Door",        muted:true, sticky:true, leftOffset:0 },
    { key:"market",    sortKey:"market",        label:"Market",      muted:true, sticky:true, leftOffset:80 },
    { key:"storeName", sortKey:"storeName",     label:"Store",       bold:true,  sticky:true, leftOffset:170 },
    { key:"dm",        sortKey:"dm",            label:"DM",          muted:true, sticky:true, leftOffset:330, lastSticky:true },
    { key:"ppd",       sortKey:"ppd_curr",      label:"PPD",         render:r=><CustomTrendCell curr={r.ppd_curr} prev={r.ppd_prev} mtd={r.ppd_mtd} pct={r.ppd_pct}/> },
    { key:"acc",       sortKey:"acc_curr",      label:"Accessories", render:r=><CustomTrendCell curr={r.acc_curr} prev={r.acc_prev} mtd={r.acc_mtd} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"apo",       sortKey:"apo_curr",      label:"APO",         render:r=><CustomTrendCell curr={r.apo_curr} prev={r.apo_prev} pct={r.apo_pct} format={fmtApo}/> },
    { key:"voice",     sortKey:"voice_curr",    label:"Voice",       render:r=><CustomTrendCell curr={r.voice_curr} prev={r.voice_prev} mtd={r.voice_mtd} pct={r.voice_pct}/> },
    { key:"bts",       sortKey:"bts_curr",      label:"BTS",         render:r=><CustomTrendCell curr={r.bts_curr} prev={r.bts_prev} mtd={r.bts_mtd} pct={r.bts_pct}/> },
    { key:"hint",      sortKey:"hint_curr",     label:"Hint",        render:r=><CustomTrendCell curr={r.hint_curr} prev={r.hint_prev} mtd={r.hint_mtd} pct={r.hint_pct}/> },
    { key:"upgrades",  sortKey:"upgrades_curr", label:"Upgrades",    render:r=><CustomTrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} mtd={r.upgrades_mtd} pct={r.upgrades_pct}/> },
    { key:"retention", sortKey:"ret_curr",      label:"Retention",   render:r=>(
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        <RetentionBar value={r.ret_curr}/>
        <div style={{ fontSize:11, color:"#6b7280" }}>prev: {fmtRetention(r.ret_prev)}</div>
        <div style={{ marginTop:1 }}><PctBadge value={r.ret_pct}/></div>
      </div>
    )},
  ];
}

function momMarketCols() {
  return [
    { key:"market",    sortKey:"market",        label:"Market",      bold:true,  sticky:true, leftOffset:0 },
    { key:"ppd",       sortKey:"ppd_curr",      label:"PPD",         render:r=><CustomTrendCell curr={r.ppd_curr} prev={r.ppd_prev} mtd={r.ppd_mtd} pct={r.ppd_pct}/> },
    { key:"acc",       sortKey:"acc_curr",      label:"Accessories", render:r=><CustomTrendCell curr={r.acc_curr} prev={r.acc_prev} mtd={r.acc_mtd} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"apo",       sortKey:"apo_curr",      label:"APO",         render:r=><CustomTrendCell curr={r.apo_curr} prev={r.apo_prev} pct={r.apo_pct} format={fmtApo}/> },
    { key:"voice",     sortKey:"voice_curr",    label:"Voice",       render:r=><CustomTrendCell curr={r.voice_curr} prev={r.voice_prev} mtd={r.voice_mtd} pct={r.voice_pct}/> },
    { key:"bts",       sortKey:"bts_curr",      label:"BTS",         render:r=><CustomTrendCell curr={r.bts_curr} prev={r.bts_prev} mtd={r.bts_mtd} pct={r.bts_pct}/> },
    { key:"hint",      sortKey:"hint_curr",     label:"Hint",        render:r=><CustomTrendCell curr={r.hint_curr} prev={r.hint_prev} mtd={r.hint_mtd} pct={r.hint_pct}/> },
    { key:"upgrades",  sortKey:"upgrades_curr", label:"Upgrades",    render:r=><CustomTrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} mtd={r.upgrades_mtd} pct={r.upgrades_pct}/> },
    { key:"retention", sortKey:"ret_curr",      label:"Retention",   render:r=>(
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        <RetentionBar value={r.ret_curr}/>
        <div style={{ fontSize:11, color:"#6b7280" }}>prev: {fmtRetention(r.ret_prev)}</div>
        <div style={{ marginTop:1 }}><PctBadge value={r.ret_pct}/></div>
      </div>
    )},
  ];
}

function momDistrictCols() {
  return [
    { key:"market",    sortKey:"market",        label:"Market",      bold:true,  sticky:true, leftOffset:0 },
    { key:"mm",        sortKey:"mm",            label:"MM",          muted:true, sticky:true, leftOffset:120 },
    { key:"dm",        sortKey:"dm",            label:"DM",          muted:true, sticky:true, leftOffset:240, lastSticky:true },
    { key:"ppd",       sortKey:"ppd_curr",      label:"PPD",         render:r=><CustomTrendCell curr={r.ppd_curr} prev={r.ppd_prev} mtd={r.ppd_mtd} pct={r.ppd_pct}/> },
    { key:"acc",       sortKey:"acc_curr",      label:"Acc",         render:r=><CustomTrendCell curr={r.acc_curr} prev={r.acc_prev} mtd={r.acc_mtd} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"apo",       sortKey:"apo_curr",      label:"APO",         render:r=><CustomTrendCell curr={r.apo_curr} prev={r.apo_prev} pct={r.apo_pct} format={fmtApo}/> },
    { key:"voice",     sortKey:"voice_curr",    label:"Voice",       render:r=><CustomTrendCell curr={r.voice_curr} prev={r.voice_prev} mtd={r.voice_mtd} pct={r.voice_pct}/> },
    { key:"bts",       sortKey:"bts_curr",      label:"BTS",         render:r=><CustomTrendCell curr={r.bts_curr} prev={r.bts_prev} mtd={r.bts_mtd} pct={r.bts_pct}/> },
    { key:"hint",      sortKey:"hint_curr",     label:"Hint",        render:r=><CustomTrendCell curr={r.hint_curr} prev={r.hint_prev} mtd={r.hint_mtd} pct={r.hint_pct}/> },
    { key:"upgrades",  sortKey:"upgrades_curr", label:"Upgrades",    render:r=><CustomTrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} mtd={r.upgrades_mtd} pct={r.upgrades_pct}/> },
    { key:"retention", sortKey:"ret_curr",      label:"Retention",   render:r=>(
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        <RetentionBar value={r.ret_curr}/>
        <div style={{ fontSize:11, color:"#6b7280" }}>prev: {fmtRetention(r.ret_prev)}</div>
        <div style={{ marginTop:1 }}><PctBadge value={r.ret_pct}/></div>
      </div>
    )},
  ];
}

// ── growth % = (curr - prev) / prev ──────────────────────────
function growth(curr, prev) {
  if (!prev) return null;
  return (curr - prev) / prev;
}

function calcStats(rows) {
  if (!rows.length) return {};
  const sum = fn => rows.reduce((s,r) => s+(fn(r)||0), 0);
  const avg = fn => sum(fn)/rows.length;

  const ppdCurr      = sum(r => r.ppd_curr);
  const ppdPrev      = sum(r => r.ppd_prev);
  const accCurr      = sum(r => r.acc_curr);
  const accPrev      = sum(r => r.acc_prev);
  const apoCurr      = avg(r => r.apo_curr);
  const apoPrev      = avg(r => r.apo_prev);
  const voiceCurr    = sum(r => r.voice_curr);
  const voicePrev    = sum(r => r.voice_prev);
  const btsCurr      = sum(r => r.bts_curr);
  const btsPrev      = sum(r => r.bts_prev);
  const hintCurr     = sum(r => r.hint_curr);
  const hintPrev     = sum(r => r.hint_prev);
  const upgradesCurr = sum(r => r.upgrades_curr);
  const upgradesPrev = sum(r => r.upgrades_prev);
  const retCurr      = avg(r => r.ret_curr);
  const retPrev      = avg(r => r.ret_prev);

  return {
    ppdCurr,      ppdPrev,      ppdTrend:      growth(ppdCurr, ppdPrev),
    accCurr,      accPrev,      accTrend:      growth(accCurr, accPrev),
    apoCurr,      apoPrev,      apoTrend:      growth(apoCurr, apoPrev),
    voiceCurr,    voicePrev,    voiceTrend:    growth(voiceCurr, voicePrev),
    btsCurr,      btsPrev,      btsTrend:      growth(btsCurr, btsPrev),
    hintCurr,     hintPrev,     hintTrend:     growth(hintCurr, hintPrev),
    upgradesCurr, upgradesPrev, upgradesTrend: growth(upgradesCurr, upgradesPrev),
    retCurr,      retPrev,      retTrend:      growth(retCurr, retPrev),
  };
}

export default function MomPage({ storeData, marketData, districtData, user }) {
  const [tab,     setTab]     = useState("store");
  const [markets, setMarkets] = useState([]);
  const [dms,     setDms]     = useState([]);
  const [search,  setSearch]  = useState("");
  const [metric,  setMetric]  = useState("ppd");

  const allMarkets = useMemo(() => [...new Set(storeData.map(r=>r.market).filter(Boolean))].sort(), [storeData]);
  const allDms     = useMemo(() => {
    let d = storeData;
    if (markets.length) d = d.filter(r=>markets.includes(r.market));
    return [...new Set(d.map(r=>r.dm).filter(Boolean))].sort();
  }, [storeData, markets]);

  const filteredStores = useMemo(() => {
    let d = storeData;
    if (user.role==="market") d = d.filter(r=>r.market===user.market);
    if (markets.length) d = d.filter(r=>markets.includes(r.market));
    if (dms.length)     d = d.filter(r=>dms.includes(r.dm));
    if (search) { const q=search.toLowerCase(); d=d.filter(r=>(r.storeName||"").toLowerCase().includes(q)||(r.doorCode||"").toString().includes(q)); }
    return d;
  }, [storeData, markets, dms, search, user]);

  const filteredMarket   = useMemo(() => { let d=marketData.length?marketData:[]; if(markets.length) d=d.filter(r=>markets.includes(r.market)); return d; }, [marketData,markets]);
  const filteredDistrict = useMemo(() => { let d=districtData.length?districtData:[]; if(markets.length) d=d.filter(r=>markets.includes(r.market)); if(dms.length) d=d.filter(r=>dms.includes(r.dm)); return d; }, [districtData,markets,dms]);

  const stats   = useMemo(() => calcStats(filteredStores), [filteredStores]);
  const winLose = useMemo(() => ["ppd","acc","voice","bts","hint","upgrades","retention"].map(m => {
    const pctKey = m==="retention"?"ret_pct":`${m}_pct`;
    return { metric:m.toUpperCase(), up:filteredStores.filter(r=>(r[pctKey]||0)>0).length, down:filteredStores.filter(r=>(r[pctKey]||0)<0).length };
  }), [filteredStores]);

  const METRIC_MAP = {
    ppd:      {curr:"ppd_curr",      prev:"ppd_prev",      label:"PPD"},
    acc:      {curr:"acc_curr",      prev:"acc_prev",      label:"Accessories"},
    voice:    {curr:"voice_curr",    prev:"voice_prev",    label:"Voice"},
    bts:      {curr:"bts_curr",      prev:"bts_prev",      label:"BTS"},
    upgrades: {curr:"upgrades_curr", prev:"upgrades_prev", label:"Upgrades"},
  };
  const mdef = METRIC_MAP[metric];

  const chartData = useMemo(() => {
    const map = {};
    filteredStores.forEach(r => {
      const k = r.market||"Unknown";
      if (!map[k]) map[k] = {name:k,curr:0,prev:0};
      map[k].curr += r[mdef.curr]||0;
      map[k].prev += r[mdef.prev]||0;
    });
    return Object.values(map).sort((a,b)=>b.curr-a.curr).slice(0,12);
  }, [filteredStores, mdef]);

  const filterSelect = { padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,.2)", fontSize:12, color:"#fff", background:"rgba(255,255,255,.12)", cursor:"pointer" };
  const tabBtn = (id, label) => {
    const active = tab===id;
    return <button onClick={()=>setTab(id)} style={{ padding:"7px 18px", borderRadius:7, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:active?"#fff":"transparent", color:active?PURPLE:"rgba(255,255,255,.5)" }}>{label}</button>;
  };

  return (
    <div>
      <PageHeader
        title="MOM Retention Comparison Report"
        sub="Previous Month vs Current Month — with trending"
        extra={
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {user.role==="admin" && (
              <MultiSelect options={allMarkets} selected={markets} onChange={val=>{setMarkets(val);setDms([]);}} placeholder="All Markets"/>
            )}
            <MultiSelect options={allDms} selected={dms} onChange={setDms} placeholder="All DMs"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search store…" style={{...filterSelect,width:160,outline:"none"}}/>
          </div>
        }
      />

      <div style={{padding:"20px 28px"}}>

        {/* STAT CARDS */}
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <StatCard label="Total PPD"      curr={stats.ppdCurr}      prev={stats.ppdPrev}      trend={stats.ppdTrend}      format={fmtNum}       accent="pink"/>
          <StatCard label="Total ACC"      curr={stats.accCurr}      prev={stats.accPrev}      trend={stats.accTrend}      format={fmtDollar}     accent="purple"/>
          <StatCard label="Avg APO"        curr={stats.apoCurr}      prev={stats.apoPrev}      trend={stats.apoTrend}      format={fmtApo}        accent="blue"/>
          <StatCard label="Total Voice"    curr={stats.voiceCurr}    prev={stats.voicePrev}    trend={stats.voiceTrend}    format={fmtNum}        accent="amber"/>
          <StatCard label="Total BTS"      curr={stats.btsCurr}      prev={stats.btsPrev}      trend={stats.btsTrend}      format={fmtNum}        accent="purple"/>
          <StatCard label="Total Hint"     curr={stats.hintCurr}     prev={stats.hintPrev}     trend={stats.hintTrend}     format={fmtNum}        accent="pink"/>
          <StatCard label="Total Upgrades" curr={stats.upgradesCurr} prev={stats.upgradesPrev} trend={stats.upgradesTrend} format={fmtNum}        accent="blue"/>
          <StatCard label="Avg Retention"  curr={stats.retCurr}      prev={stats.retPrev}      trend={stats.retTrend}      format={fmtRetention}  accent={stats.retTrend>=0?"green":"red"}/>
        </div>

        {/* WIN/LOSE */}
        <div style={{background:"#fff",borderRadius:14,border:"1px solid #e9eaf0",padding:"16px 18px",marginBottom:20}}>
          <div style={{fontWeight:600,color:PURPLE,fontSize:13,marginBottom:12}}>Store Performance vs Previous Month</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {winLose.map(w=>(
              <div key={w.metric} style={{background:"#faf8ff",borderRadius:10,padding:"10px 14px",border:"1px solid #ede9f8",minWidth:100,textAlign:"center"}}>
                <div style={{fontSize:11,fontWeight:700,color:PURPLE,marginBottom:6}}>{w.metric}</div>
                <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                  <div><div style={{fontSize:16,fontWeight:700,color:"#22c55e"}}>{w.up}</div><div style={{fontSize:9,color:"#9ca3af"}}>▲ UP</div></div>
                  <div style={{width:1,background:"#e5e7eb"}}/>
                  <div><div style={{fontSize:16,fontWeight:700,color:"#ef4444"}}>{w.down}</div><div style={{fontSize:9,color:"#9ca3af"}}>▼ DOWN</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART */}
        <div style={{background:"#fff",borderRadius:14,border:"1px solid #e9eaf0",padding:"18px 20px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div style={{fontWeight:600,color:PURPLE,fontSize:14}}>Market Comparison — Current vs Previous</div>
            <div style={{display:"flex",gap:6}}>
              {Object.entries(METRIC_MAP).map(([k,v])=>(
                <button key={k} onClick={()=>setMetric(k)} style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:metric===k?PURPLE:"#f3e8ff",color:metric===k?"#fff":PURPLE}}>{v.label}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="name" tick={{fontSize:9,fill:"#6b7280"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:"#6b7280"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:8,border:"1px solid #e5e7eb",fontSize:11}}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="curr" name="Current" radius={[3,3,0,0]}>
                {chartData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Bar>
              <Bar dataKey="prev" name="Previous" fill="#c8b6ff" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TABS */}
        <div style={{background:PURPLE,borderRadius:10,display:"inline-flex",padding:"4px",gap:2,marginBottom:16}}>
          {tabBtn("store","Store Level")}
          {tabBtn("market","Market Wise")}
          {tabBtn("district","District Wise")}
        </div>

        {/* TABLE */}
        <div style={{background:"#fff",borderRadius:14,border:"1px solid #e9eaf0",overflow:"hidden"}}>
          <div style={{padding:"12px 18px",borderBottom:"1px solid #f3f4f6",background:"#faf8ff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontWeight:600,color:PURPLE,fontSize:14}}>
              {tab==="store"?`Store Level · ${filteredStores.length} stores`:tab==="market"?`Market Wise · ${filteredMarket.length} markets`:`District Wise · ${filteredDistrict.length} districts`}
            </div>
            <div style={{fontSize:11,color:"#9ca3af"}}>Current ↕ Details</div>
          </div>
          {tab==="store"    && <SortableTable cols={momStoreCols()}    rows={filteredStores}   emptyMsg="No store data"/>}
          {tab==="market"   && <SortableTable cols={momMarketCols()}   rows={filteredMarket}   emptyMsg="No market data"/>}
          {tab==="district" && <SortableTable cols={momDistrictCols()} rows={filteredDistrict} emptyMsg="No district data"/>}
        </div>
      </div>
    </div>
  );
}
