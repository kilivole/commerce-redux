import './styles.scss';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Button, Select, FormControl, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  inputLabel: {
    display: 'block',
    marginTop: theme.spacing(2),
    fontSize: 15,
    color: 'black',
    textTransform:'uppercase',
    marginBottom: 8,

  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
    fontSize: 15,
  },
  menuItem: {
    fontSize: 15,
  }
}));

const FormSelect = ({ options, defaultValue, handleChange, label, ...otherProps }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);



  if (!Array.isArray(options) || options.length < 1) return null;

  return (
   <div className="formRow">
  {/* <> */}
      <InputLabel className={classes.inputLabel}>
        Filter items
      </InputLabel>
      <FormControl className={classes.formControl}>
      {label && (
        <InputLabel>
          {label}
        </InputLabel>
      )}

      <Select className="formSelect" value={defaultValue} onChange={handleChange} {...otherProps}>
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <MenuItem className={classes.menuItem} key={index} value={value}>{name}</MenuItem>
          );
        })}
      </Select>
      </FormControl>
     {/* </> */}
   </div>
  );
}

export default FormSelect; 