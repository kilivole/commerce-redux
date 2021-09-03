import './styles.scss';
import { Button } from '@material-ui/core';

const Buttons = ({ children, ...otherProps }) => {
    return(
        <Button style={{ fontSize: '15px' }} fullWidth variant="contained" color="primary" {...otherProps}>
            {children}
        </Button>
    );
}

export default Buttons;