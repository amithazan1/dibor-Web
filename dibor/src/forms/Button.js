

function Button(props) {
    return (
        <div>
            <button className="w-100 submit-btn" type="submit" onClick={props.onClick}>{props.name}</button>
        </div>
    );
}


export default Button;