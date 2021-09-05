import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_WHrKM0xD6',
    ClientId: '6upa59hehk362falbvigup4g8j'
};

export default new CognitoUserPool(poolData);