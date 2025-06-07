import React from 'react';
import axios from 'axios';
import config from "../../../globalconfig.json";
import type globalConfig from "../../../globalconfig.ts";
const PersonPage:React.FC=()=>{
    const server:globalConfig=config;
    const serverUrl:string=server.backend_url;
    const [person, setPerson] = React.useState<string>("");

    React.useEffect(() => {
        axios.get(`${serverUrl}/person/1`)
            .then(response => 
                {
               
                    setPerson(response.data);
                    console.log(response.data);
                }
                )
            .catch(error => console.error(error));
    }, []);
    return(
        <div>
            <h2>Person Page</h2>
            <p>This is the personal page of the user.</p>
            <div>
                <input type="text" value={person} readOnly />
            </div>
        </div>
    );
}
export default PersonPage;