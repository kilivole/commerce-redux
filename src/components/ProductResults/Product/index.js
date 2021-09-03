import { Link, useHistory } from "react-router-dom";
import Button from "../../forms/Button";
import { CardActions, IconButton, Card } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/cart.actions";



const Product = ( product ) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;

    if(!documentID || !productThumbnail || !productName ||
        typeof productPrice === 'undefined') return null;

     const configAddToCartBtn = {
         type: 'button'
     };   

     const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(
            addProduct(product)
        );
        history.push('/cart')
     };

    return(
        <Card className="product">
            <div className="thumb">
            <Link to={`/product/${documentID}`}>
                <img src={productThumbnail} alt={productName} />
            </Link>
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName} 
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                         $ {productPrice} 
                        </span>
                    </li>
                    <li>
                        <CardActions color="primary">
                        <IconButton ara-label="Add to cart" onClick={() => handleAddToCart(product)}>
                            <AddShoppingCart fontSize="large" />
                        </IconButton>
                        </CardActions>
                        {/* <div className="addToCart"> 
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div> */}
                    </li>
                </ul>
            </div>
           
        </Card>
    );
};

export default Product;