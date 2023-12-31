import { Box, Grid, colors } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CategoryType } from '../../../consts'
import CategoryLinks from './CategoryLinks'

const useStyles = makeStyles()(() => ({
  root: {
    width: '85%',
    borderTop: `1px solid ${colors.grey[300]}`,
    padding: '35px 0',
    marginTop: 20,
  },
  gridContainer: {
    padding: '0 30px',
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
  about: {
    width: '100%',
    borderTop: `1px solid ${colors.grey[300]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '22px 0',
  },
  designedBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 5px',
  },
}))

export default function Footer() {
  const { classes } = useStyles()
  return (
    <>
      <Box className={classes.root}>
        <Grid container className={classes.gridContainer}>
          <CategoryLinks type={CategoryType.Ao} />
          <CategoryLinks type={CategoryType.Quan} />
          <CategoryLinks type={CategoryType.PhuKien} />
          <CategoryLinks type={'myAccount'} />
        </Grid>
      </Box>
      <Box className={classes.about}>
        Developed by Nguyen Tuan Dung | © 2023 Hoc phan thay the
      </Box>
    </>
  )
}
