import React from 'react';

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ type = "button", className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 border rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
