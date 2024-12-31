import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import TableChartIcon from '@mui/icons-material/TableChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SummarizeIcon from '@mui/icons-material/Summarize';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reports = JSON.parse(localStorage.getItem('researchReports') || '[]');
        const foundReport = reports.find(r => r.id === parseInt(id));
        if (foundReport) {
          setReport(foundReport);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [id]);

  if (!report) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4">Analysis not found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/research')}
          sx={{ mt: 2 }}
        >
          Back to Research
        </Button>
      </Container>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/research')}
          sx={{ mb: 4 }}
        >
          Back to Research
        </Button>

        {/* Header */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0 }}>
            <Avatar
              src={report.logoUrl}
              alt={`${report.title} logo`}
              variant="rounded"
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '& img': {
                  objectFit: 'contain',
                  padding: '8px',
                },
              }}
            >
              {report.title.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {report.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {report.description}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Executive Summary */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SummarizeIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2">
              Executive Summary
            </Typography>
          </Box>
          <Box 
            sx={{ 
              mb: 4,
              '& h1': { fontSize: '1.75rem', fontWeight: 'bold', mb: 2, mt: 2 },
              '& h2': { fontSize: '1.5rem', fontWeight: 'bold', mb: 2, mt: 2 },
              '& h3': { fontSize: '1.25rem', fontWeight: 'bold', mb: 1.5, mt: 1.5 },
              '& h4': { fontSize: '1.1rem', fontWeight: 'bold', mb: 1.5, mt: 1.5 },
              '& p': { mb: 1.5, lineHeight: 1.6 },
              '& ul, & ol': { mb: 1.5, pl: 3 },
              '& li': { mb: 0.5 },
              '& strong': { fontWeight: 'bold' },
              '& em': { fontStyle: 'italic' },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
              '& blockquote': { 
                borderLeft: '4px solid',
                borderColor: 'divider',
                pl: 2,
                py: 1,
                my: 2 
              }
            }}
            dangerouslySetInnerHTML={{ __html: report.methodology }}
          />

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="h2">
              Investment Recommendation
            </Typography>
          </Box>
          
          <Grid container spacing={3} sx={{ mb: 0 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 3, 
                bgcolor: 'background.default', 
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Target Price
                </Typography>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                  ${report.valuation?.metrics?.targetPrice}
                </Typography>
                <Typography 
                  variant="h6" 
                  color={report.valuation?.metrics?.upside?.includes('-') ? 'error.main' : 'success.main'}
                  sx={{ mt: 1 }}
                >
                  {report.valuation?.metrics?.upside} Potential
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 3, 
                bgcolor: 'background.default', 
                borderRadius: 2,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Recommendation
                </Typography>
                <Chip
                  label={report.valuation?.metrics?.recommendation}
                  color={
                    report.valuation?.metrics?.recommendation?.toLowerCase().includes('buy') 
                      ? 'success' 
                      : report.valuation?.metrics?.recommendation?.toLowerCase().includes('sell')
                      ? 'error'
                      : 'warning'
                  }
                  sx={{ 
                    fontSize: '1.5rem', 
                    py: 3,
                    px: 3,
                    '& .MuiChip-label': {
                      px: 2
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* PDF Preview */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            mb: 3,
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArticleIcon color="primary" />
            <Typography variant="h6">Research Report</Typography>
          </Box>
          <Box sx={{ height: '800px' }}>
            <iframe
              src={report.pdfUrl}
              title="PDF Preview"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* Excel Preview */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            mb: 3,
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TableChartIcon color="primary" />
            <Typography variant="h6">Financial Model</Typography>
          </Box>
          <Box 
            sx={{ 
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              p: 4,
              textAlign: 'center'
            }}
          >
            <TableChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Financial Model Available for Download
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
              The financial model is available in Excel format (.xlsx) for detailed analysis and customization.
            </Typography>
            <Button
              startIcon={<TableChartIcon />}
              variant="contained"
              size="large"
              onClick={() => {
                const link = document.createElement('a');
                link.href = report.excelUrl;
                link.download = `${report.title} - Financial Model.xlsx`;
                link.click();
              }}
              sx={{ 
                py: 2,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Download Financial Model
            </Button>
          </Box>
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* Download Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            startIcon={<ArticleIcon />}
            variant="contained"
            size="large"
            onClick={() => {
              const link = document.createElement('a');
              link.href = report.pdfUrl;
              link.download = `${report.title} - Research Report.pdf`;
              link.click();
            }}
          >
            Download Research Report
          </Button>
          <Button
            startIcon={<TableChartIcon />}
            variant="outlined"
            size="large"
            onClick={() => {
              const link = document.createElement('a');
              link.href = report.excelUrl;
              link.download = `${report.title} - Financial Model.xlsx`;
              link.click();
            }}
          >
            Download Financial Model
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AnalysisDetail; 