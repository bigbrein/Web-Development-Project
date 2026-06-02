function CommentDetails({ authorID, comment }) {
  return (
    <>
      <p>{comment.content}</p>
      <p>{authorID}</p>
    </>
  );
}

export default CommentDetails;
