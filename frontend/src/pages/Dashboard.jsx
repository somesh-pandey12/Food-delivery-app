import React, { useEffect, useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const Dashboard = ({ token }) => {
    const [availableOrders, setAvailableOrders] = useState([]);
    const [myOrders, setMyOrders] = useState([]);

    const fetchAvailable = async () => {
        const res = await axios.get(`${url}/api/delivery/available-orders`, { headers: { token } });
        if (res.data.success) setAvailableOrders(res.data.data);
    };

    const fetchMyOrders = async () => {
        const res = await axios.post(`${url}/api/delivery/my-orders`, {}, { headers: { token } });
        if (res.data.success) setMyOrders(res.data.data);
    };

    const acceptOrder = async (orderId) => {
        const res = await axios.post(`${url}/api/delivery/accept-order`, { orderId }, { headers: { token } });
        if (res.data.success) {
            alert("Order accepted!");
            fetchAvailable();
            fetchMyOrders();
        } else {
            alert(res.data.message);
        }
    };

    const updateStatus = async (orderId, status) => {
        const res = await axios.post(`${url}/api/delivery/update-status`,
            { orderId, deliveryStatus: status }, { headers: { token } });
        if (res.data.success) fetchMyOrders();
    };

    useEffect(() => {
        fetchAvailable();
        fetchMyOrders();
        const interval = setInterval(() => { fetchAvailable(); fetchMyOrders(); }, 10000); // 10 sec me refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Available Orders</h2>
            {availableOrders.map(order => (
                <div key={order._id} className="border p-4 rounded mb-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                        <p className="text-sm text-gray-500">{order.address.street}, {order.address.city}</p>
                        <p className="text-sm">₹{order.amount}</p>
                    </div>
                    <button onClick={() => acceptOrder(order._id)} className="bg-green-500 text-white px-4 py-2 rounded">
                        Accept
                    </button>
                </div>
            ))}

            <h2 className="text-2xl font-bold mt-8 mb-4">My Active Orders</h2>
            {myOrders.filter(o => o.deliveryStatus !== "Delivered").map(order => (
                <div key={order._id} className="border p-4 rounded mb-3">
                    <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                    <p className="text-sm text-gray-500">{order.address.street}</p>
                    <p className="text-sm font-bold text-orange-500">{order.deliveryStatus}</p>
                    <div className="flex gap-2 mt-2">
                        {order.deliveryStatus === "Assigned" &&
                            <button onClick={() => updateStatus(order._id, "Picked Up")} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Picked Up</button>}
                        {order.deliveryStatus === "Picked Up" &&
                            <button onClick={() => updateStatus(order._id, "On the way")} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">On the way</button>}
                        {order.deliveryStatus === "On the way" &&
                            <button onClick={() => updateStatus(order._id, "Delivered")} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Mark Delivered</button>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;