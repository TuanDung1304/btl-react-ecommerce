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
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { AuthService } from '../../api/services/auth'
import { useNotify } from '../../components/Notify/hooks'
import Link from '../../components/ui/Link'
import { useCurrentUser, useTokens } from '../../hooks'
import { LoginForm, loginSchema } from './validation'

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
  const { notify, notifyError } = useNotify()
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
      notifyError(err)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.root}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 50, height: 50 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
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
            label="Email"
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
            label="Mật khẩu"
            type="password"
            helperText={errors.password?.message}
            error={Boolean(errors.password?.message)}
            {...register('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi nhớ tài khoản"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit">
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" underline>
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" underline>
                Chưa có tài khoản? Đăng ký ngay
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
