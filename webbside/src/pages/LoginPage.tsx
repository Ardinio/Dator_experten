import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import { variables } from "../Variables";

const LoginPage = () => {
    const [page, setPage] = useState(0)
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<any[]>([]);

    const refreshPage = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        fetch(variables.API_URL+'user/GetOneUser', {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Email: email,
                Password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page]);

    return (
        <Container sx={{marginY: 10}}>
            <Login
                setEmail={setEmail}
                setPassword={setPassword}
                setPage={refreshPage}
            />
        </Container>
    )
}

export default LoginPage;