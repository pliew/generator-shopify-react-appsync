# Shopify React Appsync Generator for Yeoman
Yeoman is a scaffolding system for quickly creating many kinds of apps. This Yeoman generator creates a [Shopify](https://www.shopify.com/?ref=growingecommerce) App using React, Shopify Polaris, AWS Amplify and AWS AppSync.

# Installing
To use this starter kit you need to install Yeoman. If you don't already have Yeoman installed then run

```sh
npm install yo -g
```

You should then install the Shopify React AppSync generator for Yeoman

```sh
npm install generator-shopify-react-appsync
```

Finally you can generate a new starter app in the current directory by using

```sh
yo shopify-react-appsync --appname YOUR-APP-NAME --shopifyApiKey YOUR-SHOPIFY-API-KEY --shopifyApiSecret YOUR-SHOPIFY-API-SECRET --email YOUR-SUPPORT-EMAIL --jwtSecret YOUR-JWT-SECRET
```

# Backend

## Deployment Order

You need to deploy the services in the following order:

* AppSync
* Shopify

## AppSync

### Dependencies

The dependencies for the AppSync service are located in `backend/appsync/package.json` and are managed using [Yarn](https://yarnpkg.com/). To install the dependencies to `backend/appsync` folder and use the command:

```sh
yarn install
```

### Configuration

The configuration is stored in `backend/appsync/serverless.yml` and `backend/appsync/env.yml`.

Before you deploy make sure you updated the `REPLY_EMAIL` setting in `backend/appsync/env.yml`

### Deployment

To deploy the service use the command

```sh
sls deploy -r YOUR-REGION -s YOUR-STAGE --aws-profile YOUR-AWS-PROFILE
```

## Shopify

### Dependencies

The dependencies for the Shopify service are located in `backend/shopify/package.json` and are managed using [Yarn](https://yarnpkg.com/). To install the dependencies to `backend/shopify` folder and use the command:

```sh
yarn install
```

### Configuration

The configuration is stored in `backend/shopify/serverless.yml` and `backend/shopify/env.yml`.

### Deployment

To deploy the service use the command

```sh
sls deploy -r YOUR-REGION -s YOUR-STAGE --aws-profile YOUR-AWS-PROFILE
```

# Client

## Dependencies
The of the depencies for the React client are located in `client/package.json` and are managed by [Yarn](https://yarnpkg.com/). You can install them using:

```sh
yarn install
```

# Configuration
The configuration has moved the `client/webpack/{environment}.config.js`. You need to modify this after deploying the AppSync and Shopify backend services so that the client knows where the backend is located.


# Development Server
This project uses the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html). By default is it configured to run on port 443 so you need to start it using sudo. If you do not want to run webpack-dev-server as root you can change the port in your `client/webpack/dev.config.js` file however you will not be able to test your application using Chrome.

```sh
sudo yarn start
```

Once the development server has started go to [https://localhost/login](https://localhost/login) to login. This URL also accepts the `shop` query string parameter.

# Generating schema.ts
The type definitions for GraphQL queries/mutations made by the client are in the `client/src/schema.ts` file. This file is automatically generated from your `.graphql` files.

You can regenerate this file from the `client` folder by running the command

```sh
yarn schema
```

If your GraphQL schema has changed then download the `schema.json` from AppSync and put it in `client/schema.json` then use the same command to regenerate the shcema. If there are any problems with your queries you should see errors generated.


# Generating *.(css|less|saas|scss).d.ts files
The *.(css|less|saas|scss).d.ts files for your CSS/Less/SASS files aren't created by the generator. These files are automatically created by Webpack when it builds your application. If you're using VS Code you'll want these so that autocomplete will work in the browser. The easiest solution is to start the development server using `yarn start`. This will build the `.d.ts` files for you and update them as you make changes to your source files.

# Generating favicon's
The favicon's are generated automatically from `client/src/favicon.png` during the webpack build by favicons-webpack-plugin. To update your favicon replace this file with a large square PNG and the all of the smaller sizes will automatically be generated for you.

__Note__ The default `client/src/favicon.png` is not released under the MIT LICENSE and _**MUST**_ be changed before you release application.

## Expired Token Handling
When the user presents an expired or invalid authorization token the GraphQL API should respond with a HTTP 403 (Forbidden) status code. The application will then automatically redirect the user to `/login`.

## Refreshng Tokens
If the GraphQL API returns a `x-new-token` header in the response then the client will automatically replace the authorization token stored in localStorage with the new token. This allows the GraphQL API to refresh the token automatically for users. By using this you can keep token lifetimes short while still allowing the users to stay logged in for extended periods providing they are active.

# Logging Errors
In productions apps you will frequently want to use a remote logging service to track errors the client is experiencing. The easily be added in `src/containers/UnexpectedErrorContainer.tsx` which is the error boundary component wrapped around the entire application. To add logging open that file and replace `// ADD REMOTE LOGGING HERE` with the code to log errors.

# Releases
This project will follow a new release number schema based on [semver](http://semver.org/).

- Major releases 6.0, 7.0, 8.0 etc will become the norm. These releases will include new features, updated dependencies (production and development) and other code changes.
- Minor releases 6.x, 7.x, 8.x etc will occur when Shopify releases a point upgrade to [Polaris](https://github.com/shopify/polaris). These releases will only include the updated Polaris. This will allow us to keep Polaris up to date without needing to do major a release.
- Bug releases 6.x.y, 7.x.y, 8.x.y etc will be released as required

See the [release notes](https://github.com/buggy/generator-shopify-react-appsync/wiki/ReleaseNotes) for more information.

# Copyright
This project copyright 2017-2018 Rich Buggy. See the LICENCE file for information about using and distributing this project.
