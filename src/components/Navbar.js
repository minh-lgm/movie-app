import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Typography,
} from '@mui/material';

import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Movie,
  Favorite,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled
    ? 'rgba(20, 20, 20, 0.95)'
    : 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent)',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  boxShadow: 'none',
  transition: 'all 0.3s ease-in-out',
  width: '100%',
  left: 0,
  right: 0,
}));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      if (query.trim()) {
        navigate(`/?search=${encodeURIComponent(query)}`);
        setShowSearch(false);
      }
    }
  };

  return (
    <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          px: { xs: 1, sm: 2, md: 3 },
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: 'none' } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 900,
                color: '#fff',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                letterSpacing: '-0.5px',
              }}
            >
              Movies App
            </Typography>
          </Link>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<Movie />}
              component={Link}
              to="/"
              sx={{ textTransform: 'none' }}
            >
              Movies
            </Button>
            <Button
              color="inherit"
              startIcon={<Favorite />}
              component={Link}
              to="/favorite"
              sx={{ textTransform: 'none' }}
            >
              Favorites
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showSearch ? (
            <Search sx={{ width: { xs: 200, sm: 300 } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search movies…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={handleSearch}
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </Search>
          ) : (
            <IconButton color="inherit" onClick={() => setShowSearch(true)}>
              <SearchIcon />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <AccountCircle />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              backgroundColor: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(10px)',
              color: 'white',
            },
          }}
        >
          <MenuItem
            component={Link}
            to="/"
            onClick={handleMenuClose}
            sx={{ gap: 1 }}
          >
            <Movie fontSize="small" /> Movies
          </MenuItem>
          <MenuItem
            component={Link}
            to="/favorite"
            onClick={handleMenuClose}
            sx={{ gap: 1 }}
          >
            <Favorite fontSize="small" /> Favorites
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
