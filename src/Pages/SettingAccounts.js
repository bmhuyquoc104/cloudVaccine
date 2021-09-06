import React from 'react';
import { Account } from '../User/Accounts';
import Status from '../User/Status';
import Settings from '../User/Setting';
import Setting from '../User/Setting';

export default () => {
  return (
    <div>
      <Account>
        <Settings />
        <Status />
        <Setting />

      </Account>
    </div>
  )
}