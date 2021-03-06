var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: false });
        this.argument('shopifyApiKey', { type: String, required: false });
    }

    prompting() {
        const prompts = [];
        if (!this.options.appname) {
            prompts.push({
                type: 'input',
                name: 'appname',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            });
        }
        if (!this.options.shopifyApiKey) {
            prompts.push({
                type: 'input',
                name: 'shopifyApiKey',
                message: 'Your Shopify API Key',
            });
        }
        return this.prompt(prompts)
            .then((answers) => {
                if (answers.appname) { this.options.appname = answers.appname }
                if (answers.shopifyApiKey) { this.options.shopifyApiKey = answers.shopifyApiKey }
            });
    }

    writing() {
        const templateFiles = [
            "LICENSE",
            "PRIVACY.md",
            "README.md",
            "backend/appsync/templates/dynamodb/request/get_item_by_id.vtl",
            "backend/appsync/templates/dynamodb/response/owner_can_read.vtl",
            "backend/appsync/templates/schema.graphql",
            "backend/appsync/package.json",
            "backend/appsync/serverless.yml",
            "backend/appsync/tsconfig.json",
            "backend/appsync/tslint.json",
            "backend/appsync/webpack.config.js",
            "backend/appsync/yarn.lock",
            "backend/cognito/package.json",
            "backend/cognito/serverless.yml",
            "backend/cognito/src/__tests__/createAuthChallenge.test.ts",
            "backend/cognito/src/__tests__/defineAuthChallenge.test.ts",
            "backend/cognito/src/__tests__/preSignUp.test.ts",
            "backend/cognito/src/__tests__/verifyAuthChallengeResponse.test.ts",
            "backend/cognito/src/createAuthChallenge.ts",
            "backend/cognito/src/defineAuthChallenge.ts",
            "backend/cognito/src/lib/jwt.ts",
            "backend/cognito/src/lib/monitoring.ts",
            "backend/cognito/src/preSignUp.ts",
            "backend/cognito/src/verifyAuthChallengeResponse.ts",
            "backend/cognito/tsconfig.json",
            "backend/cognito/tslint.json",
            "backend/cognito/webpack.config.js",
            "backend/cognito/yarn.lock",
            "backend/shopify/package.json",
            "backend/shopify/schema-appsync.json",
            "backend/shopify/schema-shopify.json",
            "backend/shopify/serverless.yml",
            "backend/shopify/src/__tests__/appUninstalled.test.ts",
            "backend/shopify/src/__tests__/authBegin.test.ts",
            "backend/shopify/src/__tests__/authComplete.test.ts",
            "backend/shopify/src/__tests__/scriptTagsManager.test.ts",
            "backend/shopify/src/__tests__/shopUpdate.test.ts",
            "backend/shopify/src/__tests__/webhooksHandler.test.ts",
            "backend/shopify/src/__tests__/webhooksManager.test.ts",
            "backend/shopify/src/appUninstalled.ts",
            "backend/shopify/src/authBegin.ts",
            "backend/shopify/src/authComplete.ts",
            "backend/shopify/src/config.ts",
            "backend/shopify/src/getShopSettings.ts",
            "backend/shopify/src/graphql/GetShopSettingsQuery.graphql",
            "backend/shopify/src/graphql/index.d.ts",
            "backend/shopify/src/interfaces.ts",
            "backend/shopify/src/lib/dynamodb.ts",
            "backend/shopify/src/lib/http.ts",
            "backend/shopify/src/lib/jwt.ts",
            "backend/shopify/src/lib/monitoring.ts",
            "backend/shopify/src/lib/shopify.ts",
            "backend/shopify/src/lib/string.ts",
            "backend/shopify/src/schema-shopify.ts",
            "backend/shopify/src/scriptTagsManager.ts",
            "backend/shopify/src/shopUpdate.ts",
            "backend/shopify/src/webhooksHandler.ts",
            "backend/shopify/src/webhooksManager.ts",
            "backend/shopify/tsconfig.json",
            "backend/shopify/tslint.json",
            "backend/shopify/webpack.config.js",
            "backend/shopify/yarn.lock",
            "client/package.json",
            "client/schema.json",
            "client/tsconfig.json",
            "client/tslint.json",
            "client/yarn.lock",
            "client/jest/enzyme.js",
            "client/src/App.tsx",
            "client/src/components/Authenticator.tsx",
            "client/src/components/Callback.scss",
            "client/src/components/Callback.scss.d.ts",
            "client/src/components/Callback.tsx",
            "client/src/components/Embedded.tsx",
            "client/src/components/Login.scss",
            "client/src/components/Login.scss.d.ts",
            "client/src/components/Login.tsx",
            "client/src/components/Spinner.scss",
            "client/src/components/Spinner.scss.d.ts",
            "client/src/components/Spinner.tsx",
            "client/src/components/UnexpectedError.tsx",
            "client/src/components/__tests__/Callback.tsx",
            "client/src/components/__tests__/Login.tsx",
            "client/src/components/__tests__/Spinner.tsx",
            "client/src/components/__tests__/UnexpectedError.tsx",
            "client/src/components/__tests__/__snapshots__/Callback.tsx.snap",
            "client/src/components/__tests__/__snapshots__/Login.tsx.snap",
            "client/src/components/__tests__/__snapshots__/Spinner.tsx.snap",
            "client/src/components/__tests__/__snapshots__/UnexpectedError.tsx.snap",
            "client/src/graphql/HomeScreenQuery.graphql",
            "client/src/graphql/index.d.ts",
            "client/src/index.tsx",
            "client/src/lib/query-string.ts",
            "client/src/lib/__tests__/query-string.ts",
            "client/src/screens/CallbackScreen.tsx",
            "client/src/screens/HomeScreen.tsx",
            "client/src/screens/LoginScreen.tsx",
            "client/src/screens/LogoutScreen.tsx",
            "client/src/screens/NotFoundScreen.tsx",
            "client/src/screens/PolarisErrorScreen.tsx",
            "client/src/screens/UnexpectedErrorScreen.tsx",
            "client/src/styles.global.scss",
            "client/webpack/common.config.js",
            "client/webpack/dev.config.js",
            "client/webpack/prod.config.js"
        ];
        const otherFiles = [
            "backend/appsync/templates/elasticcache/.gitkeep",
            "backend/appsync/templates/lambda/.gitkeep",
            "backend/appsync/coverage/.gitkeep",
            "backend/cognito/coverage/.gitkeep",
            "backend/shopify/coverage/.gitkeep",
            "client/src/favicon.png",
            "client/src/index.ejs",
            "client/dist/.gitkeep"
        ];
        const gitIgnoreFiles = [
            "backend/appsync",
            "backend/cognito",
            "backend/shopify",
            "client",
        ]
        const params = {
            "appname": this.options.appname || this.appname,
            "shopifyApiKey": this.options.shopifyApiKey || this.shopifyApiKey,
        }

        for (const f of templateFiles) {
            this.fs.copyTpl(
                this.templatePath(f),
                this.destinationPath(f),
                params
            );
        }

        for (const f of otherFiles) {
            this.fs.copy(
                this.templatePath(f),
                this.destinationPath(f)
            );
        }

        for (const f of gitIgnoreFiles) {
            this.fs.copy(
                this.templatePath(f + "/gitignore"),
                this.destinationPath(f + "/.gitignore")
            );
        }
    }
};
