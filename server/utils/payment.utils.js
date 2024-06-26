const stripeAPI = require('stripe');

const stripeGateway = stripeAPI(process.env.STRIPE_SECRET_KEY);

const createStripeSession = async (cart, discount = 0) => {
    try {
        
        const cartData = cart
        const lineItems = cartData.map((item) => {
            console.log(item);
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

        const coupon = await stripeGateway.coupons.create({
            name:"Voucher the coffee day",
            currency:"usd",
            amount_off: 20 * 100,
            duration: 'once',
            "max_redemptions": 1,
          });
        console.log(coupon);
        console.log(lineItems);

        const session = await stripeGateway.checkout.sessions.create({

            payment_method_types: ['card'],
            mode: 'payment',
            discounts: [{
                coupon: "JYWn7Y2a"
                
            }],
            success_url: process.env.ORDER_SUCCESS,
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

async function testStripe() {
    const rate = await exchangeRate('vnd', 'usd');
    let result = await createStripeSession({
        items: [
            {
                name: 'Product test',
                price: 215000 * rate,
                quantity: 2,
                image: 'https://tressays.files.wordpress.com/2015/09/test-clip-art-cpa-school-test.png',
            },
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/fail',
    });

    console.log(result);
}

module.exports = { createStripeSession };