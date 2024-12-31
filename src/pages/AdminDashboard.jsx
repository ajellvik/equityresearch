import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  Divider,
  Alert,
  Avatar,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';

// TabPanel component for tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  'header',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'blockquote', 'link'
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editingReport, setEditingReport] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [reports, setReports] = useState([]);

  const emptyFormData = {
    id: null,
    title: '',
    ticker: '',
    description: '',
    sector: '',
    date: '',
    methodology: '', // Executive Summary
    recommendation: '', // Investment Recommendation
    targetPrice: '',
    upside: '',
    pdfUrl: '',
    excelUrl: '',
    logoUrl: '',
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [pdfFile, setPdfFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e, field = null) => {
    if (field === 'methodology') {
      // Handle rich text editor change
      setFormData(prev => ({
        ...prev,
        methodology: e
      }));
      return;
    }

    // Handle regular input changes
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild 
            ? {
                ...prev[parent][child],
                [grandchild]: value,
              }
            : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      switch (type) {
        case 'pdf':
          setPdfFile({ name: file.name, data: reader.result });
          break;
        case 'excel':
          setExcelFile({ name: file.name, data: reader.result });
          break;
        case 'logo':
          setLogoFile({ name: file.name, data: reader.result });
          setLogoPreview(reader.result);
          break;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a new report object
      const newReport = {
        ...formData,
        id: editingReport ? editingReport.id : Date.now(),
        ticker: formData.ticker.toUpperCase().trim(),
        date: formData.date || new Date().toISOString().split('T')[0],
        pdfUrl: pdfFile?.data || '',
        excelUrl: excelFile?.data || '',
        logoUrl: logoFile?.data || '',
        valuation: {
          metrics: {
            targetPrice: formData.targetPrice,
            upside: formData.upside,
            recommendation: formData.recommendation
          }
        }
      };

      // Get existing reports
      const existingReports = JSON.parse(localStorage.getItem('researchReports') || '[]');
      
      // Update or add the new report
      const updatedReports = editingReport
        ? existingReports.map(report => report.id === editingReport.id ? newReport : report)
        : [...existingReports, newReport];

      // Save to localStorage
      localStorage.setItem('researchReports', JSON.stringify(updatedReports));
      setReports(updatedReports);

      // Reset form
      setFormData(emptyFormData);
      setEditingReport(null);
      setPdfFile(null);
      setExcelFile(null);
      setLogoFile(null);
      setLogoPreview(null);
      
      // Show success message
      setSuccessMessage(`Report ${editingReport ? 'updated' : 'created'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);

      // Switch to the reports list tab
      setTabValue(1);
    } catch (error) {
      console.error('Error saving report:', error);
      setSuccessMessage('Error saving report. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEditClick = (report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      ticker: report.ticker,
      description: report.description,
      sector: report.sector,
      date: report.date,
      methodology: report.methodology,
      targetPrice: report.valuation?.metrics?.targetPrice || '',
      upside: report.valuation?.metrics?.upside || '',
      recommendation: report.valuation?.metrics?.recommendation || '',
    });
    setLogoPreview(report.logoUrl);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    const updatedReport = {
      ...formData,
      id: editingReport.id,
      pdfUrl: pdfFile?.data || editingReport.pdfUrl,
      excelUrl: excelFile?.data || editingReport.excelUrl,
      logoUrl: logoFile?.data || editingReport.logoUrl,
      valuation: {
        metrics: {
          targetPrice: formData.targetPrice,
          upside: formData.upside,
          recommendation: formData.recommendation
        }
      }
    };

    const updatedReports = reports.map(report => 
      report.id === editingReport.id ? updatedReport : report
    );

    setReports(updatedReports);
    localStorage.setItem('researchReports', JSON.stringify(updatedReports));
    
    setIsEditDialogOpen(false);
    setEditingReport(null);
    setFormData(emptyFormData);
    setPdfFile(null);
    setExcelFile(null);
    setLogoFile(null);
    setLogoPreview(null);
    setSuccessMessage('Report updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Load reports from localStorage on component mount
  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('researchReports') || '[]');
    setReports(savedReports);
  }, []);

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
      localStorage.setItem('researchReports', JSON.stringify(updatedReports));
      setSuccessMessage('Report deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDelete = (reportId) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem('researchReports', JSON.stringify(updatedReports));
    setSuccessMessage('Report deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const renderReportForm = () => {
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ mr: 3 }}>
                <input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  hidden
                  onChange={(e) => handleFileChange(e, 'logo')}
                />
                <label htmlFor="logo-upload">
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {logoPreview ? (
                      <Avatar
                        src={logoPreview}
                        variant="rounded"
                        sx={{
                          width: '100%',
                          height: '100%',
                          '& img': {
                            objectFit: 'contain',
                            padding: '12px',
                          },
                        }}
                      />
                    ) : (
                      <>
                        <ImageIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          Upload Logo
                        </Typography>
                      </>
                    )}
                  </Box>
                </label>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ticker Symbol"
                      name="ticker"
                      value={formData.ticker}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Sector"
                      name="sector"
                      value={formData.sector}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e)}
                      multiline
                      rows={2}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Date"
                      name="date"
                      type="month"
                      value={formData.date}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Executive Summary */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Executive Summary</Typography>
            <Box sx={{ 
              '.ql-container': {
                minHeight: '200px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              },
              '.ql-editor': {
                minHeight: '200px',
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
              },
              '.ql-toolbar': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px 4px 0 0',
              },
              '.ql-container': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderTop: 0,
                borderRadius: '0 0 4px 4px',
                minHeight: '200px'
              }
            }}>
              <ReactQuill
                value={formData.methodology}
                onChange={(e) => handleInputChange(e, 'methodology')}
                modules={modules}
                formats={formats}
                placeholder="Write your executive summary here..."
              />
            </Box>
          </Grid>

          {/* Investment Recommendation */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Investment Recommendation</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Price"
                  name="targetPrice"
                  value={formData.targetPrice}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Upside/Downside"
                  name="upside"
                  value={formData.upside}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Recommendation"
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={(e) => handleInputChange(e)}
                  required
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select a recommendation</option>
                  <option value="Strong Buy">Strong Buy</option>
                  <option value="Buy">Buy</option>
                  <option value="Hold">Hold</option>
                  <option value="Sell">Sell</option>
                  <option value="Strong Sell">Strong Sell</option>
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* File Uploads */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Files</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  Upload PDF Report
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'pdf')}
                  />
                </Button>
                {pdfFile && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Selected: {pdfFile.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  Upload Excel Model
                  <input
                    type="file"
                    hidden
                    accept=".xlsx,.xls"
                    onChange={(e) => handleFileChange(e, 'excel')}
                  />
                </Button>
                {excelFile && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Selected: {excelFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderReportsList = () => (
    <Grid container spacing={3}>
      {reports.map((report) => (
        <Grid item xs={12} key={report.id}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar
                      src={report.logoUrl}
                      variant="rounded"
                      sx={{
                        width: 80,
                        height: 80,
                        mr: 2,
                        backgroundColor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                        '& img': {
                          objectFit: 'contain',
                          padding: '8px',
                        },
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {report.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {report.ticker} - {report.sector}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {report.description}
                      </Typography>
                      <Box 
                        sx={{ 
                          mb: 2,
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
                      <Typography variant="body2" color="text.secondary">
                        Target Price: {report.valuation?.metrics?.targetPrice || 'N/A'} | 
                        Upside: {report.valuation?.metrics?.upside || 'N/A'} | 
                        Recommendation: {report.valuation?.metrics?.recommendation || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {report.pdfUrl && (
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => window.open(report.pdfUrl)}
                      >
                        View PDF
                      </Button>
                    )}
                    {report.excelUrl && (
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => window.open(report.excelUrl)}
                      >
                        View Excel
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditClick(report)}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleDeleteReport(report.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Add New Report" />
          <Tab label="Manage Reports" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderReportForm()}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save Research Entry
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderReportsList()}
      </TabPanel>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {renderReportForm()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 