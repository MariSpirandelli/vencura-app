/* eslint-disable import/no-anonymous-default-export */
const api = {
  url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
};

const app = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'Ventura | Your finance service',
};

const dynamic = {
  environmentId: process.env.NEXT_PUBLIC_APP_ENVIRONMENT_ID || ''
}

const environment = process.env.NODE_ENV;
const etherscan = process.env.NEXT_PUBLIC_APP_ETHERSCAN || 'https://sepolia.etherscan.io/tx'

export default {
  api,
  app,
  dynamic,
  environment,
  etherscan
};
