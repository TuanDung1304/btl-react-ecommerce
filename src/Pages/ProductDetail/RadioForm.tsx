import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useState } from 'react'
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
    position: 'relative',
    border: '1px solid #bdbfbe',
    borderRadius: 4,
    width: '70px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
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
        <div className={classes.checked}>
          <CheckIcon sx={{ color: 'white', fontSize: 10 }} />
        </div>
      )}
    </Box>
  )
}

export default function RadioForm({
  options,
}: {
  options: { value: string; label: string }[]
}) {
  const { classes } = useStyles()

  const [currentValue, setCurrentValue] = useState(options[0].value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue((event.target as HTMLInputElement).value)
  }

  return (
    <RadioGroup
      row
      className={classes.radioGroup}
      value={currentValue}
      onChange={handleChange}>
      {options.map(({ value, label }) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={<StyledRadio label={label} checked={currentValue === value} />}
        />
      ))}
    </RadioGroup>
  )
}
