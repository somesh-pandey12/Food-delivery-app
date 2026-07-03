// File Location: frontend/src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import Somu from "./components/Somu/Somu";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {}
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

            {/* Global Context Application Wrapper */}
            <div
                className="app app-appwrapper"
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "'Outfit', sans-serif",
                    backgroundColor: "#fff"
                }}
            >
                {/* Global Executive Navbar */}
                <Navbar setShowLogin={setShowLogin} />

                {/* Main Dynamic Workspace Node */}
                <div
                    className="main-content"
                    style={{
                        flex: "1",
                        width: "84%",
                        margin: "0 auto",
                        padding: "40px 0px"
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<PlaceOrder />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/myorders" element={<MyOrders />} />
                    </Routes>
                </div>

                {/* Persistent Platform Footer */}
                <Footer />
            </div>
            <Somu />
        </>
    );
};

export default App;