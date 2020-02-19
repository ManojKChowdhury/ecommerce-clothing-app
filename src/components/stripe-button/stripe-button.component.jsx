import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_1RbNF0mldCUD6ue5Y0RKnuBt00huPHJADh';

    const onToken = token => {
        alert("Payment successful");
    };
    return (
        <StripeCheckout
            label='Pay Now'
            name='PEARL CLOTHING LTD.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}/>
    );
};

export default StripeCheckoutButton;
