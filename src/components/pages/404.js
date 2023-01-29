import React from 'react';
import { Helmet } from 'react-helmet';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta name='description' content='404 page found' />
                <title>404 page found</title>
            </Helmet>
            <div>
                <div>
                    <ErrorMessage />
                    <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                        Page doesn't exist
                    </p>
                    <Link
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            marginTop: '30px',
                        }}
                        to='/'
                    >
                        Back to main page
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page404;
