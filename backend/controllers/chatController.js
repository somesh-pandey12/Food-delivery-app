import axios from "axios";
import foodModel from "../models/foodModel.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const chatWithSomu = async (req, res) => {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
        return res.json({ success: false, reply: "Kuch to likho! 😊" });
    }

    try {

        const foods = await foodModel.find({}).select("name price category -_id").limit(30);
        const menuContext = foods.map(f => `${f.name} (₹${f.price}, ${f.category})`).join(", ");

        const systemPrompt = `Tum "Somu" ho — FoodVerse (ek food delivery app) ka friendly AI assistant.
Tumhara kaam hai customers ki help karna:
- Order kaise place karein
- Menu items ke baare me batana
- Order status/tracking se related sawalo ka jawab dena
- Payment (Razorpay/COD), refund, delivery time jaise common queries solve karna
- Agar koi complaint kare to politely samjhao aur customer support (email/phone) suggest karo

Current menu items (reference ke liye): ${menuContext}

Rules:
- Hamesha Hindi-English mix (Hinglish) me friendly tone se baat karo, jaisa India me log baat karte hain
- Jawab chhote aur clear rakho, zyada lamba mat likho
- Agar order ya account specific detail chahiye jo tumhe pata nahi, to bolo "Apne order ka status 'My Orders' page pe dekh sakte ho" ya "Support team se contact karo"
- Kabhi bhi fake order ID, price, ya delivery time mat banao jo tumhe pata na ho
- Emojis thoda use karo lekin overdo mat karo`;
        const messages = [
            { role: "system", content: systemPrompt },
            ...(history || []).slice(-6), 
            { role: "user", content: message }
        ];

        const response = await axios.post(
            GROQ_API_URL,
            {
                model: "llama-3.3-70b-versatile",
                messages: messages,
                temperature: 0.7,
                max_tokens: 300
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ success: true, reply });

    } catch (error) {
        console.error("❌ Somu Chat Error:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            reply: "Sorry yaar, abhi thoda issue aa raha hai. Thodi der baad try karo! 🙏"
        });
    }
};

export { chatWithSomu };