import React from 'react';
import ShowMore from "react-simple-show-more";
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid, CardHeader, CardMedia,
  CardContent, CardActions, IconButton,
  Typography, Menu, MenuItem, Card } from '@material-ui/core/';
import { Sizes, AddProductToCart } from '../containers';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '50vw'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    },
  },
  media: {
    paddingTop: '52.25%',
  },
  header: {
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
    lineHeight: '2.5ex',
    minHeight: '7.5ex',
    color: 'textSecondary',
    textAlign: 'justify',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
  price: {
    marginTop: 20,
  },
  sizes: {
    marginTop: 20,
  },
  showMore: {
    color: 'rgb(0, 123, 255)',
    fontFamily: 'gorditaRegular',
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    textTransform: 'uppercase',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    textIndent: 0,
    textShadow: 'none',
    textAlign: 'center',
    cursor: 'default',
    borderWidth: 2,
    borderStyle: 'none',
    backgroundColor: 'white',
    "&:hover": {
      backgroundColor: '#eee'
    },
  },
}));


const Product = (props) => {
  const {
    _id,
    image,
    title,
    price,
    description,
    removeProductFromStore,
    isAdmin,
  } = props;

  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item lg={4}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          titleTypographyProps={{variant: 'h4'}}
          action={
            (isAdmin &&
              <IconButton
                aria-label='settings'
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={title}
        />
        {(isAdmin &&
          <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => removeProductFromStore(_id)}>Remove</MenuItem>
          </Menu>
        )}
        <CardMedia
          className={classes.media}
          image={`images/${image}`}
          title={title}
        />
        <CardContent>
          <Grid className={classes.price} container justify='center'>
            <Typography variant='body1'>
              {price} $
            </Typography>
          </Grid>
          <Grid className={classes.sizes} container justify='center'>
            <Sizes productId={_id} />
          </Grid>
          <Grid container justify='center'>
            <Typography variant='body1' className={classes.description}>
              <ShowMore
                text={description}
                length={153}
                showMoreLabel=' SHOW MORE'
                showLessLabel=' SHOW LESS'
                tag='button'
                className={classes.showMore}
                variant='outlined'
                ellipsis='...'
                enabled
              />
            </Typography>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justify='center'>
            <AddProductToCart productId={_id}/>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
