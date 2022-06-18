import React from 'react'
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';


function ContactModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
        <br></br>
        <Button onClick={handleOpen} variant="contained" color="primary" size="large">
            <Typography style={{fontWeight: "bold"}}>
                Contact Me!
            </Typography>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <div style={{position:"relative", display:"flex", backgroundColor:"#ADD8E6", top:"40%", left:"25%", width:"50%", justifyContent:"center", border:"3px solid purple", textAlign:"center" }}>
            <Box>
                <br></br>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
                </Typography>
                <br></br>
                <Typography id="modal-modal-description" >
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <br></br>
            </Box>
        </div>
        </Modal>
        <br></br>
        <br></br>

    </div>
  )
}

export default ContactModal