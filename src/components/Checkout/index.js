import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectCartItems, selectCartTotal } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../forms/Button';
import Item from './Item';
import './styles.scss';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const useStyles = makeStyles((theme) => ({
    gridMargin: {
        margin: '1rem 0',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
  }));

const Checkout = ({}) => {
    const classes = useStyles();

    const { cartItems, total} = useSelector(mapState);
    const history = useHistory();
    
    const errMsg = "You've got nothing in the cart";

    return (
        <div className="checkout">
            <h1>
                Your Shopping Cart
            </h1>
            <div className="cart">
            {cartItems.length > 0 ? (
                <table  border="0" cellPadding="0" cellSpacing="0">
                    <tbody>

                        <tr>
                        <table className="checkoutHeader" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <th>
                                        Product
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Quantity
                                    </th>
                                    <th>
                                        Price
                                    </th>
                                    <th>
                                        Remove
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        </tr>

                        <tr>
                            <table border="0" cellSpacing="0" cellPadding="0">
                                    <tbody>
                                        {cartItems.map((item, pos) =>{
                                            return(
                                                <tr key={pos}>
                                                    <Paper className={classes.gridMargin}>
                                                        <Item {...item} />
                                                    </Paper>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                            </table>
                        </tr>

                        <tr>
                            <table align="right" border="0" cellSpacing="0" cellPadding="10">
                                <tr align="right">
                                    <td>
                                        <h3>
                                            Total: ${total}
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <table border="0" cellPadding="10" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Button onClick={() => history.goBack()}>
                                                        Continue shopping
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button onClick={() => history.push('/payment')}>
                                                        Checkout
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            </table>
                        </tr>

                    </tbody>
                </table>
            ) :(
                <p>
                    {errMsg}
                </p>
            )}
            </div>
        </div>
    );
};

export default Checkout;