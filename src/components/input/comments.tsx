import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment } from '@/models/comment';

function Comments(props: any) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (showComments) {
      const fetchComments = async () => {
        const response = await fetch(`/api/comments/${eventId}`);
        const data = await response.json();
        setComments(data.comments)
      }

      fetchComments();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: any) {
    // send data to API
    const response = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments &&
          <>
              <NewComment onAddComment={addCommentHandler}/>
              <CommentList comments={comments}/>
          </>
      }
    </section>
  );
}

export default Comments;
