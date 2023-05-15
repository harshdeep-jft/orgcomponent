
import React from 'react';
import { useDialog } from '../Dialog/DialogUtils';

const Button = ({ text, onClick }) => {
  const { open, openDialog, closeDialog } = useDialog();

  return (
    <button onClick={openDialog}>{text}</button>
  );
};

export default Button;