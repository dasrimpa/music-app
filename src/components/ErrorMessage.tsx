import React, { ReactNode } from 'react';

export default function ErrorMessage({ children, className }: { children?: ReactNode; className?: string }) {
    return <>{children ? <div className={`text-red-600 text-base ${className}`}>{children} </div> : <></>}</>;
}
