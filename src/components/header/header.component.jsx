import React from "react";
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {auth} from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from "./header.styles";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to={'/'}>
            <Logo className={'logo'}/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink className={'option'} to={'/shop'}> SHOP </OptionLink>
            <OptionLink className={'option'} to={'/shop'}> CONTACT </OptionLink>
            {currentUser ?
                (<OptionLink as={'div'} onClick={() => auth.signOut()}>SIGN OUT</OptionLink>)
                :
                (<OptionLink to={'/signin'}>SIGN IN</OptionLink>)
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null :
                <CartDropdown/>
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)