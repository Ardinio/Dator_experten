import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const ProductCardLaptop = (props: {lap: any} ) => {
    return (
        <Grid item xs={3}>
            <div>
                <Card key={props.lap.id}>
                    <CardMedia 
                        component="img"
                        height="200"
                        style={{backgroundSize: 'contain'}}
                        image={props.lap.product_image} />
                    <CardContent>
                        <Typography>
                            {props.lap.product_name}
                        </Typography>
                        <Typography>
                            {props.lap.price} SEK
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/laptopproduct/${props.lap.id}`} size="small" variant="contained">
                            Gå till produkt
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Grid>
    )
}

export default ProductCardLaptop