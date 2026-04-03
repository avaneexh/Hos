import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;


        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }


        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "gbp", 
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items,

            mode: "payment",

            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,

            shipping_address_collection: {
                allowed_countries: ["GB"],
            },

            metadata: {
                orderType: "restaurant",
            },
        });

        res.status(200).json({
            id: session.id,
            url: session.url,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message || "Error creating checkout session",
        });
    }
};