import type {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'SparkplugUI',
        siteUrl: 'https://www.yourdomain.tld'
    },
    // There are 4 other flags available that you might be interested in:
    // - FAST_DEV · Enable all experiments aimed at improving develop server start time & develop DX.
    // - PRESERVE_FILE_DOWNLOAD_CACHE · (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Don't
    // delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.
    // - PARALLEL_SOURCING · EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/parallel-sourcing-feedback)) ·
    // Run all source plugins at the same time instead of serially. For sites with multiple source plugins,
    // this can speedup sourcing and transforming considerably.
    // - DETECT_NODE_MUTATIONS · Diagnostic mode to log any attempts to mutate node directly. Helpful when
    // debugging missing data problems. See https://gatsby.dev/debugging-missing-data for more details.
    flags: {
        DEV_SSR: true
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
