import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_fegeH2pLL',
    ClientId: '74mlfv4n5hiie4fl8inqoffsjb'
};

export default new CognitoUserPool(poolData);