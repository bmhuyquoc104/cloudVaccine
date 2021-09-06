import React from 'react';
import { Account } from '../User/Accounts';
import Signup from '../User/Signup';
import Status from '../User/Status'

export default () => {
    return(
        <Account>
            <Signup />
            <Status />
        </Account>
    );
};