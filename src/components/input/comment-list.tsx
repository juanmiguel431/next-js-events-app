import classes from './comment-list.module.css';
import { Comment } from '@/models/comment';
import React from 'react';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {

  return (
    <ul className={classes.comments}>
      {comments.map(c => (
        <li key={c.id}>
          <p>{c.text}</p>
          <div>
            By <address>{c.email}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
