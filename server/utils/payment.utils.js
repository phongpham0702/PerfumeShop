const stripeAPI = require('stripe');

const stripeGateway = stripeAPI(process.env.STRIPE_API_KEY);

// Params: options
// {
//     items (name, price, quantity, image?) - [Danh sách sản phẩm],
//     success_url, cancel_url - [Callback url]
// }
const createStripeSession = async (cart, options = {success_url,cancel_url}) => {
    try {
        const {success_url, cancel_url } = options;
        const cartData = cart
        const lineItems = items.map((item) => {
            const unitAmount = Math.round(item.price * 100);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image || 'https://react.semantic-ui.com/images/wireframe/square-image.png'],
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            };
        });

        // console.log(lineItems);

        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            line_items: lineItems,
            //  Asking address in Stripe
            billing_address_collection: 'required',
        });

        // console.log('Stripe Payment Created');

        return session.url;
    } catch (error) {
        console.log(error);
        return undefined;
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

async function testPaypal() {
    const rate = await exchangeRate('vnd', 'usd');
    let result = await createPaypalSession({
        items: [
            {
                name: 'Product test',
                price: 200000 * rate,
                quantity: 2,
            },
        ],
        total: 400000 * rate,
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/fail',
    });

    console.log(result);
}

module.exports = { createStripeSession };