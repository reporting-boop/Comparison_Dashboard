import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line, Legend
} from "recharts";
import { pctColor, pctLabel, fmtNum, fmtDollar, fmtRetention } from "../data";
import { StatCard, PageHeader, PctBadge, TrendCell, Avatar, RetentionBar, DataTable } from "../components/UI";

const PURPLE = "#5b2d8e";
const PINK   = "#e6007e";
const COLORS = [PURPLE,"#7c3aed","#9333ea","#a855f7","#c026d3",PINK,"#db2777","#be185d","#065f46","#0e7490"];

// ── Shared metric column builder ──────────────────────────────
function momStoreCols(isMom) {
  return [
    { key:"doorCode",   label:"Door",       muted:true },
    { key:"market",     label:"Market",     muted:true },
    { key:"storeName",  label:"Store",      bold:true },
    { key:"dm",         label:"DM",         muted:true },
    { key:"ppd",        label:"PPD", render: r => <TrendCell curr={r.ppd_curr} prev={r.ppd_prev} pct={r.ppd_pct}/> },
    { key:"acc",        label:"Accessories", render: r => <TrendCell curr={r.acc_curr} prev={r.acc_prev} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"apo",        label:"APO",        render: r => <TrendCell curr={r.apo_curr} prev={r.apo_prev} pct={r.apo_pct} format={v=>fmtNum(v,1)}/> },
    { key:"voice",      label:"Voice",      render: r => <TrendCell curr={r.voice_curr} prev={r.voice_prev} pct={r.voice_pct}/> },
    { key:"bts",        label:"BTS",        render: r => <TrendCell curr={r.bts_curr} prev={r.bts_prev} pct={r.bts_pct}/> },
    { key:"hint",       label:"Hint",       render: r => <TrendCell curr={r.hint_curr} prev={r.hint_prev} pct={r.hint_pct}/> },
    { key:"upgrades",   label:"Upgrades",   render: r => <TrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} pct={r.upgrades_pct}/> },
    { key:"retention",  label:"Retention",  render: r => (
      <div>
        <RetentionBar value={r.ret_curr}/>
        <div style={{ fontSize:10, color:"#9ca3af", marginTop:2 }}>
          prev: {fmtRetention(r.ret_prev)} <PctBadge value={r.ret_pct}/>
        </div>
      </div>
    )},
  ];
}

function momMarketCols() {
  return [
    { key:"market",     label:"Market",     bold:true },
    { key:"dm",         label:"DM",         muted:true },
    { key:"ppd",        label:"PPD",        render: r => <TrendCell curr={r.ppd_curr} prev={r.ppd_prev} pct={r.ppd_pct}/> },
    { key:"acc",        label:"Accessories",render: r => <TrendCell curr={r.acc_curr} prev={r.acc_prev} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"apo",        label:"APO",        render: r => <TrendCell curr={r.apo_curr} prev={r.apo_prev} pct={r.apo_pct} format={v=>fmtNum(v,1)}/> },
    { key:"voice",      label:"Voice",      render: r => <TrendCell curr={r.voice_curr} prev={r.voice_prev} pct={r.voice_pct}/> },
    { key:"bts",        label:"BTS",        render: r => <TrendCell curr={r.bts_curr} prev={r.bts_prev} pct={r.bts_pct}/> },
    { key:"hint",       label:"Hint",       render: r => <TrendCell curr={r.hint_curr} prev={r.hint_prev} pct={r.hint_pct}/> },
    { key:"upgrades",   label:"Upgrades",   render: r => <TrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} pct={r.upgrades_pct}/> },
    { key:"retention",  label:"Retention",  render: r => <div><RetentionBar value={r.ret_curr}/><div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>prev: {fmtRetention(r.ret_prev)}</div></div> },
  ];
}

function momDistrictCols() {
  return [
    { key:"market",  label:"Market",  bold:true },
    { key:"mm",      label:"MM",      muted:true },
    { key:"dm",      label:"DM",      muted:true },
    { key:"ppd",     label:"PPD",     render: r => <TrendCell curr={r.ppd_curr} prev={r.ppd_prev} pct={r.ppd_pct}/> },
    { key:"acc",     label:"Acc",     render: r => <TrendCell curr={r.acc_curr} prev={r.acc_prev} pct={r.acc_pct} format={fmtDollar}/> },
    { key:"voice",   label:"Voice",   render: r => <TrendCell curr={r.voice_curr} prev={r.voice_prev} pct={r.voice_pct}/> },
    { key:"bts",     label:"BTS",     render: r => <TrendCell curr={r.bts_curr} prev={r.bts_prev} pct={r.bts_pct}/> },
    { key:"hint",    label:"Hint",    render: r => <TrendCell curr={r.hint_curr} prev={r.hint_prev} pct={r.hint_pct}/> },
    { key:"upgrades",label:"Upgrades",render: r => <TrendCell curr={r.upgrades_curr} prev={r.upgrades_prev} pct={r.upgrades_pct}/> },
    { key:"retention",label:"Retention",render: r => <div><RetentionBar value={r.ret_curr}/></div> },
  ];
}

// ── Summary stats from store data ────────────────────────────
function calcStats(rows) {
  if (!rows.length) return {};
  const sum = (fn) => rows.reduce((s,r) => s + (fn(r)||0), 0);
  const avg = (fn) => sum(fn) / rows.length;
  return {
    totalPpd:  sum(r => r.ppd_mtd||r.ppd_curr),
    totalAcc:  sum(r => r.acc_mtd||r.acc_curr),
    avgApo:    avg(r => r.apo_curr),
    totalVoice:sum(r => r.voice_mtd||r.voice_curr),
    avgRet:    avg(r => r.ret_curr),
    ppdTrend:  avg(r => r.ppd_pct),
    accTrend:  avg(r => r.acc_pct),
    retTrend:  avg(r => r.ret_pct),
    stores:    rows.length,
  };
}

export default function MomPage({ storeData, marketData, districtData, user }) {
  const [tab,    setTab]    = useState("store");   // store | market | district
  const [market, setMarket] = useState("all");
  const [dm,     setDm]     = useState("all");
  const [search, setSearch] = useState("");
  const [metric, setMetric] = useState("ppd");     // for chart

  const markets = useMemo(() => [...new Set(storeData.map(r => r.market).filter(Boolean))].sort(), [storeData]);
  const dms     = useMemo(() => {
    let d = storeData;
    if (market !== "all") d = d.filter(r => r.market === market);
    return [...new Set(d.map(r => r.dm).filter(Boolean))].sort();
  }, [storeData, market]);

  const filteredStores = useMemo(() => {
    let d = storeData;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    if (market !== "all") d = d.filter(r => r.market === market);
    if (dm !== "all")     d = d.filter(r => r.dm === dm);
    if (search) {
      const q = search.toLowerCase();
      d = d.filter(r => (r.storeName||"").toLowerCase().includes(q) || (r.doorCode||"").includes(q));
    }
    return d;
  }, [storeData, market, dm, search, user]);

  const filteredMarket   = useMemo(() => {
    let d = marketData.length ? marketData : [];
    if (market !== "all") d = d.filter(r => r.market === market);
    return d;
  }, [marketData, market]);

  const filteredDistrict = useMemo(() => {
    let d = districtData.length ? districtData : [];
    if (market !== "all") d = d.filter(r => r.market === market);
    if (dm !== "all")     d = d.filter(r => r.dm === dm);
    return d;
  }, [districtData, market, dm]);

  const stats = useMemo(() => calcStats(filteredStores), [filteredStores]);

  // Chart data — top markets by current metric
  const METRIC_MAP = {
    ppd:      { curr:"ppd_curr",      prev:"ppd_prev",      label:"PPD" },
    acc:      { curr:"acc_curr",      prev:"acc_prev",      label:"Accessories" },
    voice:    { curr:"voice_curr",    prev:"voice_prev",    label:"Voice" },
    bts:      { curr:"bts_curr",      prev:"bts_prev",      label:"BTS" },
    upgrades: { curr:"upgrades_curr", prev:"upgrades_prev", label:"Upgrades" },
  };
  const mdef = METRIC_MAP[metric];

  // Aggregate by market for chart
  const chartData = useMemo(() => {
    const map = {};
    filteredStores.forEach(r => {
      const k = r.market||"Unknown";
      if (!map[k]) map[k] = { name:k, curr:0, prev:0 };
      map[k].curr += r[mdef.curr]||0;
      map[k].prev += r[mdef.prev]||0;
    });
    return Object.values(map).sort((a,b) => b.curr - a.curr).slice(0,12);
  }, [filteredStores, mdef]);

  const filterSelect = { padding:"7px 10px", borderRadius:8, border:"1px solid rgba(255,255,255,.2)",
    fontSize:12, color:"#fff", background:"rgba(255,255,255,.12)", cursor:"pointer" };

  const tabBtn = (id, label) => {
    const active = tab === id;
    return (
      <button onClick={() => setTab(id)} style={{
        padding:"7px 18px", borderRadius:7, border:"none", cursor:"pointer",
        fontSize:12, fontWeight:600,
        background: active ? "#fff" : "transparent",
        color: active ? PURPLE : "rgba(255,255,255,.5)",
        transition:"all .15s"
      }}>{label}</button>
    );
  };

  return (
    <div>
      <PageHeader
        title="MOM Retention Comparison Report"
        sub="Previous Month vs Current Month — with trending"
        extra={
          <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {user.role === "admin" && (
              <select value={market} onChange={e => { setMarket(e.target.value); setDm("all"); }} style={filterSelect}>
                <option value="all" style={{ color:"#374151" }}>All Markets</option>
                {markets.map(m => <option key={m} value={m} style={{ color:"#374151" }}>{m}</option>)}
              </select>
            )}
            <select value={dm} onChange={e => setDm(e.target.value)} style={filterSelect}>
              <option value="all" style={{ color:"#374151" }}>All DMs</option>
              {dms.map(d => <option key={d} value={d} style={{ color:"#374151" }}>{d}</option>)}
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search store…"
              style={{ ...filterSelect, width:160, outline:"none" }}/>
          </div>
        }
      />

      <div style={{ padding:"20px 28px" }}>
        {/* Stats row */}
        <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <StatCard label="Stores"         value={stats.stores||0}              sub="Filtered"            accent="purple"/>
          <StatCard label="Total PPD (MTD)"value={fmtNum(stats.totalPpd)}       sub={`Trend: ${pctLabel(stats.ppdTrend||0)}`}  accent="pink"/>
          <StatCard label="Total Acc (MTD)"value={fmtDollar(stats.totalAcc)}    sub={`Trend: ${pctLabel(stats.accTrend||0)}`}  accent="purple"/>
          <StatCard label="Avg APO"        value={fmtNum(stats.avgApo,1)}       sub="Current month"       accent="blue"/>
          <StatCard label="Avg Retention"  value={fmtRetention(stats.avgRet)}   sub={`Trend: ${pctLabel(stats.retTrend||0)}`}  accent={stats.retTrend>=0?"green":"red"}/>
          <StatCard label="Total Voice"    value={fmtNum(stats.totalVoice)}     sub="Current month"       accent="amber"/>
        </div>

        {/* Chart */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e9eaf0", padding:"18px 20px", marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
            <div style={{ fontWeight:600, color:PURPLE, fontSize:14 }}>Market Comparison — Current vs Previous</div>
            <div style={{ display:"flex", gap:6 }}>
              {Object.entries(METRIC_MAP).map(([k,v]) => (
                <button key={k} onClick={() => setMetric(k)} style={{
                  padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:600,
                  background: metric===k ? PURPLE : "#f3e8ff",
                  color: metric===k ? "#fff" : PURPLE,
                }}>{v.label}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
              <XAxis dataKey="name" tick={{ fontSize:9, fill:"#6b7280" }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:10, fill:"#6b7280" }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:"1px solid #e5e7eb", fontSize:11 }}/>
              <Legend wrapperStyle={{ fontSize:11 }}/>
              <Bar dataKey="curr" name="Current" radius={[3,3,0,0]}>
                {chartData.map((_,i) => <Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Bar>
              <Bar dataKey="prev" name="Previous" fill="#e9d5ff" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tab switcher */}
        <div style={{
          background:PURPLE, borderRadius:10, display:"inline-flex",
          padding:"4px", gap:2, marginBottom:16
        }}>
          {tabBtn("store",    "Store Level")}
          {tabBtn("market",   "Market Wise")}
          {tabBtn("district", "District Wise")}
        </div>

        {/* Tables */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e9eaf0", overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:"1px solid #f3f4f6", background:"#faf8ff",
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:600, color:PURPLE, fontSize:14 }}>
              {tab === "store" ? `Store Level · ${filteredStores.length} stores` :
               tab === "market" ? `Market Wise · ${filteredMarket.length} markets` :
               `District Wise · ${filteredDistrict.length} districts`}
            </div>
            <div style={{ fontSize:11, color:"#9ca3af" }}>Current ↕ Prev · % change</div>
          </div>
          {tab === "store"    && <DataTable cols={momStoreCols()}    rows={filteredStores}    emptyMsg="No store data — upload MOM file"/>}
          {tab === "market"   && <DataTable cols={momMarketCols()}   rows={filteredMarket}    emptyMsg="Upload MOM file to see market data"/>}
          {tab === "district" && <DataTable cols={momDistrictCols()} rows={filteredDistrict} emptyMsg="Upload MOM file to see district data"/>}
        </div>
      </div>
    </div>
  );
}
