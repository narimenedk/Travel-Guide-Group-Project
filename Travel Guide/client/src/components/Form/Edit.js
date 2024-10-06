import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory, useParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { updatePost } from '../../actions/posts';
import useStyles from './styles';

const Edit = () => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams(); // Get the post ID from the URL

    const post = useSelector((state) => (id ? state.posts.posts.find((message) => message._id === id) : null));

    const clear = () => {
        setPostData({ title: '', message: '', tags: [], selectedFile: '' });
        history.push('/'); // Redirect after clearing
    };

    useEffect(() => {
        if (post) setPostData(post);
        else clear(); // Clear if post is not found
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updatePost(id, postData)); // Update post with the current ID and data
        clear(); // Clear the form after submission
    };

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };

    if (!post) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Post not found.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Editing "{post.title}"</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Update
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Edit;
