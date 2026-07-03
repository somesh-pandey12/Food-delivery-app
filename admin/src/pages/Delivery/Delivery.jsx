import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "https://your-backend-url.com";

const DeliveryList = () => {
    const [deliveryBoys, setDeliveryBoys] = useState([]);

    const fetchAll = async () => {
        const res = await axios.get(`${url}/api/delivery/all`);
        if (res.data.success) setDeliveryBoys(res.data.data);
    };

    const approve = async (id) => {
        await axios.post(`${url}/api/delivery/approve`, { id });
        fetchAll();
    };

    useEffect(() => { fetchAll(); }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Partners</h2>
            {deliveryBoys.map(d => (
                <div key={d._id} className="border p-3 rounded mb-2 flex justify-between items-center">
                    <div>
                        <p>{d.name} - {d.phone}</p>
                        <p className="text-sm text-gray-500">{d.isApproved ? "✅ Approved" : "⏳ Pending"}</p>
                    </div>
                    {!d.isApproved &&
                        <button onClick={() => approve(d._id)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>}
                </div>
            ))}
        </div>
    );
};

export default DeliveryList;