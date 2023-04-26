# Vencura

Vencura is a safe and reliable financial management and budgeting app, for users with all levels of web3 knowledge.
With Vencura you can create multiple wallets to represent different budget categories or accounts, such as one for groceries, one for entertainment, one for savings, etc. Each wallet would have its own balance and transaction history, allowing you to easily track your spending and manage your budget. You could also set up automated transfers between wallets, such as transferring a certain percentage of your income to your savings wallet each month.

It was developed in React using [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Stack

- React
- Typescript
- Next
- TailwindCSS
- Material UI

## Getting Started

1. Make sure to have backend server up and running

- [check more here](https://github.com/MariSpirandelli/vencura-api)

1. install dependencies

```bash
npm install
# or
yarn install
```

1. rename `.env-sample` to `.env`

1. run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Vencura set up

It symply requires a login through a wallet, email or metamask account and a custodial ETH wallet will be automatically created

## Vencura features

- see your current balance
- sign a message through ETH blockchain
- send transaction to a wallet address
- see transaction history and its status

## Notes

- since the objective is to handle custodial wallets on the backend, the front-end is a little bit funky

![localhost_3001](https://user-images.githubusercontent.com/8183000/234710904-e8af4953-49da-4bbe-8778-3cf813faac8c.png)



