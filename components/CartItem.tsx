import CartQuantityControls from './CartQuantityControls'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import { Meal as MealType } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}))

export default function CartItem({
  id,
  title,
  description,
  price,
  imageUrl,
  cartStatus: { isInCart, cartQty },
}: any) {
  const classes = useStyles()

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={title} src={imageUrl} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography component="span" variant="body2" color="textPrimary">
              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price)}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography component="span" variant="body2" color="textPrimary">
              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price * cartQty)}
            </Typography>
          }
        />
      </ListItem>
      <CartQuantityControls id={id} isInCart={isInCart} cartQty={cartQty} collapsible={false} />
      <Divider variant="inset" component="li" />
    </div>
  )
}
