import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Box, Container, Typography, Divider } from "@mui/material";
import MDetailCard from "../components/MDetailCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MovieItemPage() {
  // let location = useLocation();
  let auth = useAuth();
  console.log(auth.user);
  let { movieId } = useParams();
  const [loading, setLoading] = useState();
  const [movieDetail, setMovieDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        console.log(res.data);
        setMovieDetail(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: movieDetail
          ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`
          : 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          mb={3} 
          color="white"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Movie Details
        </Typography>
        <Divider sx={{ mb: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        <MDetailCard movieDetail={movieDetail} loading={loading} />
      </Container>
    </Box>
  );
}

export default MovieItemPage;
