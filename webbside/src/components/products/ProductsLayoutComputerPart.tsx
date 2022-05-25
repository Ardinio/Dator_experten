import { useState, useEffect } from "react";
import { Variables } from "../../Variables";
import { Grid } from "@mui/material";
import ProductCardComputerPart from "./ProductCardComputerPart";

const ProductLayoutComputerPart = () => {
    const [page ] = useState(1)
    const [computerparts, setComputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(Variables.API_URL+'computerparts/GetAllComputerParts')
        .then(response => response.json())
        .then(data => {
            setComputerparts(data);
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