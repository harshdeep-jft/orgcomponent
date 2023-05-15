import * as React from 'react';
import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    useMediaQuery,
    Slide,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import Org from '../Org/Org';
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef } from 'react';
import { useDialog } from './DialogUtils';

const useStyles = makeStyles({
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
});

function convertJsonToItemData(data) {
    let itemDataArray = [];

    function appendJsonData(data, parent) {

        let item = {};
        item.id = `${data.organizationID}_${parent}`;
        item.title = data.organizationCategory;
        item.description = data.organizationName;
        item.parent = parent;

        itemDataArray.push(item);

        if (data.children != null && data.children.length > 0) {
            for (let i = 0; i < data.children.length; i++) {
                let child = appendJsonData(data.children[i], item.id);
                itemDataArray.push(child);
            }
        } else {
            if (itemDataArray.length > 6) {
                item.isVisible = false;
            }
        }

        return item;
    }

    appendJsonData(data, null);


    return itemDataArray;
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function OrgDialog() {

    // const [open, setOpen] = useState(false);
    const [customersData, setcustomersData] = useState([]);
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullScreen, setFullScreen] = useState(false);

    const theme = useTheme();
    const classes = useStyles()
    const { open, openDialog, closeDialog } = useDialog();


    useEffect(() => {
        fetch("http://localhost:3000/items")
            .then(response => response.json())
            .then(data => {
                let result = convertJsonToItemData(data);
                if (result.length > 50) {
                    setFullScreen(true);
                } else if (result.length > 30) {
                    setMaxWidth('xl');
                }
                setcustomersData(result)
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    useEffect(() => {
        $('#orgInput').on('click', function () {
            openDialog();
        });
    }, []);


    return (
        <div>
            <Button variant="outlined" onClick={openDialog}>
                Open responsive dialog
            </Button>

            <Dialog
                fullScreen={fullScreen}
                maxWidth={maxWidth}
                TransitionComponent={Transition}
                open={open}
                onClose={closeDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"
                    sx={{
                        borderBottom: '1px solid black',
                        backgroundColor: '#333',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {"Organization Hierarchy"}
                </DialogTitle>
                <DialogContent >
                    <Org
                        customersData={customersData}
                    />
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            backgroundColor: '#333',
                            display: 'flex',
                            padding: '8px',
                            borderRadius: '8px'
                        }}
                    >
                        <Button autoFocus onClick={closeDialog}
                            sx={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                            Close
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#333',
                            display: 'flex',
                            padding: '8px',
                            borderRadius: '8px'
                        }}
                    >
                        <Button onClick={closeDialog} autoFocus
                            sx={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OrgDialog