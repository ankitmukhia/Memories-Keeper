import { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux" // This allows to do dispatch an action
import ChipInput from 'material-ui-chip-input'

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPostsBySearch } from "../../redux/action/PostsAction"
import Paginate from '../Page/Pagination';
import useStyles from './styles'
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [ currentId, setCurrentId ] = useState(0)
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([])
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
  
    const searchPost = () => {
      if(search.trim() || tags) {
        //dispatch -> fetch search post
        dispatch(getPostsBySearch({ search, tags: tags.join(',')}));
        history.push(`/posts/search?search=${search || 'none'}&tags=${tags.join(',')}`);
      }else {
        history.post('/')
      }
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost();
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    
  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position='static' color="inherit">
              <TextField 
                 name="search" 
                 variant='outlined' 
                 label="Search Memories" 
                 onKeyDown={handleKeyPress}
                 fullWidth
                 value={search}
                 onChange={(e) => {
                  setSearch(e.target.value)
                 }}
              />
              <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant='outlined' 
              />
              <Button onClick={searchPost} variant='contained' color='primary'>
                Search
              </Button>
          </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page}/>
              </Paper>
            )}
          </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home