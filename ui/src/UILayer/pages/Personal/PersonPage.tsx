import React from 'react';
import axios from 'axios';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

interface PersonData {
    personName: string;
    personBirthDay: string;
    personAvatar: string;
}

// Fallback image in case of error or missing avatar
const EmptyImage = 'https://via.placeholder.com/200?text=No+Image';

const serverUrl = 'http://localhost:3000'; // Replace with your actual server URL

const PersonPage: React.FC = () => {
    const [person, setPerson] = React.useState<PersonData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchPersonData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<PersonData>(`${serverUrl}/person/1`);
                setPerson(response.data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch person data.');
                setPerson({ personName: 'N/A', personBirthDay: 'N/A', personAvatar: EmptyImage });
            } finally {
                setLoading(false);
            }
        };

        fetchPersonData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
                <CircularProgress />
                <Typography variant="h6" mt={2}>Loading personal information...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
                <Typography variant="h4" color="error">Error</Typography>
                <Typography variant="body1">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Hi Everyone, Here is my personal information
            </Typography>
            <Grid container spacing={6} sx={{ border: '1px solid red', p: 2 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">Person Name: {person?.personName}</Typography>
                    <Typography variant="h4">Person Birthday: {person?.personBirthDay}</Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src={person?.personAvatar || EmptyImage}
                        alt="Person Avatar"
                        sx={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: '1px solid red',
                            objectFit: 'cover'
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonPage;