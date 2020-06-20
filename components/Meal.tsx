import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useApolloClient } from '@apollo/client'
import ButtonBase from '@material-ui/core/ButtonBase'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { Meal, useUpsert_CartMutation } from '../generated/graphql'
import { UPSERT_CART } from '../graphql/cart.mutation'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActions: {
justifyContent: 'flex-end'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  quantity: {
    '& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input': {
      borderBottom: '1px solid',
      borderRadius: '1px',
      width: 0,
      transition: 'width 0.3s',
      textAlign: 'center',
    },
    '& .badgeButton': {
      backgroundColor: 'red',
      margin: theme.spacing(1, 0, 1, 0),
      borderRadius: '50%',
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: 20,
    },
    '&:hover .status': {
      display: (props: { isInCart: boolean }) => (props.isInCart ? 'none' : ''),
    },
    '& .action': {
      display: 'none',
    },
    '&:hover .action': {
      display: (props: { isInCart: boolean }) => (props.isInCart ? 'initial' : 'none'),
    },
    '&:hover input': {
      width: (props: { isInCart: boolean }) => (props.isInCart ? theme.spacing(6) : ''),
    },
  },
}))

const Meals = ({
  id,
  title,
  description,
  price,
  imageUrl,
  cartStatus: { isInCart, cartQty },
}: Partial<Meal>) => {
  const client = useApolloClient()
  const [quantity, setQuantity] = useState(0)
  const [updateCart] = useUpsert_CartMutation()
  const classes = useStyles({ isInCart })
  const increment = () => {
    const plusOne = quantity + 1
    updateCart({
      variables: { id, quantity: plusOne },
    })
    setQuantity(plusOne)
  }
  const end = isInCart ? (
    <ButtonBase className="badgeButton status" aria-label="add to shopping cart">
      {cartQty}
    </ButtonBase>
  ) : (
    <IconButton
      className="status"
      color="primary"
      aria-label="add one to shopping cart"
      size="small"
      onClick={increment}
    >
      <AddCircleOutlineIcon fontSize="large" />
    </IconButton>
  )
  const startAdornment =
    cartQty === 1 ? (
      <IconButton
        className="action"
        color="primary"
        aria-label="add one to shopping cart"
        size="small"
        onClick={() => {
          const minusOne = quantity - 1
          updateCart({
            variables: { id, quantity: minusOne },
          })
          setQuantity(minusOne)
        }}
      >
        <DeleteForeverIcon fontSize="large" />
      </IconButton>
    ) : (
      <IconButton color="primary" aria-label="remove one from shopping cart" size="small" className="action">
        <RemoveCircleOutlineOutlinedIcon fontSize="large" />
      </IconButton>
    )
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
      <CardActions className={classes.cardActions}>
          <InputBase
            className={classes.quantity}
            id="quantity"
            type="number"
            value={quantity}
            onChange={(event) => {
              const quantity = parseInt(event.currentTarget.value, 10)
              updateCart({
                variables: { id, quantity },
              })
              setQuantity(quantity)
            }}
            startAdornment={startAdornment}
            endAdornment={
              <>
                <IconButton
                  color="primary"
                  aria-label="add one to shopping cart"
                  size="small"
                  className="action"
                  onClick={increment}
                >
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
                {end}
              </>
            }
            inputProps={{ max: 1000, min: 0, step: 1 }}
          />
        </CardActions>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl || 'https://source.unsplash.com/random'}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
        
      </Card>
    </Grid>
  )
}
export default Meals
