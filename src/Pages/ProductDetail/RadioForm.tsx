import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
}))

export default function RadioForm() {
  const { classes } = useStyles()
  return (
    <FormControl className={classes.root}>
      <RadioGroup row defaultValue="female" name="radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  )
}
