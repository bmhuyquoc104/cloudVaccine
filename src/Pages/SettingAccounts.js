import React from 'react';
import { Account } from '../User/Accounts';
import Setting from '../User/Setting';
import Status from '../User/Status'

export default () => {
  return (
    <div>
      <Account>
        <Status />
        <Setting />
      </Account>
    </div>
  )
}