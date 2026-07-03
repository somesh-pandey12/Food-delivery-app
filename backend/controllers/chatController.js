import axios from "axios";
import foodModel from "../models/foodModel.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const chatWithSomu = async (req, res) => {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
        return res.json({ success: false, reply: "Please type something! 😊" });
    }

    try {
        const foods = await foodModel.find({}).select("name price category -_id").limit(30);
        const menuContext = foods.map(f => `${f.name} (₹${f.price}, ${f.category})`).join(", ");

        const systemPrompt = `You are "Somu" — a friendly AI assistant for FoodVerse (a food delivery app).
Your job is to help customers with:
- How to place an order
- Information about menu items
- Order status/tracking related questions
- Common queries about payment (Razorpay/COD), refunds, delivery time
- If someone complains, politely address it and suggest contacting customer support (email/phone)

Current menu items (for reference): ${menuContext}

Language rules:
- Detect the language/style the user writes in (English, Hindi, or Hinglish) and reply in the SAME style
- By default, reply in clear, simple English
- Only switch to Hindi or Hinglish if the user's message is in Hindi or Hinglish
- Once a language preference is shown, keep using that style for the rest of the conversation

Other rules:
- Keep replies short and clear, don't write long paragraphs
- If you need order/account specific details you don't have, say "You can check your order status on the 'My Orders' page" or suggest contacting support
- Never make up fake order IDs, prices, or delivery times you don't actually know
- Use emojis sparingly, don't overdo it`;

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
            reply: "Sorry, something went wrong. Please try again in a bit! 🙏"
        });
    }
};

export { chatWithSomu };