import type {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'SparkplugUI',
        siteUrl: 'https://www.yourdomain.tld'
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-emotion",
        "gatsby-plugin-image", {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "./static/images/logo.svg"
            }
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp", {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./static/images/"
            },
            __key: "images"
        },
    ]
};

export default config;
