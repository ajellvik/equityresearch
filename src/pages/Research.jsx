import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import TableChartIcon from '@mui/icons-material/TableChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Research = () => {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('all');
  const [reports, setReports] = useState([]);

  // Load reports from localStorage
  useEffect(() => {
    const savedReports = localStorage.getItem('researchReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  // Get unique sectors from reports
  const sectors = ['all', ...new Set(reports.map(report => report.sector))];

  const handleCardClick = (id) => {
    navigate(`/research/${id}`);
  };

  const handleSectorFilter = (sector) => {
    setSelectedSector(sector);
  };

  const filteredReports = selectedSector === 'all'
    ? reports
    : reports.filter(report => report.sector === selectedSector);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Research Portfolio
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          A collection of my equity research analysis and financial models
        </Typography>

        {/* Filter Section */}
        {reports.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterAltIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" color="text.secondary">
                Filter by Sector:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {sectors.map((sector) => (
                <Chip
                  key={sector}
                  label={sector === 'all' ? 'All Sectors' : sector}
                  onClick={() => handleSectorFilter(sector)}
                  color={selectedSector === sector ? 'primary' : 'default'}
                  variant={selectedSector === sector ? 'filled' : 'outlined'}
                  sx={{ 
                    textTransform: 'capitalize',
                    '&:hover': {
                      backgroundColor: selectedSector === sector 
                        ? 'primary.main' 
                        : 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Grid container spacing={4}>
          {filteredReports.map((report) => (
            <Grid item xs={12} md={6} key={report.id}>
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleCardClick(report.id)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar
                      src={report.logoUrl}
                      alt={`${report.title} logo`}
                      variant="rounded"
                      sx={{
                        width: 64,
                        height: 64,
                        mr: 2,
                        backgroundColor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                        '& img': {
                          objectFit: 'contain',
                          padding: '8px',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    >
                      {report.title.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={report.sector}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={report.date}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {report.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {report.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    startIcon={<ArticleIcon />}
                    variant="contained"
                    href={report.pdfUrl.startsWith('data:') ? report.pdfUrl : `/${report.pdfUrl}`}
                    target="_blank"
                    sx={{ mr: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (report.pdfUrl.startsWith('data:')) {
                        const link = document.createElement('a');
                        link.href = report.pdfUrl;
                        link.download = 'report.pdf';
                        link.click();
                      }
                    }}
                  >
                    View Report
                  </Button>
                  <Button
                    startIcon={<TableChartIcon />}
                    variant="outlined"
                    href={report.excelUrl.startsWith('data:') ? report.excelUrl : `/${report.excelUrl}`}
                    target="_blank"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (report.excelUrl.startsWith('data:')) {
                        const link = document.createElement('a');
                        link.href = report.excelUrl;
                        link.download = 'model.xlsx';
                        link.click();
                      }
                    }}
                  >
                    View Model
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredReports.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              backgroundColor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <DownloadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Reports Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedSector === 'all' 
                ? 'Research reports and analysis will be added shortly'
                : `No reports available in the ${selectedSector} sector`}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Research; 