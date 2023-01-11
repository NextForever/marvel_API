import img from "./error.gif";

import "./errorMessage.scss";

const ErrorMessage = () => {
    return <img src={img} className='error-message' alt='Error' />;
};

export default ErrorMessage;
