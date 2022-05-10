import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>
                        <Link to="/computerparts">
                            <p>Dator delar</p>
                        </Link>
                    </Typography>
                    <Typography>
                        <Link to="/laptops">
                            <p>Bärbara datorer</p>
                        </Link>
                    </Typography>
                    <Typography>
                        <Link to="/login">
                            <p>Logga in</p>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Navbar;