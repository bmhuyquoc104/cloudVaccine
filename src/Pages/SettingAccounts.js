import React from 'react';
import { Account } from '../User/Accounts';
import Status from '../User/Status';
import Setting from '../User/Setting';

export default () => {
  return (
    <div>
      <Account>
        <Setting />
        <Status />
      </Account>
    </div>
  )
}