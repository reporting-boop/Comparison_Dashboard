import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Shell from "./components/Shell";
import MomPage from "./pages/MomPage";
import WowPage from "./pages/WowPage";
import { DEMO_MOM_STORE, DEMO_WOW_STORE } from "./data";

const GAS_URL = "https://script.google.com/macros/s/AKfycbxrnSRG9bewdk-BRaGZWIJwTyZjiiyLAUiJkSPdZSpQKQj7bX1Zh2LnPDasou558vfx7Q/exec";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("mom");

  const [momStore,    setMomStore]    = useState(DEMO_MOM_STORE);
  const [momMarket,   setMomMarket]   = useState([]);
  const [momDistrict, setMomDistrict] = useState([]);

  const [wowStore,    setWowStore]    = useState(DEMO_WOW_STORE);
  const [wowMarket,   setWowMarket]   = useState([]);
  const [wowDistrict, setWowDistrict] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchFromSheets();
  }, [user]);

  function normalizeRow(row) {
    const numFields = [
      "ppd_curr","ppd_mtd","ppd_prev","ppd_pct",
      "acc_curr","acc_mtd","acc_prev","acc_pct",
      "apo_curr","apo_prev","apo_pct",
      "voice_curr","voice_mtd","voice_prev","voice_pct",
      "bts_curr","bts_mtd","bts_prev","bts_pct",
      "hint_curr","hint_mtd","hint_prev","hint_pct",
      "upgrades_curr","upgrades_mtd","upgrades_prev","upgrades_pct",
      "ret_curr","ret_prev","ret_pct",
    ];
    const out = { ...row };
    numFields.forEach(f => { if (f in out) out[f] = +out[f] || 0; });
    return out;
  }

  async function fetchFromSheets() {
    try {
      const res = await fetch(GAS_URL + "?t=" + Date.now(), {
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.momStore)    setMomStore(data.momStore.map(normalizeRow));
      if (data.momMarket)   setMomMarket(data.momMarket.map(normalizeRow));
      if (data.momDistrict) setMomDistrict(data.momDistrict.map(normalizeRow));
      if (data.wowStore)    setWowStore(data.wowStore.map(normalizeRow));
      if (data.wowMarket)   setWowMarket(data.wowMarket.map(normalizeRow));
      if (data.wowDistrict) setWowDistrict(data.wowDistrict.map(normalizeRow));
    } catch (err) {
      console.error("Google Sheets fetch failed:", err);
    }
  }

  if (!user) return <Login onLogin={setUser}/>;

  return (
    <Shell
      user={user} page={page} setPage={setPage}
      setMomStore={setMomStore} setMomMarket={setMomMarket} setMomDistrict={setMomDistrict}
      setWowStore={setWowStore} setWowMarket={setWowMarket} setWowDistrict={setWowDistrict}
    >
      {page === "mom" && (
        <MomPage
          storeData={momStore} marketData={momMarket} districtData={momDistrict}
          user={user}
        />
      )}
      {page === "wow" && (
        <WowPage
          storeData={wowStore} marketData={wowMarket} districtData={wowDistrict}
          user={user}
        />
      )}
    </Shell>
  );
}
