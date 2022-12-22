
import PostsGrid from './posts-grid';
function AllPosts(props) {
  return (
    <section className="blog__posts ">
      {/* <h1>All Posts</h1> */}
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
