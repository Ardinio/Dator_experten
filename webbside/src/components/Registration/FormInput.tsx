import { TextField } from "@mui/material";

const FormInput = (props: any) => {
    const { label, value, onChange, id, ...inputProps} = props
    const inputStyle = {
        padding: "15px",
        margin: "10px 0px"
    } 
   
    return (
        <div style={inputStyle}>
            <TextField 
                label={label}
                {...inputProps}
                onChange={onChange}
            />
        </div>
    )
}

export default FormInput;