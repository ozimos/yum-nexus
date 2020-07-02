import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ButtonBase from '@material-ui/core/ButtonBase'
import AddIcon from '@material-ui/icons/Add'
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined'
import * as z from 'zod'
import NumberFormat from 'react-number-format'
import { useDebouncedCallback } from 'use-lodash-debounce'
import ClearIcon from '@material-ui/icons/Clear'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { useUpsert_CartMutation, useRemove_Cart_MealMutation } from '../generated/graphql'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  quantityButton: {
    backgroundColor: theme.palette.button.main,
    border: `solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.button.dark,
    },
  },
  root: {
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
      backgroundColor: theme.palette.button.main,
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

    '& input:hover': {
      backgroundColor: theme.palette.button.dark,
    },
  },
  collapsible: {
    position: 'absolute',
    justifyContent: 'flex-end',
    margin: theme.spacing(0.5, 1),
    right: 0,
    zIndex: 1,
    '& input': {
      opacity: 0,
      width: 0,
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
  },
  alwaysVisible: {
    '& input': {
      width: theme.spacing(6),
      borderWidth: 2,
    },
  },
}))
const mealQuantity = z.number().int().min(1).max(1000)

interface CartQuantityControlsProps {
  id: string
  collapsible?: boolean
  isInCart: boolean
  cartQty: number
}

const CartQuantityControls = ({ id, collapsible = true, isInCart, cartQty }: CartQuantityControlsProps) => {
  const [updateCart] = useUpsert_CartMutation()
  const [removeFromCart] = useRemove_Cart_MealMutation()
  const [debouncedIsInCart, setDebouncedIsInCart] = useState(isInCart)
  const classes = useStyles({ isInCart })

  const delayedIsInCart = useDebouncedCallback((isInCart) => {
    setDebouncedIsInCart(isInCart)
  }, 2000)
  const remove = () => {
    removeFromCart({
      variables: { id },
    })
    delayedIsInCart(false)
  }

  const changeCartQuantity = (quantity: any) => {
    if (mealQuantity.check(quantity)) {
      delayedIsInCart(true)
      return updateCart({
        variables: { id, quantity },
      })
    }
    remove()
  }
  const increment = () => {
    const plusOne = cartQty + 1
    changeCartQuantity(plusOne)
  }
  const decrement = () => {
    const minusOne = cartQty - 1
    changeCartQuantity(minusOne)
  }
  const debouncedCartUpdate = useDebouncedCallback(changeCartQuantity, 800)
  const handleValueChange = (value: any) => debouncedCartUpdate(value?.floatValue)

  const endAdornment = (
    <>
      {isInCart && collapsible ? (
        <ButtonBase className="badgeButton status" aria-label="shopping cart quantity">
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
      )}
      {debouncedIsInCart && (
        <IconButton
          className={classes.quantityButton}
          color="primary"
          aria-label="add one to shopping cart"
          size="small"
          onClick={remove}
        >
          <ClearIcon />
        </IconButton>
      )}
    </>
  )
  const startAdornment = cartQty > 1 && (
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
    <InputBase
      className={clsx(classes.root, collapsible ? classes.collapsible : classes.alwaysVisible)}
      startAdornment={startAdornment}
      endAdornment={
        <>
          {collapsible && (
            <IconButton
              color="primary"
              aria-label="add one to shopping cart"
              size="small"
              className={clsx(classes.quantityButton, 'action')}
              onClick={increment}
            >
              <AddIcon />
            </IconButton>
          )}
          {endAdornment}
        </>
      }
      inputComponent={({ inputRef, ...props }) => <NumberFormat getInputRef={inputRef} {...props} />}
      inputProps={{
        onValueChange: handleValueChange,
        value: cartQty,
        type: 'text',
        id: `quantity:${id}`,
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        isNumericString: true,
        'aria-label': 'meal quantity input',
      }}
    />
  )
}
export default CartQuantityControls
