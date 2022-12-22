import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import '../public/styles/global.css';
import '../public/styles/global-v2.css';
import '../public/styles/mobile-v2.css';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        router.events.on('routeChangeStart', () => NProgress.start());
        router.events.on('routeChangeComplete', () => NProgress.done());
        router.events.on('routeChangeError', () => NProgress.done());
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />

                <meta name="theme-color" content="#0288d1" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="white"
                />
                <link
                    rel="apple-touch-icon"
                    href="/img/icons/apple-touch-icon.png"
                />
                <link rel="manifest" href="/manifest.json?v=1" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200&display=swap"
                    rel="stylesheet"
                />

                <title> جعبه لایتنر آنلاین</title>

                <link href="/fonts/flaticon.css?v=1" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;
