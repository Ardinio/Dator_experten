import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const Navbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar>
                    <Toolbar>
                            <Link to="/">
                                <img
                                    src=""
                                    alt="awards icon"
                                />
                            </Link>
                        <Typography variant="h6" component="h3">
                            <Link to="/computerparts">
                                <p>Dator delar</p>
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="h3">
                            <Link to="/laptops">
                                <p>Bärbara datorer</p>
                            </Link>
                        </Typography>
                        <Typography variant="h6" component="h3">
                            <Link to="/login">
                                <p>Logga in</p>
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    )
};

const theme =  createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "h6",
                    },
                    style: {
                        padding: 10,
                    },
                },
            ]
        },
    },
})

export default Navbar;