import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import CategoryGridItem from './CategoryGridItem'
import CollectionGridItem from './CollectionGridItem'
import BestSellerSlider from './BestSellerSlider'

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
  label: { textAlign: 'center', fontWeight: 400, letterSpacing: '3px' },
  shopBtn: {
    fontSize: 25,
  },
  categoryGrid: {
    marginTop: '20px',
    width: '60%',
    minWidth: 1000,
    height: '710px',
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
  outstanding: {
    marginTop: 20,
    width: '90%',
    maxWidth: 1200,

    '& div': {
      width: '100%',
      height: '300px',
      overflow: 'hidden',
    },

    '& img': {
      width: '100%',
      maxHeight: '100%',
      objectFit: 'cover',
    },

    '@media (min-width: 900px)': {
      width: 'auto',
      '& div': { height: 'auto' },
    },
  },
}))

export default function Home() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.banner}>
        <img src="src/assets/home.webp" />
      </Box>
      <Grid container className={classes.categoryGrid} spacing={3}>
        <Grid
          item
          container
          xs={6}
          direction="column"
          height={'100%'}
          rowSpacing={2}>
          <CategoryGridItem
            url="collections/ao-nam"
            content="AO"
            img="src/assets/ao-quan-cate.webp"
          />
          <CategoryGridItem
            url="collections/quan-nam"
            content="QUAN"
            img="src/assets/ao-quan-cate.webp"
          />
        </Grid>
        <CategoryGridItem
          url="collections/phu-kien"
          content="PHU KIEN"
          img="src/assets/phu-kien-cate.webp"
        />
      </Grid>

      <BestSellerSlider />

      <Box className={classes.trandingNavigate}>
        <Typography>Get the Look</Typography>
        <Typography fontWeight={26}>FASHION TRENDS</Typography>
        <Typography>Fashion Trends Note</Typography>
        <Button variant="outlined">SHOP NOW</Button>
      </Box>

      <Grid container className={classes.outstanding} spacing={2}>
        <CollectionGridItem
          img="src/assets/suit-collection.webp"
          content="Men's Suits"
          url="collections/street-style"
        />
        <CollectionGridItem
          img="src/assets/winter-collection.webp"
          content="Fall Winter"
          url="collections/summer-sale"
        />
      </Grid>
    </Box>
  )
}
