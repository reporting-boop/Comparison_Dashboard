import { useState } from "react";
import Login from "./pages/Login";
import Shell from "./components/Shell";
import MomPage from "./pages/MomPage";
import WowPage from "./pages/WowPage";
import { DEMO_MOM_STORE, DEMO_WOW_STORE } from "./data";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("mom");

  // MOM datasets
  const [momStore,    setMomStore]    = useState(DEMO_MOM_STORE);
  const [momMarket,   setMomMarket]   = useState([]);
  const [momDistrict, setMomDistrict] = useState([]);

  // WOW datasets
  const [wowStore,    setWowStore]    = useState(DEMO_WOW_STORE);
  const [wowMarket,   setWowMarket]   = useState([]);
  const [wowDistrict, setWowDistrict] = useState([]);

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
