import { useState } from 'react';

export function useDialog() {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        console.log('🚀  OPEN: ,',)
        return setOpen(true)
    };
    const closeDialog = () => {
        console.log('🚀  OPEN: ,',)
        return setOpen(false)
    };

    return { open, openDialog, closeDialog };
}
