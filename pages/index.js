import React from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import Cookies from "universal-cookie";
import Image from "next/image";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie: new Cookies(),
            displayedToUser: false,
        };
    }

    componentDidMount() {
        const expireYear = new Date();
        expireYear.setFullYear(new Date().getFullYear() + 5);
        this.state.cookie.set("lang", "fa", { path: "/", expires: expireYear });

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .catch((err) =>
                    console.error("Service worker registration failed", err)
                );
        } else {
            // console.log("Service worker not supported");
        }

        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");
        if (ref !== "panel") {
            const token = this.state.cookie.get("leitner_token");
            if (token != null && token.length > 0) {
                Router.push("/panel", undefined, { shallow: true });
            }
        }
    }

    closeCookie = () => {
        this.setState({
            displayedToUser: true,
        });
        this.state.cookie.set("user_seen", true, { path: "/" });
    };

    render() {
        return (
            <div>
                <Head>
                    <title>جعبه لایتنر آنلاین هوشمند</title>
                    <meta
                        name="description"
                        content="Most powerfull smart flashcard learning system using leitner method"
                    />
                </Head>
                <section>
                    <div className="black-band">

                    </div>
                    <div className="container index-container">
                        <div className="d-flex flex-md-row flex-column justify-content-around align-items-center">
                            <div className="order-2 order-md-1 rtl p-4">
                                <h1 className="homepage__header1 display-4 text-center text-md-right mb-3">
                                    <small>
                                        <b>یکبار یادبگیر....</b>
                                    </small>
                                    <br />
                                    <strong className="text-primary homepage__title-pd">
                                        جعبه لایتنر آنلاین هوشمند
                                    </strong>
                                </h1>

                                <h2 className="lead text-md-right text-muted text__rtl-maker">
                                    لایتنر یک روش علمی «به یاد سپردن» است که بر
                                    مبنای آن آموخته‌ها از حافظهٔ کوتاه‌مدت به
                                    حافظهٔ بلند مدت منتقل می‌شوند.
                                </h2>

                                <div className="mt-5 homepage__button-mobile">
                                    <Link href="/blog">
                                        <button className="ml-2 btn btn-neutral btn-icon">
                                            وبلاگ
                                        </button>
                                    </Link>
                                    <Link href="/authentication/signup">
                                        <button className="btn btn-primary btn-icon btn-inner--text">
                                            شروع کن
                                        </button>
                                    </Link>
                                    <script
                                        async
                                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5592080580535773"
                                        crossOrigin="anonymous"
                                    ></script>
                                </div>
                            </div>
                            <figure className="homepage__image order-1 order-lg-2 w-75">
                                <div>
                                    <Image
                                        width="750"
                                        height="411"
                                        alt="Image placeholder"
                                        src="/img/top-slider.png"
                                        className="img-fluid my-3 mb-lg-0"
                                    />
                                </div>
                            </figure>
                        </div>
                        {!this.state.cookie.get("user_seen") ? (
                            <div className="cookie-container">
                                <div className="cookie-alert rtl text-right">
                                    <img
                                        className="cookie-image"
                                        src={"/img/icons/cookies.png"}
                                        alt={""}
                                    />
                                    <p>این سایت از کوکی استفاده می کند.</p>
                                    <button
                                        onClick={this.closeCookie}
                                        className="btn btn-info btn-cookie right-3"
                                    >
                                        باشه
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

export default Index;
