import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { makeStyles } from 'tss-react/mui'
import ColorFilter from './ColorFilter'
import PriceFilter from './PriceFilter'
import SizeFilter from './SizeFilter'

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '250px',
    position: 'sticky',
    top: '120px',
    height: 'fit-content',
  },
  circleWrapper: {
    width: 26,
    height: 26,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
}))

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function ProductFilter() {
  const { classes } = useStyles()
  const [expanded, setExpanded] = React.useState<string[]>([])

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(
        newExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      )
    }

  const isExpended = (panel: string) => {
    return expanded.includes(panel)
  }

  return (
    <Box className={classes.root}>
      <Accordion
        expanded={isExpended('panel1')}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Màu sắc</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorFilter />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={isExpended('panel2')}
        onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Kích cỡ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SizeFilter />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={isExpended('panel3')}
        onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Giá cả</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceFilter />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
