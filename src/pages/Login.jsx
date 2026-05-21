import { useState } from "react";
import { CREDENTIALS } from "../data";

const PURPLE = "#5b2d8e";
const PINK   = "#e6007e";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const cred = CREDENTIALS[username.toLowerCase().trim()];
    if (cred && cred.password === password) {
      onLogin({ username: username.toLowerCase().trim(), ...cred });
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"radial-gradient(ellipse at 20% 50%, #7b1fa2 0%, #4a0072 40%, #2a004a 100%)",
      fontFamily:"'DM Sans','Segoe UI',sans-serif", padding:16
    }}>
      {/* Card */}
      <div style={{
        background:"rgba(50,20,80,.72)", backdropFilter:"blur(18px)",
        borderRadius:20, padding:"36px 38px 32px",
        width:"100%", maxWidth:400,
        border:"1px solid rgba(255,255,255,.1)",
        boxShadow:"0 32px 80px rgba(0,0,0,.45)"
      }}>
        {/* Header row: logo + title */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:30 }}>
          <img src="/logo.png" alt="Metro by T-Mobile"
            style={{ width:72, height:72, borderRadius:14, objectFit:"cover", flexShrink:0 }}/>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:17, lineHeight:1.25 }}>
              Comparison<br/>Report Dashboard
            </div>
            <div style={{ color:PINK, fontSize:11, marginTop:4, fontWeight:500 }}>Metro by T-Mobile</div>
          </div>
        </div>

        {/* Sign in heading */}
        <div style={{ color:"#fff", fontWeight:700, fontSize:20, marginBottom:4 }}>Sign in</div>
        <div style={{ color:"rgba(255,255,255,.45)", fontSize:13, marginBottom:24 }}>
          Enter your credentials to continue
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.5)",
            letterSpacing:".07em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
            Username
          </label>
          <input
            value={username} onChange={e => setUsername(e.target.value)}
            placeholder="e.g. admin, dallas"
            style={{
              width:"100%", padding:"12px 14px", borderRadius:10, boxSizing:"border-box",
              border:"1px solid rgba(255,255,255,.12)",
              background:"rgba(255,255,255,.08)",
              fontSize:13, color:"#fff", outline:"none", marginBottom:16,
            }}/>

          {/* Password */}
          <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.5)",
            letterSpacing:".07em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
            Password
          </label>
          <div style={{ position:"relative", marginBottom: error ? 10 : 22 }}>
            <input
              type={showPw ? "text" : "password"}
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width:"100%", padding:"12px 42px 12px 14px", borderRadius:10, boxSizing:"border-box",
                border:"1px solid rgba(255,255,255,.12)",
                background:"rgba(255,255,255,.08)",
                fontSize:13, color:"#fff", outline:"none",
              }}/>
            <button type="button" onClick={() => setShowPw(p => !p)} style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer",
              color:"rgba(255,255,255,.4)", fontSize:16, padding:0, lineHeight:1
            }}>
              {showPw ? "🙈" : "👁"}
            </button>
          </div>

          {error && (
            <div style={{ fontSize:12, color:"#f87171", marginBottom:12, fontWeight:500 }}>{error}</div>
          )}

          {/* Sign in button */}
          <button type="submit" style={{
            width:"100%", padding:"13px", borderRadius:10, border:"none", cursor:"pointer",
            background:`linear-gradient(90deg,${PINK},#c2185b)`,
            color:"#fff", fontSize:14, fontWeight:700,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            boxShadow:"0 4px 18px rgba(230,0,126,.45)"
          }}>
            <span style={{ fontSize:16 }}>→</span> Sign in
          </button>
        </form>

        {/* Demo credentials */}
        <div style={{
          marginTop:22, background:"rgba(255,255,255,.06)", borderRadius:12,
          padding:"14px 16px", border:"1px solid rgba(255,255,255,.08)"
        }}>
          <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)",
            letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>
            Demo Credentials
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5px 12px" }}>
            {[
              ["admin","admin123"],["arizona","arz2024"],
              ["dallas","dal2024"],["houston","hou2024"],
            ].map(([u,p]) => (
              <div key={u} style={{ fontSize:11, color:"rgba(255,255,255,.5)", fontFamily:"monospace" }}>
                <span style={{ color:"rgba(255,255,255,.75)", fontWeight:600 }}>{u}</span>
                <span style={{ color:"rgba(255,255,255,.3)" }}> / </span>{p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
