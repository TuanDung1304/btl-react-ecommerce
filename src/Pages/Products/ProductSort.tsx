import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useSearchParams } from 'react-router-dom'
import { Sort } from './type'
import { useEffect, useState } from 'react'
const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function ProductSort() {
  const { classes } = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()
  const [title, setTitle] = useState<Sort>(Sort.default)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClick = (param: keyof typeof Sort) => {
    setTitle(Sort[param])
    setSearchParams(param === 'default' ? '' : `short=${param}`)
    setAnchorEl(null)
  }

  useEffect(() => {
    if (!searchParams.get('short')) {
      setTitle(Sort['default'])
      setSearchParams('')
    }
  }, [searchParams, setSearchParams])

  return (
    <Box className={classes.root}>
      <Button onClick={handleOpen} color="error">
        {title}
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
