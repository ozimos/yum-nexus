import { useMemo } from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CartItem from './CartItem'
import { useCartQuery, Meal as MealType } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  root: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   '&>*': {
    //     flex: '0 0 auto',
    //   },
    width: 500,
  },
  list: {
    width: '100%',
    maxWidth: '50ch',
    backgroundColor: theme.palette.background.paper,
  }
}))
const EmptyCartDiv = () => {
  return (
    <div>
      <p>Your cart is empty</p>
      <p>Please add some items from the product listing</p>
    </div>
  )
}
export default function Cart() {
  const classes = useStyles()
  const { data } = useCartQuery()
  let meals: any[] = []
  if (data?.cart?.meals) {
    ;({ meals } = data.cart)
  }
  const cartTotal = useMemo(() => {
    if (data?.cart?.meals) {
      const sum = data.cart.meals.reduce(function (a, b) {
        return a + b.price * (b.cartStatus?.cartQty || 0)
      }, 0)
      return sum
    }
    return 0
  }, [data])
  const isCartEmpty = meals?.length < 1
  return (
    <div className="">
      <Typography component="span" variant="body2"  color="textPrimary">
              Total: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(cartTotal)}
            </Typography>
      <div className="">
        {isCartEmpty ? (
          <EmptyCartDiv />
        ) : (
          meals.map((meal) => (
            <div key={meal.id}>
              <List className={classes.list}>
                <CartItem {...meal} />
              </List>
            </div>
          ))
        )}
      </div>
      <div style={{ display: isCartEmpty ? 'none' : 'block' }} className="">
        <Button className="">Proceed to checkout</Button>
      </div>
    </div>
  )
}
