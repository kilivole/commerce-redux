import {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, Badge, AppBar } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import AdminToolbar from '../AdminToolbar';
import './styles.scss';

import Logo from './../../assets/logo.png';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    useEffect(() => {
        setActiveMenu(false);
    }, [location]);
      

    return(
        <AppBar position="sticky">   
        <AdminToolbar/>
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="commerce"/>
                    </Link>
                </div>

            <nav className={`mainMenu ${activeMenu ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            Search
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="callToActions">

                <ul>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalNumCartItems} color="secondary">
                                <ShoppingCart fontSize="large" />
                            </Badge>
                    </IconButton>

                <li>
                    {/* <Link to="/cart">
                        Your Cart ({totalNumCartItems})
                        <i class="fas fa-shopping-basket"></i>
                    </Link> */}
                </li>

                {currentUser && [   
                    <li key={1} className="hideOnMobile">
                            <Link to="/dashboard">
                                My Account
                                <i class="fas fa-user-circle"></i>
                            </Link>
                        </li>,
                        <li>
                            <span onClick={() => signOut()}>
                            <Link to="/">
                                LogOut
                                <i class="fas fa-sign-out-alt"></i>
                            </Link>
                            </span>
                        </li>
                ]} 
                {!currentUser && [
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>,
                        <li>
                            <Link to="/login">
                                Login
                                <i class="fas fa-user-circle"></i>
                            </Link>
                        </li>
               ]}   
                
               <li className="mobileMenu">
                <span onClick={() => setActiveMenu(!activeMenu)}>
                    <i className="fas fa-bars"></i>
                </span>
                </li>
                             
                </ul>

            </div>
            </div>
        </header>
        </AppBar>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;