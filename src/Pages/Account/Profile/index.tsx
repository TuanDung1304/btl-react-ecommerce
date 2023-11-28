import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  colors,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useCurrentUser } from '../../../hooks'
import { StyledInput } from './StyledInput'

const useStyles = makeStyles()(() => ({
  root: {
    marginLeft: 50,
    display: 'flex',
    flexDirection: 'column',
    width: 800,
    gap: 15,
  },
  box: {
    display: 'flex',
    backgroundColor: colors.blue[50],
    padding: '20px 28px',
    boxShadow:
      'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
    borderRadius: 8,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  infoContainer: {},
}))

//https://assets.materialup.com/uploads/61c21fd4-9d79-4514-896c-a6f26f1fbb3d/preview.jpg

export default function Profile() {
  const { classes, cx } = useStyles()
  const { user } = useCurrentUser()

  return (
    <Box className={classes.root}>
      <Box className={cx(classes.box, classes.avatarContainer)}>
        <Avatar src={user.avatar} sx={{ width: 74, height: 74 }} />
        <Typography fontWeight={600} fontSize={20} marginX={2} flex={1}>
          Upload a New Photo
        </Typography>
        <Button variant="outlined" color="secondary">
          Update
        </Button>
      </Box>
      <Box className={classes.box} sx={{ flexDirection: 'column' }}>
        <Typography fontWeight={600} fontSize={22}>
          Change User Information Here
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={2} marginTop={1}>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>First Name</InputLabel>
              <StyledInput id="firstName" defaultValue={user?.firstName} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Last Name</InputLabel>
              <StyledInput id="lastName" defaultValue={user?.lastName} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Email</InputLabel>
              <StyledInput id="email" type="email" defaultValue={user?.email} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Phone number</InputLabel>
              <StyledInput id="phone" defaultValue={user?.phoneNumber} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Address</InputLabel>
              <StyledInput id="address" defaultValue={user?.address} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Birthday</InputLabel>
              <StyledInput
                type="date"
                id="birthday"
                defaultValue={user?.birthday}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ marginTop: 2.5 }}>
          Update Information
        </Button>
      </Box>
    </Box>
  )
}
