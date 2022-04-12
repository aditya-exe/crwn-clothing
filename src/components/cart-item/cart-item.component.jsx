import React from 'react'
import {CartIconContainer, ItemCountContainer} from "../cart-icon/cart-icon.styles";
import {CartItemImage} from "./cart-item.styles";


const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartIconContainer>
        <CartItemImage src={imageUrl} alt={'item'}/>
        <ItemCountContainer>
            <span>{name}</span>
            <span>{quantity} x ${price}</span>
        </ItemCountContainer>
    </CartIconContainer>
)

export default CartItem