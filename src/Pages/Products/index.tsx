import { TabContext, TabPanel } from '@mui/lab'
import { Box } from '@mui/material'
import { useState } from 'react'
import CategoriesTabList from './CategoriesTabList'
import {
  AO_CATEGORIES,
  CategoriesType,
} from '../../components/Categories/categories'
import { makeStyles } from 'tss-react/mui'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabContext: {},
}))

export default function Products() {
  const { classes } = useStyles()
  const params = useParams()

  const [value, setValue] = useState(params.type as string)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box className={classes.root}>
      <Box>
        <img src="https://theme.hstatic.net/200000053174/1001115888/14/breadcrumb_bg.jpg?v=1057" />
      </Box>
      <TabContext value={value}>
        <CategoriesTabList
          onChange={handleChange}
          catagories={AO_CATEGORIES}
          type={CategoriesType.Ao}
          value={value}
        />
        <TabPanel value={value}>{value}</TabPanel>
      </TabContext>
    </Box>
  )
}
