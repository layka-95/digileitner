import PostItem from './post-item';


function PostsGrid(props) {
  const { posts } = props;

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </>
  );
}

export default PostsGrid;
