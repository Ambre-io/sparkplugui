import * as React from 'react';
import type {HeadFC, PageProps} from 'gatsby';

import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from "@mui/system";
import {Provider} from 'react-redux'

import {App} from "../components/containers/App";
import {client} from '../graphql/graphql';
import {store} from "../redux/store";
import {theme} from '../styles/muiTheme';
import '../i18n/i18next';
import '../styles/index.css';


export const Head: HeadFC = () => <title>SparkplugUI</title>;


const IndexPage: React.FC<PageProps> = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ApolloProvider client={client}>
                    {/*see: https://alvarotrigo.com/blog/animated-backgrounds-css/#3)-floating-squares*/}
                    <div className="area">
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <App/>
                    </div>
                </ApolloProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default IndexPage;
