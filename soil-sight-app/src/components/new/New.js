import { useState } from 'react';

const New = (props) => {
    const [selectedFile, setSelectedFile] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const submit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        var formName = name;
        var formAddress = address;
        formData.append("path", selectedFile, `name: ${formName}, address: ${formAddress}`);
        const API = 'api';
        fetch(`${API}/garden-post`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 200) {
                console.log("SUCCESS")
            }
        });
    }

    const onNameChange = (event) => {
        setName(event.target.value.replace("'","''"));
    };

    const onAddressChange = (event) => {
        setAddress(event.target.value.replace("'","''"));
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div style = {{ margin: '10px'}}>
            <form method="POST" onSubmit={submit}>
                <input type="text" placeholder="Garden Name" name="name" id="name" onChange={onNameChange}/>
                <br/>
                <input type="text" placeholder="Garden Address" name="address" id="address" onChange={onAddressChange}/>
                <br/>
                <input type="file" name="path" id="path" onChange={onFileChange}/>
                <br/>
                <input type="submit" />
            </form>
        </div>
    );
}

export default New;