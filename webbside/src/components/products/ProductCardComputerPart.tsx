import { useState, useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { variables } from "../../Variables";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const ProductCardComputerPart = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1)
    const [computerparts, setcomputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'computerparts/GetAllLaptops')
        .then(response => response.json())
        .then(data => {
            setcomputerparts(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <div>
            {computerparts && (computerparts.map(com =>
                <Card key={com.id}>
                <CardMedia image={com.image_link}/>
                <CardContent>
                    <Typography>
                        {com.product_name}
                    </Typography>
                    <Typography>
                        {com.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>
                        
                    </Button>
                </CardActions>
            </Card>
            ))}
        </div>
    )
}

export default ProductCardComputerPart