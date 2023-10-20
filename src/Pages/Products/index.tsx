import { TabContext } from '@mui/lab'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import CategoriesTabList from './CategoriesTabList'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import ProductSort from './ProductSort'
import { getCategory } from './functions'

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
  const [tab, setTab] = useState(collection)
  const category = getCategory(tab)

  useEffect(() => {
    setTab(collection)
  }, [collection])

  return (
    <Box className={classes.root}>
      <Box>
        <img
          src="https://theme.hstatic.net/200000053174/1001115888/14/breadcrumb_bg.jpg"
          width={'100%'}
        />
      </Box>
      <TabContext value={tab}>
        <CategoriesTabList tab={tab} />
        <Box className={classes.productListContainer}>
          <ProductSort />
          <Box className={classes.productFilterWrapper}>
            <ProductFilter />
            <ProductList category={category.url} />
          </Box>
        </Box>
      </TabContext>
    </Box>
  )
}
