/* eslint-disable react/prop-types */
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux"; // we are fetching data from Redux global store here

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if(!posts.length && !isLoading ) return 'No post'
  
  const Loading = () => {
    return (
      <div elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em" />
    </div>
    )
  }
  return (
     isLoading ? <Loading /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post)=> (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
    )
  );
};

export default Posts;
