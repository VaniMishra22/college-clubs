'use client';
import { ClubProvider } from '@/context/ClubContext';
import { SnackbarProvider } from 'notistack'
import React from 'react'

const Template = ({ children }) => {
  return (
    <div>
      <SnackbarProvider anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>
        <ClubProvider>
          {children}
        </ClubProvider>
      </SnackbarProvider>
    </div>
  )
}

export default Template