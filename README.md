# Instructions (local with server directory) -> deprecated

## dev

1. yarn
2. yarn start:server
3. yarn start

## prod

1. yarn
2. yarn build && yarn build:server
3. yarn start:server

# Instructions (with serverless)

1. $ cd client && yarn
2. set .env file (client - see .env.sample)
3. $ yarn client-deploy:pre
4. cd ../geact-serverless && yarn
5. yarn build
```bash
$ yarn offline (local)
$ yarn deploy:prod
$ yarn deploy:dev
```

