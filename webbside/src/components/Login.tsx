import React from "react";
import { Grid, Paper, Avatar, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = (props: { setEmail: any , setPassword: any, setPage: any }) => {
    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto"
    }
    const avatarStyle = {
        backgroundColor: "#1bbd7e"
    }
    const btnStyle= {
        margin: "8px 0"
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Logga in</h2>
                </Grid>
                <TextField 
                    label="Email" 
                    placeholder="Ange din email address" 
                    type="email" 
                    fullWidth required 
                    onChange={e => props.setEmail(e.target.value)}
                />
                <TextField 
                    sx={{marginY: 1}} 
                    label="Lösenord" 
                    placeholder="Ange ditt lösenord" 
                    type="password" 
                    fullWidth required 
                    onChange={e => props.setPassword(e.target.value)}
                />
                <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={props.setPage}>
                    Logga in
                </Button>
                <Typography> Har du ett konto?
                    <Link to="/registration">
                        Registrera
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;