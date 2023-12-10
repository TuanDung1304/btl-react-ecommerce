import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import CategoryGridItem from './CategoryGridItem'
import CollectionGridItem from './CollectionGridItem'
import TrendingSlider from './TrendingSlider'
import { CategoryType } from '../../consts'

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
        <img src="https://theme.hstatic.net/200000053174/1001115888/14/home_about_1_image.jpg?v=1638" />
      </Box>
      <Grid container className={classes.categoryGrid} spacing={3}>
        <Grid
          item
          container
          xs={5}
          direction="column"
          rowSpacing={2}
          height={'100%'}>
          <CategoryGridItem
            url="collections/quan-nam"
            content={CategoryType.Quan}
            img="https://product.hstatic.net/200000053174/product/3_7538c367131e4065a9d62aa1923c9649_master.jpg"
          />
          <CategoryGridItem
            url="collections/phu-kien"
            content={CategoryType.PhuKien}
            img="https://product.hstatic.net/200000053174/product/5gdat005den01-999k__copy__40410e3ca1a646e9a9a07b819c0fc472_master_44a2be43b7ae4722b08c2d01bac70e57_master.jpg"
          />
        </Grid>
        <CategoryGridItem
          xs={7}
          url="collections/ao-nam"
          content={CategoryType.Ao}
          img="https://product.hstatic.net/200000053174/product/4_3186947308904dc98f995fe951ff5db8_master.jpg"
        />
      </Grid>

      <TrendingSlider />

      <Box className={classes.trandingNavigate}>
        <Typography>Get the Look</Typography>
        <Typography fontWeight={26}>FASHION TRENDS</Typography>
        <Typography>Fashion Trends Note</Typography>
        <Button variant="outlined">MUA NGAY</Button>
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
