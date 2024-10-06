import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const history = useHistory();

  // State for country search
  const [searchedCountry, setSearchedCountry] = useState(null);

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  // Function to search for a country
  const handleCountrySearch = async () => {
    if (search.trim()) {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${search}`);
        setSearchedCountry(response.data[0]); // Set the first match
      } catch (error) {
        setSearchedCountry(null);
        alert('Country not found.');
      }
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container spacing={3} className={classes.gridContainer}>
          {/* Search Fields */}
          <Grid item xs={12}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    onKeyDown={handleKeyPress}
                    name="search"
                    variant="outlined"
                    label="Search Key Words"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name="countrySearch"
                    variant="outlined"
                    label="Search Country"
                    fullWidth
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Button onClick={handleCountrySearch} className={classes.searchButton} variant="contained" color="primary">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </AppBar>
            {searchedCountry && (
              <Paper className={classes.countryCard} elevation={6}>
                <Typography variant="h6">{searchedCountry.name.common}</Typography>
                <img src={searchedCountry.flags.png} alt={searchedCountry.name.common} height={100} />
                <Typography variant="body1">Capital: {searchedCountry.capital ? searchedCountry.capital[0] : 'Not available'}</Typography>
              </Paper>
            )}
          </Grid>

          {/* Posts Section */}
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
