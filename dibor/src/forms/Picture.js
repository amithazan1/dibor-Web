

function Picture({ value, set }) {
    const change = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            set(reader.result)
        };
    };

    return (
        <div className="row g-2">
            <div className="form-floating col-10">
                <input type="file"
                    className="form-control"
                    id="floatingFile"
                    placeholder="Picture"
                    onChange={change}
                    required={true}>
                </input>
                <label htmlFor="floatingFile">Picture</label>
                {value && (
                    <div >
                        <img className="img-thumbnail rounded profileImage" src={value}
                            alt="Your Image"></img>
                    </div>)
                }
            </div>
        </div>
    );
}


export default Picture;