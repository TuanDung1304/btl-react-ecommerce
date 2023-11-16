import { TabContext } from '@mui/lab'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import CategoriesTabList from './CategoriesTabList'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import ProductSort from './ProductSort'
import { useProductFilter } from './functions'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabContext: {},
  productListContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '1400px',
  },
  productFilterWrapper: {
    display: 'flex',
    gap: 15,
  },
}))

export default function Products() {
  const { classes } = useStyles()
  const { collection = 'ao-nam' } = useParams()
  const { setProductFilter } = useProductFilter()

  useEffect(() => {
    setProductFilter({ page: 1 })
  }, [collection, setProductFilter])

  return (
    <Box className={classes.root}>
      <Box>
        <img
          src="https://theme.hstatic.net/200000053174/1001115888/14/breadcrumb_bg.jpg"
          width={'100%'}
        />
      </Box>
      <TabContext value={collection}>
        <CategoriesTabList tab={collection} />
        <Box className={classes.productListContainer}>
          <ProductSort />
          <Box className={classes.productFilterWrapper}>
            <ProductFilter />
            <ProductList />
          </Box>
        </Box>
      </TabContext>
    </Box>
  )
}
