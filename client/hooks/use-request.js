import { useState } from "react";
import axios from 'axios';

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            onSuccess(response.data);
        } catch (err) {
            console.log(err);
            setErrors(<div className='alert alert-danger'>
                <h4>Ooops...</h4>
                <ul className='my-0'>
                    {err.response.data.errors.map(error => <li key={error.message}>{error.message}</li>)}
                </ul>
            </div>);
        }
    };

    return { doRequest, errors };
};

export default useRequest;