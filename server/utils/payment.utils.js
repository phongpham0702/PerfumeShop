const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeSession = async (orderId, cart, voucher = null) => {
    try {
        
        const cartData = cart
        const lineItems = cartData.map((item) => {
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productName +" - "+item.modelCapacity,
                        images: [item.productThumbnail || 'https://react.semantic-ui.com/images/wireframe/square-image.png'],
                    },
                    unit_amount_decimal: item.unitPrice * 100, // cent -> dollar
                },
                quantity: item.quantity,
            };
        });

        const coupon = voucher.discount_value ? await stripe.coupons.create({
            name: voucher.name ? voucher.name : "Discount voucher",
            currency:"usd",
            amount_off: voucher.discount_value * 100,
            duration: 'once',
            max_redemptions: 1,
          }) : null ;
   
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],
            mode: 'payment',
            discounts: coupon ? [{
                coupon: coupon.id
                
            }] : undefined,
            success_url: `${process.env.ORDER_SUCCESS}/?token=${orderId}&vid=${coupon?coupon.id:""}`,
            cancel_url: process.env.ORDER_FAIL,
            line_items: lineItems,
        
            //  Asking address in Stripe
            billing_address_collection: 'required',
        });

        // console.log('Stripe Payment Created');

        return session.url;
    } catch (error) {
        console.error("Creating Stripe session error: " + error);
        return null;
    }
};

module.exports = { createStripeSession };