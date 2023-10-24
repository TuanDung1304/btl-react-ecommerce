import { Fade, Paper, Popper, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    zIndex: 10,
    width: '100vw',
  },
}))

interface Props {
  anchorEl: HTMLDivElement | null
  handleClose: () => void
  currentTab: string
}

export default function CategoryHeader({
  anchorEl,
  handleClose,
  currentTab,
}: Props) {
  const { classes } = useStyles()

  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      transition
      className={classes.root}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography sx={{ p: 2 }}>{currentTab}</Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
