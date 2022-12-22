import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostHeader from "./post-header";
import { Fragment } from "react";
import Head from "next/head";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";
import AdBanner from "../../../../component/general/addbanner";
function PostContent(props) {
    const { post } = props;

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        img(image) {
            return (
                <Image
                    src={`/images/posts/${post.slug}/${image.src}`}
                    alt={image.alt}
                    width={600}
                    height={300}
                />
            );
        },
        p(paragraph) {
            const { node } = paragraph;

            if (node.children[0].tagName === "img") {
                const image = node.children[0];

                return (
                    <div>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },

        code(code) {
            const { className, children } = code;
            const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        },
    };

    return (
        <article className="blog__post-outer">
            <div className="blog__back-icon-section">
                <Link href="/blog">
                    <FiArrowLeftCircle
                        size="2rem"
                        color="gray"
                        className="blog__back-icon"
                    />
                </Link>
                <div className="make_center">
                    <p>Add:</p>
                    <AdBanner />
                </div>
            </div>

            <div className="blog__post ">
                <Head>
                    <title>{post.title}</title>
                    <meta name="description" content={post.excerpt} />
                </Head>
                <PostHeader
                    title={post.title}
                    image={imagePath}
                    className="blog__post-img"
                />
                <ReactMarkdown
                    components={customRenderers}
                    className="blog__post-content"
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}

export default PostContent;
