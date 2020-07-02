import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Meal as MealType } from '../generated/graphql'
import CartQuantityControls from './CartQuantityControls'

const useStyles = makeStyles(() => ({
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
}))
interface MealProps extends Omit<MealType, 'id'> {
  id: string
}
const Meal = ({
  id,
  title,
  description,
  price,
  imageUrl,
  cartStatus: { isInCart, cartQty },
}: Partial<MealType>) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CartQuantityControls id={id} isInCart={isInCart} cartQty={cartQty} />
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
