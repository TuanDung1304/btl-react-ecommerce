import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { AuthService } from '../../api/services/auth'
import { useNotify } from '../../components/Notify/hooks'
import Link from '../../components/ui/Link'
import { RegisterForm, registerSchema } from './validation'

const useStyles = makeStyles()(() => ({
  root: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(60vh)',
  },
}))

export default function Register() {
  const { classes } = useStyles()
  const { notify, notifyError } = useNotify()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) })
  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true)
      const res = await AuthService.signup(data)
      notify(res.message)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.root}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 50, height: 50 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          ĐĂNG KÝ TÀI KHOẢN
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            id="email"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
            {...register('email')}
          />
          <TextField
            id="firstName"
            margin="normal"
            fullWidth
            label="First Name"
            helperText={errors.firstName?.message}
            error={Boolean(errors.firstName?.message)}
            {...register('firstName')}
          />
          <TextField
            id="lastName"
            margin="normal"
            fullWidth
            label="Last Name"
            helperText={errors.lastName?.message}
            error={Boolean(errors.lastName?.message)}
            {...register('lastName')}
          />
          <TextField
            id="password"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            {...register('password')}
          />
          <TextField
            id="confirm-password"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            helperText={errors.confirmPassword?.message}
            error={Boolean(errors.confirmPassword?.message)}
            {...register('confirmPassword')}
          />
          <Button
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit">
            Register
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/login" underline>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
