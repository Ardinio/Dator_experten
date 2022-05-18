import { useState, useEffect } from "react";
import { variables } from "../../Variables";
import { Grid } from "@mui/material";
import ProductCardLaptop from "./ProductCardLaptop";

const ProductLayoutLaptop = () => {
    const [page ] = useState(1)
    const [laptops, setLaptops] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'laptops/GetAllLaptops')
        .then(response => response.json())
        .then(data => {
            setLaptops(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <Grid container spacing={5}>
           {laptops.map((lap, index) => 
           <ProductCardLaptop lap={lap} key={index}/>)}
        </Grid>
    )
}

export default ProductLayoutLaptop;