import React, { useState } from "react";
import axios from "axios";

const url = "https://your-backend-url.com"; // apna backend URL daalo

const DeliveryLogin = ({ setToken }) => {
    const [data, setData] = useState({ email: "", password: "" });

    const onChangeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${url}/api/delivery/login`, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("deliveryToken", response.data.token);
        } else {
            alert(response.data.message);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 border rounded-xl">
            <h2 className="text-xl font-bold">Delivery Partner Login</h2>
            <input name="email" onChange={onChangeHandler} placeholder="Email" className="border p-2 rounded" required />
            <input name="password" type="password" onChange={onChangeHandler} placeholder="Password" className="border p-2 rounded" required />
            <button className="bg-orange-500 text-white p-2 rounded font-bold">Login</button>
        </form>
    );
};

export default DeliveryLogin;