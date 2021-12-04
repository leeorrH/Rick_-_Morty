import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "2%",
  outline: "none"
};

interface ModalProps {
  openModal : boolean;
  setOpenModal : React.Dispatch<any>;
}

export const BaseModal: React.FC<ModalProps> = ({children, openModal , setOpenModal}) => {
  //const [open, setOpen] = React.useState(openModal);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        <Box sx={style}>
         {children}
        </Box>
      </Modal>
    </div>
  );
}