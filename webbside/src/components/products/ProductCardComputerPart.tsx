import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const ProductCardComputerPart = (props: {com: any} ) => {
    return (
        <Grid item xs={3}>
            <div>
                <Card key={props.com.id}>
                    <CardMedia image={props.com.image_link} style={{height: 210, width: '100%'}}/>
                    <CardContent>
                        <Typography>
                            {props.com.product_name}
                        </Typography>
                        <Typography>
                            {props.com.price} SEK
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/computerpartproduct/${props.com.id}`} size="small" variant="contained">
                            Gå till produkt
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Grid>
    )
}

export default ProductCardComputerPart