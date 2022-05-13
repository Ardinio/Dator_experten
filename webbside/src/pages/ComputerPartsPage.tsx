import { Container } from "@mui/material";
import ProductLayout from "../components/products/ProductsLayout";

const ComputerPartsPage = () => {
    return (
        <Container sx={{marginY: 20}}>
            This is Computer parts Page
            <ProductLayout/>
        </Container>
    )
}

export default ComputerPartsPage;