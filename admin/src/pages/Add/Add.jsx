import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL || "https://your-backend-url.com";

const Add = () => {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            alert("Please upload a product image");
            return;
        }
        if (!data.name || !data.description || !data.price) {
            alert("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", Number(data.price));
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                alert("Product Added Successfully!");
                setData({ name: "", description: "", category: "Salad", price: "" });
                setImage(null);
            } else {
                alert(response.data.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Add Product Error:", error);
            alert("Error adding product. Please try again.");
        }
    };

    return (
        <div className="add-page-wrapper">
            <div className="add-page-header">
                <h2>Add New Dish</h2>
                <p>Upload a kitchen item to populate FoodVerse's dynamic food delivery catalog.</p>
            </div>

            <form className="add-form-element" onSubmit={onSubmitHandler}>

                <div className="flex-col">
                    <p className="input-field-title">Upload Product Image</p>
                    <label htmlFor="image" className="image-upload-dropzone">
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="uploaded-preview-img"
                            />
                        ) : (
                            <div className="upload-placeholder-content">
                                <span className="upload-icon">+</span>
                                <span className="upload-text">Choose File</span>
                            </div>
                        )}
                    </label>
                    <input
                        onChange={onImageChange}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        required
                    />
                </div>

                <div className="flex-col">
                    <p className="input-field-title">Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        className="styled-text-input"
                        placeholder="Type dish name here (e.g., Spicy Hakka Noodles)"
                        required
                    />
                </div>

                <div className="flex-col">
                    <p className="input-field-title">Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="4"
                        className="styled-textarea-input"
                        placeholder="Write clear, appetizing details about ingredients, taste, and portion size..."
                        required
                    />
                </div>

                <div className="form-dual-row-grid">
                    <div className="flex-col">
                        <p className="input-field-title">Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            className="styled-select-dropdown"
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="flex-col">
                        <p className="input-field-title">Product Price (₹)</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            className="styled-text-input"
                            placeholder="20"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="admin-submit-btn">
                    ADD PRODUCT
                </button>

            </form>
        </div>
    );
};

export default Add;