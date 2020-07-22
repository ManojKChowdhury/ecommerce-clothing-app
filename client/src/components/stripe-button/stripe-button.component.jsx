import React from "react";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_1RbNF0mldCUD6ue5Y0RKnuBt00huPHJADh';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log('Payment errpr: ', JSON.parse(error));
            alert('Payment failed. Please make sure you use the provided credit card.');
        });
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
