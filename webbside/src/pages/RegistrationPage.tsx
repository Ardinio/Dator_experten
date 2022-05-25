import React, { useState } from "react";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Variables } from "../Variables";
import FormInput from "../components/Registration/FormInput";

// interface Profile {
//     [key: string]: string;
//     firstname: string;
//     lastname: string;
//     age: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     profileImage: string;
// }

const RegistrationPage = () => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: ""
    });

    const inputs = [
        {
            id:1,
            name: "firstname",
            type: "text",
            placeholder: "Förnamn",
            label: "Förnamn"
        },
        {
            id:2,
            name: "lastname",
            type: "text",
            placeholder: "Efternamn",
            label: "Efternamn"
        },
        {
            id:3,
            name: "age",
            type: "text",
            placeholder: "Födelsedag",
            label: "Födelsedag"
        },
        {
            id:4,
            name: "email",
            type: "text",
            placeholder: "Email",
            label: "Email"
        },
        {
            id:5,
            name: "password",
            type: "password",
            placeholder: "Lösenord",
            label: "Lösenord"
        },
        {
            id:6,
            name: "confrimPassword",
            type: "password",
            placeholder: "Bekräfta Lösenord",
            label: "Bekräfta Lösenord"
        },
        {
            id:7,
            name: "profileImage",
            type: "text",
            placeholder: "Profilbild",
            label: "Profilbild"
        },
    ];

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
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput 
                        key={input.id} 
                        {...input} 
                        value={values[input.name as keyof typeof values]} 
                        onChange={onChange}
                    />
                ))}
                <Button>Skapa användare</Button>
            </form> 
        </Container>
    )
}

export default RegistrationPage;