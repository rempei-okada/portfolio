import React from 'react';

export const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-akane">{message}</p>
);

export default ErrorMessage;