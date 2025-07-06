import React from 'react';
import axios from 'axios';
import config from "../../../globalconfig.json";
import type globalConfig from "../../../globalconfig.ts";
import EmptyImage from "../../assets/LoadingImage.png";
import Container from '@mui/material/Container';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

interface PersonData {
    personName: string;
    personBirthDay: string;
    personAvatar: string;
}

const PersonPage:React.FC=()=>{
  const serverUrl: string = config.backend_url;
    const [person, setPerson] = React.useState<PersonData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

   React.useEffect(()=>{

     const fetchPersonData = async () => {
            try {
                setLoading(true);
                axios.get<PersonData>(`${serverUrl}/person/1`).then(
                    (response)=>{
                setPerson(response.data);
                setError(null);        
                    }
                ).catch((err)=>{
                    console.error(err);
                setError("Failed to fetch person data.");
                // Set default/fallback data if needed
                setPerson({ personName: 'N/A', personBirthDay: 'N/A', personAvatar: EmptyImage });

                
            });
           
        }
        catch{
            console.error("There is an error");
        }
    }

        fetchPersonData();
},[]);

    if(loading){

    return(
        <div>
            <div>
                <h2>Hi Everyone, Here is my personal information</h2>
            </div>
              <Box >
            <Typography variant="h4" component="h2" gutterBottom align="center">
                Hi Everyone, Here is my personal information
            </Typography>
            <Grid container spacing={60} sx={{ border: '1px solid red', p: 2 }}>
                <Grid>
                    <Typography variant="h4">Person Name: {person?.personName}</Typography>
                    <Typography variant="h4">Person Birthday: {person?.personBirthDay}</Typography>
                </Grid>
                <Grid   sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box component="img" src={person?.personAvatar || EmptyImage} alt="Person Avatar" sx={{ width: 200, height: 200, borderRadius: '50%', border: '1px solid red', objectFit: 'cover' }} />
                </Grid>
            </Grid>
        </Box>
        </div>
    );}
    else{
        return(
            <div>
                <h1>Error</h1>
            </div>
        )
    }
    
}
export default PersonPage;