import { Fragment } from "react";
import Head from "next/head";
import FeaturedPosts from "../component/blog/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Layout from "../component/blog/layout/layout";
function blog(props) {
    return (
        <>
            <Layout>
                <Head>
                    <title>وبلاگ جعبه لایتنر</title>
                    <meta
                        name="description"
                        content="last updated articles about learning meethods and optimalisation learning process"
                    />
                </Head>

                <FeaturedPosts posts={props.posts} />
            </Layout>
        </>
    );
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
    };
}

export default blog;
