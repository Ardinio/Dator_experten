import { Container } from "@mui/material";
import { Typography } from "@mui/material"

const HomePage = () => {
    return (
        <Container sx={{marginY: 20}}>
            This is Home Page
            <Typography>
                Välkommen till dator experten allt för att enkelt hitta eller bygga en dator.
            </Typography>
        </Container>
    )
}

export default HomePage;