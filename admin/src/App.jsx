import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import DeliveryList from './pages/Delivery/DeliveryList'

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "https://foodverse-mern-app.onrender.com";

  return (
    <div className='admin-app' style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>

      <div className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4%", backgroundColor: "white", borderBottom: "1px solid #e4e4e4" }}>
        <h2 style={{ color: "#ff4321", fontWeight: "700", margin: 0, fontSize: "24px", display: "flex", alignItems: "center" }}>
          FoodVerse.
          <span style={{ fontSize: "12px", color: "#656565", fontWeight: "500", border: "1px solid #656565", padding: "2px 6px", borderRadius: "4px", marginLeft: "5px" }}>
            ADMIN PANEL
          </span>
        </h2>
        <img src="https://placehold.co/40x40?text=Admin" alt="profile" style={{ width: "40px", borderRadius: "50%" }} />
      </div>

      <div className="app-content" style={{ display: 'flex', width: "100%" }}>
        <Sidebar />

        <div className="page-container" style={{ flexGrow: 1, padding: '40px', backgroundColor: "#fcfcfc", minHeight: "calc(100vh - 65px)" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/delivery-partners" element={<DeliveryList url={url} />} />
            <Route path="*" element={<Navigate to="/add" />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App;