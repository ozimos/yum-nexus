import React, { useState, ChangeEventHandler, MouseEventHandler } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'
import AddIcon from '@material-ui/icons/Add'
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined'
import * as z from 'zod'
import NumberFormat from 'react-number-format'
import ClearIcon from '@material-ui/icons/Clear'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { Meal as MealType, useUpsert_CartMutation, useRemove_Cart_MealMutation } from '../generated/graphql'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
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
  quantityButton: {
    backgroundColor: '#fafdfdbb',
    '&:hover': {
      backgroundColor: '#faffff',
    },
  },
  quantity: {
    position: 'absolute',
    justifyContent: 'flex-end',
    margin: theme.spacing(0.5, 1),
    right: 0,
    zIndex: 1,
    '& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input': {
      border: '0 solid',
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      borderRadius: 10,
      backgroundColor: '#fafdfdbb',
      opacity: 0,
      width: 0,
      transition: 'width 300ms, opacity 100ms',
      textAlign: 'center',
    },
    '& .badgeButton': {
      backgroundColor: 'red',
      padding: theme.spacing(0, 1),
      borderRadius: theme.spacing(1.75),
      minWidth: theme.spacing(3.5),
      width: 'min-content',
      height: theme.spacing(3.5),
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
      borderWidth: (props: { isInCart: boolean }) => (props.isInCart ? '2px' : 0),
      opacity: 1,
    },
    '& input:hover': {
      backgroundColor: '#faffff',
    },
  },
}))
const mealQuantity = z.number().int().min(1).max(1000)
const mealQuantityInput = z.union([mealQuantity, z.literal('')])
type MealQuantityInput = z.infer<typeof mealQuantityInput>
const Meal = ({
  id,
  title,
  description,
  price,
  imageUrl,
  cartStatus: { isInCart, cartQty },
}: Partial<MealType>) => {
  const [quantity, setQuantity] = useState(0)
  const [updateCart] = useUpsert_CartMutation()
  const [removeFromCart] = useRemove_Cart_MealMutation()
  const classes = useStyles({ isInCart })
  const changeQuantity = (quantity: MealQuantityInput) => {
    setQuantity(quantity)
    console.log('changeQuantity', quantity)
    if (mealQuantity.check(quantity)) {
      updateCart({
        variables: { id, quantity },
      })
    }
  }
  const remove = () => {
    removeFromCart({
      variables: { id },
    })
    setQuantity(0)
  }
  const increment = () => {
    const plusOne = quantity + 1
    changeQuantity(plusOne)
  }
  const decrement = () => {
    const minusOne = quantity - 1
    changeQuantity(minusOne)
  }
  const handleInputChange = (value) => {
    // const quantity = parseInt(event.currentTarget.value, 10)
    const quantity = value?.formattedValue
    // const parsedQuantity = mealQuantityInput.check(quantity) ? quantity : ''
    changeQuantity(quantity)
  }
  const end = isInCart ? (
    <ButtonBase className="badgeButton status" aria-label="add to shopping cart">
      {cartQty}
    </ButtonBase>
  ) : (
    <IconButton
      className={clsx(classes.quantityButton, 'status')}
      color="primary"
      aria-label="add one to shopping cart"
      size="small"
      onClick={increment}
    >
      <AddIcon />
    </IconButton>
  )
  const startAdornment =
    cartQty === 1 ? (
      <IconButton
        className={clsx(classes.quantityButton, 'action')}
        color="primary"
        aria-label="add one to shopping cart"
        size="small"
        onClick={remove}
      >
        <ClearIcon />
      </IconButton>
    ) : (
      <IconButton
        color="primary"
        aria-label="remove one from shopping cart"
        size="small"
        className={clsx(classes.quantityButton, 'action')}
        onClick={decrement}
      >
        <RemoveOutlinedIcon />
      </IconButton>
    )
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <InputBase
          className={classes.quantity}
          startAdornment={startAdornment}
          endAdornment={
            <>
              <IconButton
                color="primary"
                aria-label="add one to shopping cart"
                size="small"
                className={clsx(classes.quantityButton, 'action')}
                onClick={increment}
              >
                <AddIcon />
              </IconButton>
              {end}
            </>
          }
          inputComponent={(props) => (
            <>
              <NumberFormat {...props} />
            </>
          )}
          inputProps={{
            max: 1000,
            min: 0,
            step: 1,
            onValueChange: handleInputChange,
            value: quantity,
            type: 'text',
            id: `quantity:${id}`
          }}
        />
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
export default Meal