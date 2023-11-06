import { PickerOverlay } from 'filestack-react'

interface Props {
  onClose: () => void
  open: boolean
  multiFiles?: boolean
}

export default function FilePicker({ onClose, open, multiFiles }: Props) {
  return (
    <>
      {open && (
        <PickerOverlay
          apikey={'AdycHUcHuRhacN6VSzxRYz'}
          onUploadDone={(res) => console.log(res)}
          pickerOptions={{ onClose, maxFiles: multiFiles ? 10 : 1 }}
        />
      )}
    </>
  )
}
