

function Picture({ value, set }) {
    const change = (e) => {
        const file = e.target.files[0];
        set(URL.createObjectURL(file));
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