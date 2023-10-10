import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import CategoryGridItem from './CategoryGridItem'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  banner: {
    position: 'relative',
    width: '100%',

    '& img': {
      width: '100%',
    },
  },
  shopBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    position: 'absolute',
    top: '50%',
    right: '10%',
    transform: 'translateY(-50%)',
    gap: '25px',
  },
  label: { textAlign: 'center', fontWeight: 400, letterSpacing: '3px' },
  shopBtn: {
    fontSize: 25,
  },
  categoryGrid: {
    marginTop: '20px',
    width: '80%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  trandingNavigate: {
    backgroundColor: ' #f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 0',
    width: '100%',
    marginTop: 30,

    '& p:nth-child(1)': {
      color: '#0074c2',
      fontSize: '20px',
      fontWeight: 500,
      letterSpacing: 1,
    },
    '& p:nth-child(2)': {
      fontSize: '25px',
      fontWeight: 400,
      letterSpacing: '2px',
    },
    '& p:nth-child(3)': {
      letterSpacing: '1.2px',
    },
    '& button': {
      padding: '8px 150px',
      borderWidth: '2px',
      fontSize: 20,
      marginTop: 20,

      '&:hover': {
        borderWidth: '2px',
        color: '#004284',
      },
    },
  },
}))

export default function Home() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.banner}>
        <img src="src/assets/home.jpg" />
        <Box className={classes.shopBtnContainer}>
          <Typography className={classes.label} variant="h2">
            Fashion Store
          </Typography>
          <Button fullWidth variant="contained" className={classes.shopBtn}>
            SHOP NOW
          </Button>
        </Box>
      </Box>
      <Grid container className={classes.categoryGrid} spacing={2}>
        <Grid item container xs={6} direction="column" rowSpacing={2}>
          <CategoryGridItem
            url="products/men"
            content="MEN"
            img="src/assets/menCate.jpg"
          />
          <CategoryGridItem
            url="products/sportswear"
            content="SPORTSWEAR"
            img="src/assets/sportCate.jpg"
          />
        </Grid>
        <CategoryGridItem
          url="products/women"
          content="WOMEN"
          img="src/assets/womenCate.jpg"
        />
      </Grid>

      <Box className={classes.trandingNavigate}>
        <Typography>Get the Look</Typography>
        <Typography fontWeight={26}>FASHION TRENDS</Typography>
        <Typography>Fashion Trends Note</Typography>
        <Button variant="outlined">SHOP NOW</Button>
      </Box>
    </Box>
  )
}
