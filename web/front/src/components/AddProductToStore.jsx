import { Input, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useRef } from 'react'
import MaskedInput from 'react-text-mask';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  imageButton: {
    marginTop: 10,
  },
  title: {
    marginBottom: 10,
  },
  imageInput: {
    display: 'none',
  }
}));

const SizesMask = ({inputRef, ...other}) => {
  return (
    <MaskedInput
      {...other}
      ref={ref => inputRef(ref ? ref.inputElement : null)}
      mask={Array(20).fill([/\d/, /\d/, ' ']).flat()}
      placeholderChar={'\u2000'}
    />
  )
};

const PriceMask = ({inputRef, ...other}) => {
  return (
    <MaskedInput
      {...other}
      ref={ref => inputRef(ref ? ref.inputElement : null)}
      mask={Array(20).fill([/\d/]).flat()}
      placeholderChar={'\u2000'}
    />
  )
}

const AddProductToStore = ({addProduct, showAddProductToStore, toogleShowAddProductToStore}) => {
  const classes = useStyles();
  let iref = useRef();

	const onSubmit = e => {
    e.preventDefault();

    const title = iref.querySelector('[name="title"]').value;
    const description = iref.querySelector('[name="description"]').value;
    const price = iref.querySelector('[name="price"]').value;
    const sizes = iref.querySelector('[name="sizes"]').value.replaceAll('_', '').trim();
    const image = iref.querySelector('[name="image"]').files[0];

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
    formData.append('price', price);
		formData.append('sizes', sizes);
		formData.append('image', image);

		addProduct(formData);
	}

  const handleClose = () => {
  	toogleShowAddProductToStore();
  }

  return (
    <Dialog open={showAddProductToStore} onClose={handleClose} aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Add product</DialogTitle>
        <DialogContent ref={node => iref = node}>
          <TextField
            className={classes.title}
          	name='title'
            label="Title"
            fullWidth
            variant="outlined"
          />
          <TextField
          	name='description'
            label="Description"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
          />
          <Input
            name='price'
            label='Price'
            inputComponent={PriceMask}
            fullWidth
          />
          <Input
            name='sizes'
            label='Sizes'
            placeholder='39 40 43 44'
            inputComponent={SizesMask}
            fullWidth
          />
          <input
            className={classes.imageInput}
            accept='image/*'
          	label='image'
          	type='file'
          	name='image'
            id="image"
        	/>
          <label htmlFor="image">
            <Button component='span' variant='outlined' className={classes.imageButton}>
              Image
            </Button>
          </label> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProductToStore;
