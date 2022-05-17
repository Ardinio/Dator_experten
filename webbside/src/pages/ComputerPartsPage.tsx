import { Container } from "@mui/material";
import ProductLayoutComputerPart from "../components/products/ProductsLayoutComputerPart";

const ComputerPartsPage = () => {
    return (
        <Container sx={{marginY: 20}}>
            This is Computer parts Page
            <ProductLayoutComputerPart/>
        </Container>
    )
}

export default ComputerPartsPage;