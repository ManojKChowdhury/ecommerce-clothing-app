import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from "./pages/signing/signing.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from './components/header/header.component';
import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";

const App = ({checkUserSession, currentUser}) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    const signInElement = React.useMemo(
        () => () => (currentUser ? <Navigate to='/' /> : <SignInAndSignUp />),
        [currentUser]
    );

    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/shop/*' element={<ShopPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/signin'
                       element={signInElement()}/>
            </Routes>
        </div>
    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
