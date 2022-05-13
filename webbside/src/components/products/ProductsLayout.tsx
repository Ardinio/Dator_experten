import { useState, useEffect } from "react";
import { variables } from "../../Variables";

const ProductLayout = () => {
    const [computerparts, setcomputerparts] = useState<any[]>([]);

    useEffect(() => {
        fetch(variables.API_URL+'computerparts')
        .then(response => response.json())
        .then(data => {
            setcomputerparts(data);
        })
        .catch(error => console.log(error))
    }, [computerparts]);

    return (
        <div>
            If we get some data we are good
              {computerparts.map(com => 
                <div key={com.ComputerPartId}>
                    <div>{com.ComputerPartId}</div>
                    <div>{com.ProductName}</div>
                </div> 
            )} 
        </div>
    )
}

export default ProductLayout;