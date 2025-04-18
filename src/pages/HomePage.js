import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Grid, Alert, Button } from "@mui/material";
import TrendingCardGroup from "../components/TrendingCardGroup";
import Category from "../components/Category";

function HomePage() {
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [trendingList, setTrendingList] = useState([]);
  const [cutInitial, setcutInitial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoadingTrending(true);

        const res = await apiService.get(`/trending/all/day?api_key=${API_KEY}`);

        if (!res.data || !res.data.results) {
          throw new Error('Invalid response from TMDB API');
        }

        const result = res.data.results;
        setTrendingList(result);
        setcutInitial(result.slice(0, 5));
      } catch (e) {
        console.error('Error fetching trending movies:', e);
        setError(e.message || 'Failed to fetch trending movies');
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', p: 3 }}
      >
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent={{ md: "center", xs: "flex-end" }}
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 3 },
      }}
    >
      <Grid item>
        <TrendingCardGroup
          trendingList={trendingList}
          cutInitial={cutInitial}
          loadingTrending={loadingTrending}
        />
      </Grid>

      <Grid item sx={{ mt: 5 }}>
        <Category />
      </Grid>
    </Grid>
  );
}

export default HomePage;
