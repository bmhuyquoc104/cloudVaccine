import React from 'react';
import { Account } from '../User/Accounts';
import Status from '../User/Status';
import Setting from '../User/Setting';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from '../Components/settings/SettingsNotifications';
import SettingsPassword from '../Components/settings/SettingsPassword';

export default () => {
  return (
    <div>
      <Account>
        <Setting />
        <Status />
      </Account>
      
      <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
    </div>
  )
}


