import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import Link from '../../components/ui/Link'
import { LoginForm, loginSchema } from './validation'
import { AuthService } from '../../api/services/auth'
import { isAxiosError } from 'axios'
import { useNotify } from '../../components/Notify/hooks'
import { useCurrentUser, useTokens } from '../../hooks'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles()(() => ({
  root: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(60vh)',
  },
}))

export default function Login() {
  const { classes } = useStyles()
  const { notify } = useNotify()
  const navigate = useNavigate()
  const { setAccessToken, setRefreshToken } = useTokens()
  const { setUser } = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await AuthService.login(data)
      setAccessToken(res.tokens.accessToken)
      setRefreshToken(res.tokens.refreshToken)
      setUser(res.user)
      navigate('/')
      notify(res.message)
    } catch (err) {
      if (isAxiosError(err)) {
        notify(err.response?.data.message, { severity: 'error' })
      }
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.root}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 50, height: 50 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOG IN TO CONTINUE
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}>
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
            id="password"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            {...register('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" underline>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" underline>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
