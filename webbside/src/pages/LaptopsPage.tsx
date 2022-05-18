import { Container } from "@mui/material";
import ProductLayoutLaptop from "../components/products/ProductLayoutLaptop";

const LaptopsPage = () => {
    return (
        <Container sx={{marginY: 20}}>
            This is Laptops Page
            <ProductLayoutLaptop/>
        </Container>
    )
}

export default LaptopsPage;