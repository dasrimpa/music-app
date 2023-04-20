import React, { ReactNode } from 'react';
import { ImSpinner7 } from 'react-icons/im';

export default function Button({
    type,
    children,
    onClick,
    className,
    loading,
    disabled
  }: {
    children?: ReactNode;
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
    loading?: boolean
    disabled?: boolean
  }) {
  return (
    <button
      type={type ? type : 'submit'}
      onClick={onClick ? () => onClick() : () => {}}
      className={`relative flex justify-center py-2 px-10 border
      border-transparent text-sm font-medium rounded-md text-white bg-blue-600
       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
       focus:ring-blue-500 ${className} ${disabled ? 'cursor-not-allowed' : ''}`}>
      {children}
      {loading ? <ImSpinner7 className="animate-spin ml-2 text-lg" /> : ''}
    </button>
  )
}
