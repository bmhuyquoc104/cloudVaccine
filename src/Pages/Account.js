import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import AccountProfile from '../Components/account/AccountProfile';
import AccountProfileDetails from '../Components/account/AccountProfileDetail';
import SettingAccount from '../Pages/SettingAccounts';

const Account = () => (
  <div>
    <SettingAccount />
  </div>
);

export default Account;
