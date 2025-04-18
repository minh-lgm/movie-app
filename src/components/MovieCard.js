import React, { useState } from 'react';
import { Box, IconButton, Typography, Card } from '@mui/material';
import { Favorite, FavoriteBorder, PlayArrow, Info } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../api/tmdb';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        position: 'relative',
        height: 0,
        paddingTop: '150%', // 2:3 aspect ratio
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          zIndex: 1,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        component={Link}
        to={`/movie/${movie.id}`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${IMAGE_BASE_URL}/${POSTER_SIZES.medium}${movie.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: isHovered
              ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)'
              : 'none',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isHovered ? 1 : 0,
          },
        }}
      />
      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1,
            color: 'white',
            zIndex: 2,
          }}
        >
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                mr: 1,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
              component={Link}
              to={`/movie/${movie.id}`}
            >
              <PlayArrow />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(movie);
              }}
              sx={{
                color: isFavorite ? '#E50914' : 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default MovieCard;
