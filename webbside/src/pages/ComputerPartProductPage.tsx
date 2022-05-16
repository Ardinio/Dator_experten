import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { variables } from "../Variables";

const ComputerPartProductPage = () => {
    const [page, setPage] = useState(1)
    const param = useParams<{ id: string }>();
    const [computerparts, setcomputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'computerparts/'+param.id)
        .then(response => response.json())
        .then(data => {
            setcomputerparts(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <Container sx={{marginY: 20}}>
            This is Computer Part Product Page
            <div>
            If we get some data we are good
            
              {computerparts && (computerparts.map(com =>
                <div key={com.id} > 
                    <div><p>{com.id}</p></div>
                    <div><p>{com.product_name}</p></div>
                </div>
                ))}
            </div>
        </Container>
    )
}

export default ComputerPartProductPage;