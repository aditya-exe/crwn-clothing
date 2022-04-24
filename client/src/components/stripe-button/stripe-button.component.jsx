import React from 'react'
import StripeCheckout from "react-stripe-checkout"
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51KDmGPSFjfuSWJo8kvFeY9KKyzzxTav9D3vWUNUvLxiGhUZBDYcfEJ0N658NL7EMRqWzksTXLh5UFZVvlZ207Gqd00JwloW1PD'

    const onToken = token => {
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response=>{
            alert('Payment Successful')
        }).catch(error=>{
            console.log('Payment error: ', JSON.parse(error))
            alert('here was an issue with the payment. Please make sure you use the provided credit card')
        })
    }

    return (
        <StripeCheckout
            label={'Pay Now'}
            name={'CRWN Clothing'}
            billingAddress
            shippingAddress
            image={"https://svgshare.com/i/CUz.svg"}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel={'Pay Now'}
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton