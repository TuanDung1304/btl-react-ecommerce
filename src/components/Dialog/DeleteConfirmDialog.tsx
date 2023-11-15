import { Divider, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import React, { FormEvent, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Dialog } from '.'
import { ButtonDanger } from '../ui/Buttons'
import DialogTitle from './DialogTitle'

const useStyles = makeStyles()((theme) => ({
  root: {
    '*': {
      fontFamily: 'Inter',
    },
  },
  contentText: {
    color: theme.palette.common.black,
    marginBottom: theme.spacing(2),
  },
  iconMarginStyle: {
    marginRight: '0.2em',
  },
}))

interface DeleteConfirmDialogProps {
  onClose: () => void
  title: string
  content: React.ReactNode
  validConfirmation: string
  /** @todo consider replacing the `deleting` prop with an optional `onConfirmed` Promise response */
  onConfirmed: () => void
  deleting?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

export default function DeleteConfirmDialog({
  onClose,
  title,
  content,
  validConfirmation,
  onConfirmed,
  deleting,
  maxWidth = 'xs',
}: DeleteConfirmDialogProps) {
  const { classes } = useStyles()

  const [confirmationText, setConfirmationText] = useState<string>('')
  const isValidConfirmationText =
    validConfirmation.toLowerCase() === confirmationText.toLowerCase()

  const submit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (isValidConfirmationText && !deleting) {
      onConfirmed()
    }
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      disableEscapeKeyDown={deleting}
      disableBackdropClick={deleting}
      className={classes.root}>
      <DialogTitle onClose={onClose} loading={deleting}>
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText className={classes.contentText}>
          {content}
        </DialogContentText>
        <DialogContentText className={classes.contentText}>
          {`To confirm, please type the word "${validConfirmation}" below:`}
        </DialogContentText>
        <form onSubmit={submit}>
          <TextField
            autoFocus
            variant="outlined"
            value={confirmationText}
            placeholder={`Type "${validConfirmation}" here`}
            onChange={(event) => {
              setConfirmationText(event.target.value)
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <ButtonDanger
          onClick={onConfirmed}
          variant="contained"
          color="primary"
          disabled={!isValidConfirmationText || deleting}>
          {title}
        </ButtonDanger>
      </DialogActions>
    </Dialog>
  )
}
