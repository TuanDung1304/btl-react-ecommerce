import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { makeStyles } from 'tss-react/mui'
import CheckIcon from '@mui/icons-material/Check'

const useStyles = makeStyles()(() => ({
  radioGroup: {
    '& .MuiFormControlLabel-root': {
      margin: '0 10px 0 0',
    },
    '& .MuiButtonBase-root': {
      display: 'none',
    },
  },
  radioBtn: {
    margin: '3px 0',
    position: 'relative',
    border: '1px solid #bdbfbe',
    borderRadius: 4,
    width: '70px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    fontWeight: 500,
  },
  checked: {
    position: 'absolute',
    borderRadius: 4,
    width: 18,
    height: 18,
    backgroundColor: 'black',
    top: -1,
    right: -1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',

    '& svg': {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  },
}))

function StyledRadio({ label, checked }: { label: string; checked: boolean }) {
  const { classes } = useStyles()

  return (
    <Box className={classes.radioBtn}>
      {label}
      {checked && (
        <Box className={classes.checked}>
          <CheckIcon sx={{ color: 'white', fontSize: 10 }} />
        </Box>
      )}
    </Box>
  )
}

interface Props {
  onSelect: (value: string) => void
  options: string[]
  value?: string
}

export default function RadioForm({ options, onSelect, value }: Props) {
  const { classes } = useStyles()

  return (
    <RadioGroup
      row
      className={classes.radioGroup}
      value={value}
      onChange={(e) => {
        onSelect(e.target.value)
      }}>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={<StyledRadio label={option} checked={value === option} />}
        />
      ))}
    </RadioGroup>
  )
}
