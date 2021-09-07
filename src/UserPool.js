import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_YxJ2HbDtl',
    ClientId: '401jg8e65li00va675r4q8o3jv'
};

export default new CognitoUserPool(poolData);