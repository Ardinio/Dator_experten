import { useState, useEffect } from "react";
import { variables } from "../../Variables";
import { Grid } from "@mui/material";
import ProductCardComputerPart from "./ProductCardComputerPart";

const ProductLayoutComputerPart = () => {
    const [page ] = useState(1)
    const [computerparts, setcomputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'computerparts/GetAllComputerParts')
        .then(response => response.json())
        .then(data => {
            setcomputerparts(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <Grid container spacing={5}>
           {computerparts.map((com, index) => 
           <ProductCardComputerPart com={com} key={index}/>)}
        </Grid>
    )
}

export default ProductLayoutComputerPart;