import {
  CategoriesOwn,
  aoCategories,
  phuKienCategories,
  quanCategories,
} from '../../Categories/categories'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Link, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    width: '75%',
  },
  gridCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 500,
  },
  link: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 10,
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    fontFamily: 'Roboto',
  },
}))

interface Props {
  type: CategoriesOwn | 'myAccount'
}

export default function CategoryLinks({ type }: Props) {
  const { classes, cx } = useStyles()

  const categories =
    type === CategoriesOwn.Ao
      ? aoCategories
      : type === CategoriesOwn.Quan
      ? quanCategories
      : phuKienCategories

  if (type === 'myAccount') {
    return (
      <Grid item xs={3} className={classes.gridCol}>
        <Typography
          className={cx(classes.link, classes.label)}
          lineHeight={'19px'}>
          MY ACCOUNT
        </Typography>
        <Link component={RouterLink} to={`/account`} className={classes.link}>
          MY ORDERS
        </Link>
      </Grid>
    )
  }

  const categoryUrl = type.toLocaleLowerCase().split(' ').join('-')

  return (
    <Grid item xs={3} className={classes.gridCol}>
      <Link
        component={RouterLink}
        to={`/${categoryUrl}`}
        className={cx(classes.link, classes.label)}>
        {type}
      </Link>
      {categories.map((category) => (
        <Link
          component={RouterLink}
          to={`/${category.url}`}
          className={classes.link}>
          {category.name}
        </Link>
      ))}
    </Grid>
  )
}
