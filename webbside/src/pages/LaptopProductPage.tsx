import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Variables } from "../Variables";

const LaptopsProductPage = () => {
    const [page] = useState(1)
    const [expanded, setExpanded] = useState<string | false>(false);
    const [laptops, setLaptops] = useState<any[]>([]);
    const param = useParams<{ id: string }>();

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        fetch(Variables.API_URL+'laptops/'+param.id)
        .then(response => response.json())
        .then(data => {
            setLaptops(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <Container sx={{marginY: 20}}>
            This is Laptop Product Page
            <div>
            If we get some data we are good
            
              {laptops && (laptops.map(lap =>
                <div key={lap.id} > 
                <Box marginTop={3} sx={{ display: "flex"}}>
                    <img
                        src={lap.product_image}
                        alt="product img"
                    />
                </Box>
                <Box>
                    <Typography variant="h6" component="h4" marginTop={3}>
                        {lap.product_name}
                    </Typography>
                    <Typography variant="h6" component="h4">
                        {lap.price} SEK
                    </Typography>
                    <Typography variant="h5" component="h3" marginTop={3}>
                        Om produkten
                    </Typography>
                    <Typography variant="body2" component="p" marginTop={3}>
                        {lap.information}
                    </Typography>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Specifikationer
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {lap.specification}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                </div>
                ))}
            </div>
        </Container>
    )
}

export default LaptopsProductPage;