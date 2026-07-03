import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryList.css";

const DeliveryList = ({ url }) => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAll = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${url}/api/delivery/all`);
            if (res.data.success) {
                setDeliveryBoys(res.data.data);
            } else {
                setError(res.data.message || "Failed to load delivery partners");
            }
        } catch (err) {
            console.error("Error fetching delivery partners:", err);
            setError("Could not connect to server. Check backend URL / route.");
        } finally {
            setLoading(false);
        }
    };

    const approve = async (id) => {
        try {
            const res = await axios.post(`${url}/api/delivery/approve`, { id });
            if (res.data.success) {
                fetchAll();
            }
        } catch (err) {
            alert("Error approving delivery partner");
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="delivery-list-wrapper">
            <div className="delivery-list-header">
                <h2>Delivery Partners</h2>
                <p>Manage and approve delivery partner registrations.</p>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && deliveryBoys.length === 0 && (
                <div className="empty-state">
                    <p>No delivery partners registered yet.</p>
                </div>
            )}

            {!loading && !error && deliveryBoys.length > 0 && (
                <div className="delivery-list">
                    {deliveryBoys.map((d) => (
                        <div key={d._id} className="delivery-card">
                            <div className="delivery-info">
                                <div className="delivery-avatar">{d.name.charAt(0)}</div>
                                <div>
                                    <p className="delivery-name">{d.name}</p>
                                    <p className="delivery-meta">{d.phone} • {d.email}</p>
                                    {d.vehicleNumber && (
                                        <p className="delivery-meta">Vehicle: {d.vehicleNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="delivery-actions">
                                <span className={`status-badge ${d.isApproved ? "approved" : "pending"}`}>
                                    {d.isApproved ? "✅ Approved" : "⏳ Pending"}
                                </span>
                                {!d.isApproved && (
                                    <button onClick={() => approve(d._id)} className="approve-btn">
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryList;