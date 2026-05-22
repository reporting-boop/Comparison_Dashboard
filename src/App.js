import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Shell from "./components/Shell";
import MomPage from "./pages/MomPage";
import WowPage from "./pages/WowPage";

import {
  DEMO_MOM_STORE,
  DEMO_WOW_STORE
} from "./data";

import { API_URL } from "./api";

export default function App() {

  // LOGIN
  const [user, setUser] = useState(null);

  // PAGE
  const [page, setPage] = useState("mom");

  // ─────────────────────────────────────────────
  // MOM DATASETS
  // ─────────────────────────────────────────────
  const [momStore, setMomStore] =
    useState(DEMO_MOM_STORE);

  const [momMarket, setMomMarket] =
    useState([]);

  const [momDistrict, setMomDistrict] =
    useState([]);

  // ─────────────────────────────────────────────
  // WOW DATASETS
  // ─────────────────────────────────────────────
  const [wowStore, setWowStore] =
    useState(DEMO_WOW_STORE);

  const [wowMarket, setWowMarket] =
    useState([]);

  const [wowDistrict, setWowDistrict] =
    useState([]);

  // ─────────────────────────────────────────────
  // FETCH GOOGLE SHEET API
  // ─────────────────────────────────────────────
  useEffect(() => {

    fetch(API_URL)

      .then((res) => res.json())

      .then((data) => {

        console.log("API DATA:", data);

        // MOM
        setMomStore(
          data.momStore || []
        );

        setMomMarket(
          data.momMarket || []
        );

        setMomDistrict(
          data.momDistrict || []
        );

        // WOW
        setWowStore(
          data.wowStore || []
        );

        setWowMarket(
          data.wowMarket || []
        );

        setWowDistrict(
          data.wowDistrict || []
        );

      })

      .catch((err) => {

        console.error(
          "API ERROR:",
          err
        );

      });

  }, []);

  // ─────────────────────────────────────────────
  // LOGIN PAGE
  // ─────────────────────────────────────────────
  if (!user) {
    return (
      <Login onLogin={setUser}/>
    );
  }

  // ─────────────────────────────────────────────
  // APP
  // ─────────────────────────────────────────────
  return (

    <Shell
      user={user}
      page={page}
      setPage={setPage}

      setMomStore={setMomStore}
      setMomMarket={setMomMarket}
      setMomDistrict={setMomDistrict}

      setWowStore={setWowStore}
      setWowMarket={setWowMarket}
      setWowDistrict={setWowDistrict}
    >

      {/* MOM PAGE */}
      {page === "mom" && (

        <MomPage
          storeData={momStore}
          marketData={momMarket}
          districtData={momDistrict}
          user={user}
        />

      )}

      {/* WOW PAGE */}
      {page === "wow" && (

        <WowPage
          storeData={wowStore}
          marketData={wowMarket}
          districtData={wowDistrict}
          user={user}
        />

      )}

    </Shell>
  );
}
