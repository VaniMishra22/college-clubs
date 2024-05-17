'use client';
import { ClubProvider } from '@/context/ClubContext';
import { SnackbarProvider } from 'notistack'
import React, { useEffect } from 'react'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import { AppProvider } from '@/context/AppContext';

const Template = ({ children }) => {

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, [])


  return (
    <div>
      <SnackbarProvider anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>
        <AppProvider>
          <ClubProvider>
            {children}
          </ClubProvider>
        </AppProvider>
      </SnackbarProvider>
    </div>
  )
}

export default Template