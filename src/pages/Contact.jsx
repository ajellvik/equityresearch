import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Connect With Me
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }} align="center">
              I'm always interested in connecting with fellow professionals in equity research and finance.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Professional Networks
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Feel free to connect with me on LinkedIn or reach out via email to discuss equity research,
                share insights, or exchange ideas about financial markets.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <IconButton
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  color="primary"
                  sx={{ 
                    border: 1, 
                    borderColor: 'primary.main',
                    p: 2,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton
                  href="mailto:your.email@example.com"
                  color="primary"
                  sx={{ 
                    border: 1, 
                    borderColor: 'primary.main',
                    p: 2,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }
                  }}
                >
                  <EmailIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                Note: This portfolio is for demonstration purposes only and showcases past research work.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 