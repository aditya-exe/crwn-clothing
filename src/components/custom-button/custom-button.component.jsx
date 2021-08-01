import React from "react";
import './custom-button.styles.scss'

const CustomButton = ({childern, ...otherProps}) => (
    <button className={'custom-button'} {...otherProps}>
        {childern}
    </button>
)

export default CustomButton