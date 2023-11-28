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
import { useCurrentUser, useFilestack } from '../../../hooks'
import { StyledInput } from './StyledInput'
import { useForm } from 'react-hook-form'
import { UpdateProfile } from './types'
import { UserService } from '../../../api/services/user'
import { useNotify } from '../../../components/Notify/hooks'
import moment from 'moment'

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

export default function Profile() {
  const { classes, cx } = useStyles()
  const { user, setUser } = useCurrentUser()
  const { notifyError, notify } = useNotify()

  const picker = useFilestack()
  const uploadAvatar = picker({
    maxFiles: 1,
    async onUploadDone(file) {
      try {
        const res = await UserService.updateUser({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: file.filesUploaded[0].url,
        })
        setUser({ ...user, avatar: file.filesUploaded[0].url })
        notify(res.message)
      } catch (err) {
        notifyError(err)
      }
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfile>()

  const onSubmit = async (data: UpdateProfile) => {
    try {
      data.birthday = data?.birthday
        ? new Date(data.birthday).toISOString()
        : undefined
      const res = await UserService.updateUser(data)
      notify(res.message)
    } catch (err) {
      notifyError(err)
    }
  }

  return (
    <Box className={classes.root}>
      <Box className={cx(classes.box, classes.avatarContainer)}>
        <Avatar src={user.avatar} sx={{ width: 74, height: 74 }} />
        <Typography fontWeight={600} fontSize={20} marginX={2} flex={1}>
          Upload a New Photo
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => uploadAvatar.open()}>
          Update
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={classes.box}
        sx={{ flexDirection: 'column' }}>
        <Typography fontWeight={600} fontSize={22}>
          Change User Information Here
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={2} marginTop={1}>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>First Name</InputLabel>
              <StyledInput
                id="firstName"
                defaultValue={user?.firstName}
                {...register('firstName', { required: 'Khong duoc bo trong' })}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Last Name</InputLabel>
              <StyledInput
                id="lastName"
                defaultValue={user?.lastName}
                {...register('lastName', { required: 'Khong duoc bo trong' })}
                error={!!errors?.lastName}
                helperText={errors?.lastName?.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Email</InputLabel>
              <StyledInput
                id="email"
                type="email"
                defaultValue={user?.email}
                {...register('email', { required: 'Khong duoc bo trong' })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Phone number</InputLabel>
              <StyledInput
                id="phone"
                defaultValue={user?.phone}
                {...register('phone')}
                error={!!errors?.phone}
                helperText={errors?.phone?.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Address</InputLabel>
              <StyledInput
                id="address"
                defaultValue={user?.address}
                {...register('address')}
                error={!!errors?.address}
                helperText={errors?.address?.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink>Birthday</InputLabel>
              <StyledInput
                type="date"
                id="birthday"
                defaultValue={moment(new Date(user?.birthday)).format(
                  'yyyy-MM-DD',
                )}
                {...register('birthday')}
                error={!!errors?.birthday}
                helperText={errors?.birthday?.message}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 2.5 }}>
          Update Information
        </Button>
      </Box>
    </Box>
  )
}
