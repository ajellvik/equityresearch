import { Container, Typography, Box, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component={motion.h1}
            variant="h2"
            gutterBottom
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Equity Research Portfolio
          </Typography>
          <Typography
            component={motion.p}
            variant="h5"
            sx={{ mb: 4 }}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A collection of my equity analysis and market research work
          </Typography>
          <Button
            component={Link}
            to="/research"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            View Research
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            About My Work
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This portfolio showcases my equity research work, featuring in-depth company analyses
            and market research projects. Each analysis demonstrates my approach to understanding
            companies, markets, and investment opportunities.
          </Typography>
          <Typography variant="body1">
            Through these reports, I explore various aspects of company valuation, market dynamics,
            and industry trends. My work reflects a combination of fundamental analysis and modern
            valuation methodologies.
          </Typography>
        </Box>

        <Box 
          sx={{ 
            mb: 6,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: { xs: 4, md: 2 },
            }}
          >
            {[
              {
                number: '5+',
                label: 'Years Experience',
                description: 'Equity Analysis & Research',
              },
              {
                number: '#8',
                label: 'MSF Program',
                description: 'Brandeis International Business School',
              },
              {
                number: '10+',
                label: 'Companies Analyzed',
                description: 'Across Multiple Sectors',
              },
            ].map((item, index, array) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  {item.number}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: '200px' }}
                >
                  {item.description}
                </Typography>
                {index < array.length - 1 && (
                  <Divider
                    orientation="vertical"
                    sx={{
                      position: 'absolute',
                      right: -16,
                      height: '100%',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 