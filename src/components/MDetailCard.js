import React, { useState } from "react";
// import apiService from "../api/apiService";
// import { API_KEY } from "../api/config";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
// import VideoPlayer from "./VideoPlayer";

function MDetailCard({ movieDetail, loading }) {
  let { movieId } = useParams();
  const [movieError, setmovieError] = useState();

  const addFavMovie = (title, poster, voteA, voteC, id) => {
    let list = JSON.parse(localStorage.getItem("fav"));
    if (list) {
      let itemId;
      for (let i = 0; i < list.length; i++) {
        itemId = list[i].movie.id;
      }
      if (itemId.includes(movieId)) {
        setmovieError("You had this item!");
      } else {
        list.push({
          id: id,
          original_title: title,
          poster_path: poster,
          vote_average: voteA,
          vote_count: voteC,
        });

        localStorage.setItem("fav", JSON.stringify(list));
        setmovieError("Added!");
      }
    } else {
      localStorage.setItem("fav", JSON.stringify([]));
      list = JSON.parse(localStorage.getItem("fav"));
      list.push({
        id: id,
        original_title: title,
        poster_path: poster,
        vote_average: voteA,
        vote_count: voteC,
      });
      localStorage.setItem("fav", JSON.stringify(list));
      setmovieError("Added!");
    }
  };
  const detailSkeleton = (
    <Stack spacing={3} sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', p: 3, borderRadius: 2 }}>
      <Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} height={60} />
      <Skeleton variant="circular" width={80} height={80} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
      <Skeleton variant="rectangular" width="100%" height={400} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
    </Stack>
  );
  return (
    <>
      {loading ? (
        detailSkeleton
      ) : movieDetail ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
            p: 4,
            color: 'white',
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: '300px' },
              '& img': {
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
              },
            }}
          >
            <img
              alt={movieDetail.original_title}
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              loading="lazy"
            />
          </Box>

          <Stack
            spacing={3}
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {movieDetail.original_title}
                </Typography>
                <IconButton
                  onClick={() =>
                    addFavMovie(
                      movieDetail.original_title,
                      movieDetail.poster_path,
                      movieDetail.vote_average,
                      movieDetail.vote_count,
                      movieDetail.id
                    )
                  }
                  sx={{
                    color: 'white',
                    '&:hover': { color: '#ff1744' },
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                {movieError && (
                  <Typography variant="subtitle1" color="error.light">
                    {movieError}
                  </Typography>
                )}
              </Stack>

              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <RecommendIcon sx={{ color: '#2196f3' }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {movieDetail.vote_count.toLocaleString()} votes · {movieDetail.vote_average}/10
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <StarIcon sx={{ color: '#ffd700' }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Popularity: {Math.round(movieDetail.popularity).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                OVERVIEW
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.9)' }}>
                {movieDetail.overview}
              </Typography>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                GENRES
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {movieDetail.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      backdropFilter: 'blur(8px)',
                    }}
                    icon={<StarIcon sx={{ color: '#ffd700' }} />}
                  />
                ))}
              </Stack>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                PRODUCTION COMPANIES
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {movieDetail.production_companies
                  .filter(company => company.logo_path)
                  .map(company => (
                    <Chip
                      key={company.id}
                      avatar={
                        <Avatar
                          alt={company.name}
                          src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                          sx={{ bgcolor: 'white', p: 0.5 }}
                        />
                      }
                      label={company.name}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                        backdropFilter: 'blur(8px)',
                      }}
                    />
                  ))}
              </Stack>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#90caf9' }}>
                DETAILS
              </Typography>
              <Stack spacing={1.5}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Release Date: {new Date(movieDetail.release_date).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
                {movieDetail.runtime && (
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Runtime: {movieDetail.runtime} minutes
                  </Typography>
                )}
              </Stack>
            </Box>


          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}

      <Divider />
    </>
  );
}

export default MDetailCard;
