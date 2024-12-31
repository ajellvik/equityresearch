import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6e6e73',
              fontSize: '12px',
              letterSpacing: '-0.01em',
            }}
          >
            © {new Date().getFullYear()} Anton Jellvik Equity Research. All rights reserved.
          </Typography>
          <Link
            component={RouterLink}
            to="/admin"
            sx={{
              color: '#6e6e73',
              fontSize: '12px',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            Admin
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 