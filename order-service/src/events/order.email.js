import transporter from "../config/mail.js";

const sendOrderConfirmationEmail = async (
    email,
    orderData
) => {
    let productDetails = "";

    for (const item of orderData.items) {
        productDetails += `
Product ID: ${item.productId}
Quantity: ${item.quantity}
Price: ₹${item.price}

`;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Confirmation",
        text: `
Order Confirmed!

Order ID: ${orderData.orderId}

${productDetails}

Total Amount: ₹${orderData.totalAmount}

Thank you for your order!
        `,
    });

    console.log(
        `Order confirmation email sent to ${email}`
    );
};

export default sendOrderConfirmationEmail;