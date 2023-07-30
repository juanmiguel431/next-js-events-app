import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment } from '@/models/comment';

function Comments(props: any) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (showComments) {
      const fetchComments = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${eventId}`);
        const data = await response.json();
        setComments(data.comments)
        setIsLoading(false);
      }

      fetchComments();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: any) {
    setIsSaving(true);
    await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setIsSaving(false);
  }

  return (
    <section className={classes.comments}>
      <button disabled={isLoading} onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments &&
          <>
              <NewComment onAddComment={addCommentHandler}/>
            {isSaving && <p>Saving a new comment!</p>}
            {isLoading && <p>Loading list of comments!</p>}
              <CommentList comments={comments}/>
          </>
      }
    </section>
  );
}

export default Comments;
