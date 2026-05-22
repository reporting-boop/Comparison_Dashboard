// api/sheets.js
const GAS_URL = "https://script.google.com/macros/s/AKfycbxrnSRG9bewdk-BRaGZWIJwTyZjiiyLAUiJkSPdZSpQKQj7bX1Zh2LnPDasou558vfx7Q/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const response = await fetch(GAS_URL, { redirect: "follow" });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
