import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {

    const sidebarStyle = {
        width: "18vw",
        minWidth: "220px",
        minHeight: "calc(100vh - 70px)",
        borderRight: "1px solid #eef0f2",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        paddingTop: "28px",
        paddingLeft: "16px",
        paddingRight: "16px"
    };

    const sectionLabelStyle = {
        fontSize: "11px",
        fontWeight: "700",
        color: "#9ca3af",
        letterSpacing: "1px",
        textTransform: "uppercase",
        margin: "0 0 12px 8px"
    };

    const linkStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        border: isActive ? "1px solid #ffd9c2" : "1px solid transparent",
        borderRadius: "10px",
        textDecoration: "none",
        color: isActive ? "#ff5722" : "#4b5563",
        fontWeight: isActive ? "600" : "500",
        fontSize: "14.5px",
        backgroundColor: isActive ? "#fff1e9" : "transparent",
        transition: "all 0.2s ease",
        marginBottom: "4px"
    });

    const iconWrapStyle = (isActive) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        fontSize: "16px",
        filter: isActive ? "none" : "grayscale(20%)"
    });

    return (
        <div className='sidebar' style={sidebarStyle}>
            <p style={sectionLabelStyle}>Menu</p>
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option" style={linkStyle}>
                    {({ isActive }) => (
                        <>
                            <span style={iconWrapStyle(isActive)}>➕</span>
                            <p style={{ margin: 0 }}>Add Items</p>
                        </>
                    )}
                </NavLink>

                <NavLink to='/list' className="sidebar-option" style={linkStyle}>
                    {({ isActive }) => (
                        <>
                            <span style={iconWrapStyle(isActive)}>📋</span>
                            <p style={{ margin: 0 }}>List Items</p>
                        </>
                    )}
                </NavLink>

                <NavLink to='/orders' className="sidebar-option" style={linkStyle}>
                    {({ isActive }) => (
                        <>
                            <span style={iconWrapStyle(isActive)}>🚚</span>
                            <p style={{ margin: 0 }}>Orders Management</p>
                        </>
                    )}
                </NavLink>

                <NavLink to='/delivery-partners' className="sidebar-option" style={linkStyle}>
                    {({ isActive }) => (
                        <>
                            <span style={iconWrapStyle(isActive)}>🛵</span>
                            <p style={{ margin: 0 }}>Delivery Partners</p>
                        </>
                    )}
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;