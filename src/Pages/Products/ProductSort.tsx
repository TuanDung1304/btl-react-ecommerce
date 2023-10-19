import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function ProductSort() {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={classes.root}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="error">
        SHORT
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <MenuItem onClick={handleClose}>Default</MenuItem>
        <MenuItem onClick={handleClose}>Newest</MenuItem>
        <MenuItem onClick={handleClose}>Price (High - Low)</MenuItem>
        <MenuItem onClick={handleClose}>Price (Low - High)</MenuItem>
      </Menu>
    </Box>
  )
}
