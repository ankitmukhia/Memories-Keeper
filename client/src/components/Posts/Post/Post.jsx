/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import { deletePost, likePost } from "../../../redux/action/PostsAction";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import moment from 'moment';

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [ likes, setLikes ] = useState(post?.likes)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();

  const userId = user?.result?.googleId || user?.result?._id
  const hasLikePost = post.likes.find((like) => like === userId)

  const handleLike = () => {
    dispatch(likePost(post._id));

    if(hasLikePost) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([ ...post.likes, userId])
    }
  }


  const Likes = () => {
    if (post?.likes?.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => history.push(`/posts/${post._id}`);


  const {selectedFile, createdAt, title, message, tags} = post;
  return (
    <Card className={classes.card} raised elevation={6}>
        <CardMedia className={classes.media} image={selectedFile} title={title} component="span" />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          {/* Here we a specified the moment, what it does is it shows that 5 minutes ago / 2 minutes ago thing.. */}
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography> 
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (     
            <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
            </div>
          )}
          <ButtonBase 
                component="span"
                name="test"
                className={classes.cardAction} 
                onClick={openPost}
              >
                <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" component="h2">{tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">{message}</Typography>
                </CardContent>
         </ButtonBase>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                  <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                      <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
              </CardActions>
  </Card>
  );
};

export default Post;
