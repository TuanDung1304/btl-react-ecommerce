import {
  AO_CATEGORIES,
  CategoryType,
  PHU_KIEN_CATEGORIES,
  QUAN_CATEGORIES,
} from '../../Categories/categories'
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
  type: CategoryType | 'myAccount'
}

export default function CategoryLinks({ type }: Props) {
  const { classes, cx } = useStyles()

  const categories =
    type === CategoryType.Ao
      ? AO_CATEGORIES
      : type === CategoryType.Quan
      ? QUAN_CATEGORIES
      : PHU_KIEN_CATEGORIES

  if (type === 'myAccount') {
    return (
      <Grid item xs={3} className={classes.gridCol}>
        <Typography
          className={cx(classes.link, classes.label)}
          lineHeight={'19px'}>
          MY ACCOUNT
        </Typography>
        <Link href={`/account`} className={classes.link}>
          MY ORDERS
        </Link>
      </Grid>
    )
  }

  const [titleCategory, ...restCategories] = categories

  return (
    <Grid item xs={3} className={classes.gridCol}>
      <Link
        href={`/collections/${titleCategory.url}`}
        className={cx(classes.link, classes.label)}>
        {type}
      </Link>
      {restCategories.map((category) => (
        <Link href={`/collections/${category.url}`} className={classes.link}>
          {category.name}
        </Link>
      ))}
    </Grid>
  )
}
