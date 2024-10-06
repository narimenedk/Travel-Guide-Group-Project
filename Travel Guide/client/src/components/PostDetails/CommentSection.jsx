import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    // Check if user is defined, if not use "Guest"
    const commenterName = user?.result?.name || 'Guest';
    const newComments = await dispatch(commentPost(`${commenterName}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {/* Adding a space between the name and comment */}
              <span style={{ marginLeft: '5px' }}>{c.split(': ')[1]}</span>
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField 
            fullWidth 
            rows={4} 
            variant="outlined" 
            label="Comment" 
            multiline 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
          <br />
          <Button 
            style={{ marginTop: '10px' }} 
            fullWidth 
            disabled={!comment.length} 
            color="primary" 
            variant="contained" 
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
