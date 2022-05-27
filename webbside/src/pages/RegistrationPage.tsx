import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Variables } from "../Variables";
import FormInput from "../components/Registration/FormInput";

const RegistrationPage = () => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImageFileName: "anonymous.png",
        profileImage: Variables.IMAGE_URL
    });
    const [user, setUser] = useState<any[]>([]);
    const [page, setPage] = useState(0)

    const inputs = [
        {
            id:1,
            name: "firstname",
            type: "text",
            placeholder: "Förnamn",
            errorMessage: "Du måste ange ditt förnamn!",
            label: "Förnamn",
            pattern: "^[A-Za-z]{1,40}$",
            required: true,
        },
        {
            id:2,
            name: "lastname",
            type: "text",
            placeholder: "Efternamn",
            errorMessage: "Du måste ange ditt efternamn!",
            label: "Efternamn",
            required: true,
        },
        {
            id:3,
            name: "age",
            type: "date",
            placeholder: "Födelsedag",
            label: "Födelsedag",
        },
        {
            id:4,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Ange ett befintlig email!",
            label: "Email",
            required: true,
        },
        {
            id:5,
            name: "profileImage",
            type: "text",
            placeholder: "Profilbild",
            label: "Profilbild",
        },
        {
            id:6,
            name: "password",
            type: "password",
            placeholder: "Lösenord",
            errorMessage: "Lösenordet ska vara 8-20 tecken som åtminstone ska innehålla en bokstav och en siffra!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            label: "Lösenord",
            required: true,
        },
        {
            id:7,
            name: "confirmPassword",
            type: "password",
            placeholder: "Bekräfta Lösenord",
            errorMessage: "Lösenorden matchar inte!",
            label: "Bekräfta Lösenord",
            pattern: values.password,
            required: true,
        }
    ];

    const refreshPage = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        fetch(Variables.API_URL+'user', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FirstName: values.firstname,
                LastName: values.lastname,
                Age: values.age,
                Email: values.email,
                // ProfileImage: values.profileImageFileName,
                Password: values.password
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            console.log(data);
        })
        .catch(error => console.log(error))
    }, [page])
    
    const paperStyle = {
        padding: "10px 60px"
    }

    const contentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        hegiht: "100vh"
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    console.log(values)

    return (
        <Container sx={{marginY: 10}} style={contentStyle}>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign: "center"}}>Registrera</h1>
                    {inputs.map((input) => (
                        <FormInput 
                            key={input.id} 
                            {...input} 
                            value={values[input.name as keyof typeof values]} 
                            onChange={onChange}
                        />
                    ))}
                    <Button color="primary" 
                        variant="contained" 
                        style={{padding: "10px", marginTop: "30px"}} 
                        fullWidth onChange={refreshPage}> Skapa användare
                    </Button>
                </form> 
            </Paper>
        </Container>
    )
}

export default RegistrationPage;