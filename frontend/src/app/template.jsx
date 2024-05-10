'use client';
import { SnackbarProvider } from 'notistack'
import React from 'react'

const Template = ({ children }) => {
  return (
    <div>
      <SnackbarProvider anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>
        {children}
      </SnackbarProvider>
    </div>
  )
}

export default Template