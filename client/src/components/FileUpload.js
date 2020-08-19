import React, { Fragment, useState } from 'react'
import axios from 'axios';
import Message from './Message';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose file');
    const [setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
     
        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setMessage('DKP updated');
        } catch (error) {
            if(error.response.status === 500){
                setMessage('Něco se pokazilo :(');
            } else {
                setMessage(error.response.msg);
            }
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit} className="upload-section">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} accept=".xml"/>
                    <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                    </label>
                </div>
                <input type="submit" value="Upload DKP" className="btn btn-primary btn-block mt-4"/>
            </form>
        </Fragment>
    )
}

export default FileUpload;
