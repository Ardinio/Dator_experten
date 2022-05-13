import { useState, useEffect } from "react";
import { variables } from "../../Variables";

const ProductLayout = () => {
    const [page, setPage] = useState(1)
    const [computerparts, setcomputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'computerparts/1')
        .then(response => response.json())
        .then(data => {
            setcomputerparts(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <div>
            If we get some data we are good
            
              {computerparts && (computerparts.map(com =>
                <div key={com.id} > 
                    <div><p>{com.id}</p></div>
                    <div><p>{com.product_name}</p></div>
                </div>
                ))}
        </div>
    )
}

export default ProductLayout;