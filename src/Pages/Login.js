import React from "react";
import { Account } from "../User/Accounts";
import Login from "../User/Login";
import ForgotPassword from "../User/ForgotPassword";

export default () => {
    return (
        <Account>
            <Login />
            <ForgotPassword />
        </Account>
    );
};