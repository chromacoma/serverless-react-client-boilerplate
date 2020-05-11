const dev = {
  s3: {
    REGION: '__AWS_REGION__',
    BUCKET: '__S3_BUCKET__',
  },
  apiGateway: {
    REGION: '__AWS_REGION__',
    URL: '__API_GATEWAY_URL__',
  },
  cognito: {
    REGION: '__AWS_REGION__',
    USER_POOL_ID: '__USER_POOL_ID__',
    APP_CLIENT_ID: '__APP_CLIENT_ID__',
    IDENTITY_POOL_ID: '__IDENTITY_POOL_ID__',
  },
  google: {
    analyticsCode: '__GOOGLE_ANALYTICS_CODE__',
  },
};

const prod = {
  s3: {
    REGION: '__AWS_REGION__',
    BUCKET: '__S3_BUCKET__',
  },
  apiGateway: {
    REGION: '__AWS_REGION__',
    URL: '__API_GATEWAY_URL__',
  },
  cognito: {
    REGION: '__AWS_REGION__',
    USER_POOL_ID: '__USER_POOL_ID__',
    APP_CLIENT_ID: '__APP_CLIENT_ID__',
    IDENTITY_POOL_ID: '__IDENTITY_POOL_ID__',
  },
  google: {
    analyticsCode: '__GOOGLE_ANALYTICS_CODE__',
  },
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
