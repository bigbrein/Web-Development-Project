const PostDetails = ({ post }) => {
  return (
    <>
      <h2>{post.name}</h2>
      <p>{post._id}</p>
    </>
  );
};

export default PostDetails;
