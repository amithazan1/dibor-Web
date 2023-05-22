import { useState } from "react";


function Filed(props) {
    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true);
    };
    const {id, errorMessage, onChange, ...inputprops } = props;

    return (
        <div className="form-floating">
            <input
                {...inputprops}
                id ={id}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => props.name === "Picture" && setFocused(true)}
                focused={focused.toString()}>
            </input>
            <label htmlFor={id}> {props.placeholder} </label>
            <span className="alert">{errorMessage}</span>
        </div>
    );
}


export default Filed;