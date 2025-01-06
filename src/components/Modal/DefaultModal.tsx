import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface DefaultModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  confirmText?: string
  dialog?: string
  onConfirm?: () => void
  children?: React.ReactNode
}

const DefaultModal = ({
  isOpen,
  title,
  confirmText,
  dialog,
  children,
  onClose,
  onConfirm,
}: DefaultModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {children ? (
        <DialogContent>{children}</DialogContent>
      ) : (
        <>
          <DialogTitle>{title}</DialogTitle>
          {dialog && (
            <DialogContent>
              <DialogContentText>{dialog}</DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            {onConfirm && confirmText && (
              <Button color="error" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default DefaultModal
