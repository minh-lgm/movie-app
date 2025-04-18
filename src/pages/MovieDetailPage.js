import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Rating,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Favorite, FavoriteBorder, PlayArrow } from '@mui/icons-material';
import { getMovieDetails, IMAGE_BASE_URL, BACKDROP_SIZES, POSTER_SIZES } from '../api/tmdb';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: movie, isLoading, error } = useQuery(['movie', id], () =>
    getMovieDetails(Number(id))
  );

  useEffect(() => {
    let isMounted = true;
    const checkFavoriteStatus = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
      if (isMounted) {
        setIsFavorite(favorites.some((m) => m.id === Number(id)));
      }
    };
    checkFavoriteStatus();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((m) => m.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify([...favorites, movie])
      );
    }
    setIsFavorite(!isFavorite);
  };

  if (error) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#141414',
          color: 'white',
          gap: 2,
        }}
      >
        <Typography variant="h5">Error loading movie details</Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ bgcolor: '#E50914', '&:hover': { bgcolor: '#B20710' } }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (isLoading || !movie) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#141414',
          color: 'white',
        }}
      >
        <CircularProgress sx={{ color: '#E50914' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#141414' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '95vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: `url(${IMAGE_BASE_URL}/${BACKDROP_SIZES.original}${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(20,20,20,0.8) 50%, #141414 100%)',
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2, color: 'white', mt: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            {movie.title}
          </Typography>
          {movie.tagline && (
            <Typography
              variant="h5"
              sx={{ mb: 3, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}
            >
              {movie.tagline}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              sx={{ color: '#E50914' }}
            />
            <Typography>
              {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
            </Typography>
            <Typography>•</Typography>
            <Typography>{movie.release_date.split('-')[0]}</Typography>
            <Typography>•</Typography>
            <Typography>{movie.runtime} minutes</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              />
            ))}
          </Box>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '50%',
              display: { xs: 'none', md: 'block' },
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {movie.overview}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                bgcolor: '#E50914',
                '&:hover': { bgcolor: '#B20710' },
                textTransform: 'none',
              }}
            >
              {movie.videos?.results?.length > 0 ? 'Play Trailer' : 'No Trailer Available'}
            </Button>
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                color: isFavorite ? '#E50914' : 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Additional Content */}
      <Container sx={{ py: 4, color: 'white' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          About {movie.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {movie.overview}
        </Typography>
        {movie.production_companies.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Production Companies
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {movie.production_companies.map((company) => (
                <Chip
                  key={company.id}
                  label={company.name}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetailPage;
