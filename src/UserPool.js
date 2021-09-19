import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_9GlHPmDsi',
    ClientId: '74dahqddft732osl5gtbjc5pt2'
};

export default new CognitoUserPool(poolData);