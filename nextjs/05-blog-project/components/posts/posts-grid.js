import classes from "./posts-grid.module.css";
import PostsItem from "./posts-item";

function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
