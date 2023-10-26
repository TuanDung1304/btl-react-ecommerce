import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { useProductFilter } from './functions'
import { Sort } from './type'
const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function ProductSort() {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const { filter, setProductFilter } = useProductFilter()

  const handleClick = (param: keyof typeof Sort) => {
    setProductFilter({ sortBy: param })
    setAnchorEl(null)
  }

  return (
    <Box className={classes.root}>
      <Button onClick={handleOpen} color="error">
        {Sort[filter.sortBy]}
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <MenuItem onClick={() => handleClick('default')}>Default</MenuItem>
        <MenuItem onClick={() => handleClick('newest')}>Newest</MenuItem>
        <MenuItem onClick={() => handleClick('desc')}>
          Price (High - Low)
        </MenuItem>
        <MenuItem onClick={() => handleClick('asc')}>
          Price (Low - High)
        </MenuItem>
      </Menu>
    </Box>
  )
}
