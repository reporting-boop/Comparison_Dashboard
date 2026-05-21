import { useState, useRef } from "react";
import { TrendingUp, Upload, LogOut, CheckCircle, X } from "../icons";
import * as XLSX from "xlsx";
import {
  parseMomStoreRow, parseMomMarketRow, parseMomDistrictRow,
  parseWowStoreRow, parseWowMarketRow, parseWowDistrictRow,
} from "../data";

const PURPLE = "#5b2d8e";
const PINK   = "#e6007e";
const DARK   = "#2a1244";

const NAV = [
  { id:"mom", label:"MOM Comparison", icon:"MOM" },
  { id:"wow", label:"WOW Comparison", icon:"WOW" },
];

export default function Shell({
  user, page, setPage,
  setMomStore, setMomMarket, setMomDistrict,
  setWowStore, setWowMarket, setWowDistrict,
  children
}) {
  const [toast, setToast] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  function showToast(msg, type="success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const wb = XLSX.read(ev.target.result, { type:"binary" });
        const names = wb.SheetNames.map(n => n.toUpperCase());
        const isMOM = names.some(n => n.includes("MOM"));
        const isWOW = names.some(n => n.includes("WOW"));

        function sheetToArray(name) {
          const sheet = wb.Sheets[name];
          if (!sheet) return [];
          return XLSX.utils.sheet_to_json(sheet, { header:1, defval:null });
        }

        if (isMOM) {
          // Sheet names: 'MOM RETENTION REPORT', 'MARKET WISE', 'DISTRICT WISE'
          const storeName = wb.SheetNames.find(n => n.toUpperCase().includes("MOM") || n.toUpperCase().includes("RETENTION")) || wb.SheetNames[0];
          const mktName   = wb.SheetNames.find(n => n.toUpperCase().includes("MARKET")) || wb.SheetNames[1];
          const distName  = wb.SheetNames.find(n => n.toUpperCase().includes("DISTRICT")) || wb.SheetNames[2];

          const storeArr = sheetToArray(storeName).slice(2).filter(r => r[0]);
          const mktArr   = sheetToArray(mktName).slice(2).filter(r => r[0]);
          const distArr  = sheetToArray(distName).slice(2).filter(r => r[0]);

          setMomStore(storeArr.map(parseMomStoreRow));
          setMomMarket(mktArr.map(parseMomMarketRow));
          setMomDistrict(distArr.map(parseMomDistrictRow));
          showToast(`✓ Loaded MOM data: ${storeArr.length} stores`);
        } else if (isWOW) {
          const storeName = wb.SheetNames.find(n => n.toUpperCase().includes("WOW") || n.toUpperCase().includes("RETENTION")) || wb.SheetNames[0];
          const mktName   = wb.SheetNames.find(n => n.toUpperCase().includes("MARKET")) || wb.SheetNames[2];
          const distName  = wb.SheetNames.find(n => n.toUpperCase().includes("DISTRICT")) || wb.SheetNames[1];

          const storeArr = sheetToArray(storeName).slice(2).filter(r => r[0]);
          const mktArr   = sheetToArray(mktName).slice(2).filter(r => r[0]);
          const distArr  = sheetToArray(distName).slice(2).filter(r => r[0]);

          setWowStore(storeArr.map(parseWowStoreRow));
          setWowMarket(mktArr.map(parseWowMarketRow));
          setWowDistrict(distArr.map(parseWowDistrictRow));
          showToast(`✓ Loaded WOW data: ${storeArr.length} stores`);
        } else {
          throw new Error("Could not detect MOM or WOW file. Check sheet names.");
        }
      } catch(err) {
        showToast("Error: " + err.message, "error");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    };
    reader.readAsBinaryString(file);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f0eaf8", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        position:"fixed", top:0, left:0, bottom:0, width:230,
        background: DARK, display:"flex", flexDirection:"column",
        borderRight:"1px solid rgba(255,255,255,.06)", zIndex:100,
        boxShadow:"4px 0 20px rgba(0,0,0,.3)"
      }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 16px", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <img src="/logo.png" alt="Metro by T-Mobile"
              style={{ width:52, height:52, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
            <div>
              <div style={{ color:"#fff", fontWeight:700, fontSize:13, lineHeight:1.3 }}>
                Comparison<br/>Report Dashboard
              </div>
              <div style={{ color:PINK, fontSize:10, marginTop:3, fontWeight:500 }}>Metro by T-Mobile</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"14px 10px", display:"flex", flexDirection:"column", gap:4 }}>
          <div style={{ color:"rgba(255,255,255,.25)", fontSize:10, fontWeight:600,
            letterSpacing:".08em", padding:"0 8px", marginBottom:8 }}>REPORTS</div>
          {NAV.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                borderRadius:8, border:"none", cursor:"pointer", textAlign:"left", width:"100%",
                background: active ? "rgba(230,0,126,.18)" : "transparent",
                color:      active ? "#ff6ec7" : "rgba(255,255,255,.45)",
                fontSize:13, fontWeight: active ? 600 : 400,
                transition:"all .15s",
                borderLeft: active ? `3px solid ${PINK}` : "3px solid transparent"
              }}>
                <span style={{
                  fontSize:9, fontWeight:800, letterSpacing:".06em",
                  background: active ? PINK : "rgba(255,255,255,.12)",
                  color:"#fff", borderRadius:5, padding:"2px 6px", flexShrink:0
                }}>{n.icon}</span>
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* Upload */}
        {user.role === "admin" && (
          <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleFile} style={{ display:"none" }}/>
            <button onClick={() => fileRef.current.click()} disabled={uploading} style={{
              width:"100%", padding:"8px 12px", borderRadius:7,
              background:"rgba(230,0,126,.15)", border:"1px solid rgba(230,0,126,.3)",
              color:"#ff6ec7", fontSize:11, fontWeight:600, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6
            }}>
              <Upload size={12}/> {uploading ? "Loading…" : "Upload MOM / WOW"}
            </button>
            <div style={{ color:"rgba(255,255,255,.18)", fontSize:9, textAlign:"center", marginTop:5 }}>
              Auto-detects MOM or WOW file
            </div>
          </div>
        )}

        {/* User */}
        <div style={{ padding:"12px 14px", borderTop:"1px solid rgba(255,255,255,.08)",
          display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:30, height:30, borderRadius:"50%",
            background:`linear-gradient(135deg,${PURPLE},${PINK})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:700, color:"#fff", flexShrink:0
          }}>{user.username[0].toUpperCase()}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:"rgba(255,255,255,.8)", fontSize:12, fontWeight:500, textTransform:"capitalize" }}>{user.username}</div>
            <div style={{ color:"rgba(255,255,255,.3)", fontSize:10, textTransform:"capitalize" }}>{user.role}</div>
          </div>
          <button onClick={() => window.location.reload()} title="Sign out"
            style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.3)", padding:0 }}>
            <LogOut size={14}/>
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft:230, minHeight:"100vh" }}>{children}</div>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", bottom:24, right:24, zIndex:1000,
          background: toast.type==="error" ? "#fee2e2" : "#f3e8ff",
          border:`1px solid ${toast.type==="error" ? "#fca5a5":"#c084fc"}`,
          color: toast.type==="error" ? "#dc2626" : PURPLE,
          borderRadius:10, padding:"12px 16px", fontSize:13, fontWeight:500,
          boxShadow:"0 8px 24px rgba(0,0,0,.12)",
          display:"flex", alignItems:"center", gap:10
        }}>
          {toast.type==="error" ? <X size={15}/> : <CheckCircle size={15}/>}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
