import PostsGrid from "../posts/posts-grid";

function FeaturedPosts(props) {
    return (
        <div className="all__post-grider">
            <section className="blog__featured-main-body weblog__grider">
                {/* <h2>آخرین مقالات</h2> */}

                <PostsGrid posts={props.posts} />
            </section>
        </div>
    );
}

export default FeaturedPosts;
