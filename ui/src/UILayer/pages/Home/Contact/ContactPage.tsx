import React from 'react';
import { Box, Typography, TextField, Button, Grid, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {ContactTheme} from "../../../../OrchestraLayer/ThemeLayer/StyleSetting/ContactTheme.tsx";



// Main component for the contact page
const ContactPage = () => {
    const contactTheme=ContactTheme;
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle form submission here,
        // for example, by sending the data to a backend server.
        // For now, we'll just log the data to the console.
        console.log('Form data submitted:', formData);
        alert('Thank you for your message!'); // Using a simple alert for demonstration
    };

    return (
        <ThemeProvider theme={contactTheme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            p: 4,
                        }}
                    >
                        <Typography variant="h3" align="center" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="h5" align="center" paragraph>
                            We'd love to hear from you! Please fill out the form below.
                        </Typography>

                        <Grid container spacing={4} mt={4}>
                            {/* Contact Form Section */}
                            <Grid item xs={12} md={6}>
                                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ mt: 2 }}
                                    >
                                        Send Message
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Contact Information Section */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Our Information
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <EmailIcon color="primary" sx={{ fontSize: 30 }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                                            <Typography variant="body1">contact@example.com</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <PhoneIcon color="primary" sx={{ fontSize: 30 }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                                            <Typography variant="body1">+1 (234) 567-890</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <LocationOnIcon color="primary" sx={{ fontSize: 30 }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                                            <Typography variant="body1">123 Main Street, Anytown, USA</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ContactPage;
