import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../redux/Products/products.actions';
import { TextField, Grid } from '@material-ui/core';
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import LoadMore from '../LoadMore';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const useStyles = makeStyles((theme) => ({
    gridMargin: {
        margin: '0 0.6rem',
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

const ProductResults = ({}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    };

    if (!Array.isArray(data)) return null;
    if (data.length < 1) {
        return (
            <Grid container justifyContent="center" spacing={6}>
                <p>
                    No search results.
                </p>
            </Grid>
        );
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value:''
        },
        {
            name: 'Mens',
            value: 'mens'
        },
        {
            name: 'Womens',
            value: 'womens'
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ 
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data 
        })
        )
    };
    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
        }

    return(

        <main className={classes.content}>

        <h1>
            Browse Products
        </h1>

        {/* <TextField id="standard-basic" label="Search items..." /> */}

            <Grid container justifyContent="center" spacing={4}>
        <FormSelect {...configFilters} />
                {data.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName ||
                    typeof productPrice === 'undefined') return null;

                    const configProduct = {
                        ...product
                    };

                    return(
                        <Grid className={classes.gridMargin} xs={12} sm={6} md={4} lg={3}>
                            <Product {...configProduct} />
                        </Grid>
                    );
                })}
                </Grid>
            {!isLastPage && (
               <LoadMore {...configLoadMore}/>         
            )}
            
        </main>
    );
};

export default ProductResults;