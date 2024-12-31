import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Research', path: '/research' },
    { text: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          component={Link}
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
          }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#1d1d1f',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            Anton Jellvik Equity Research
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#1d1d1f' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: 1.5,
                    color: '#1d1d1f',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    textTransform: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    opacity: location.pathname === item.path ? 1 : 0.8,
                    transition: 'opacity 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      opacity: 1,
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 