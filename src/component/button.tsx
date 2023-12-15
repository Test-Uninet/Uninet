import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  label?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler;
  type?: 'reset' | 'submit' | 'button';
  children: ReactNode
}

const Button: FC<ButtonProps> = ({ label, className, icon, onClick, type, children }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02}}
        transition={{ type: "spring", stiffness: 300 , originX:0}}
        onClick={onClick}
        type={type}
        className={`${
          className ? `${className}` : "text-white"
        } hover:border-inherit focus:outline-inherit p-2 `}
      >
        {children}
        <span>{icon}</span> {label}
      </motion.button>
    </div>
  );
};

export default Button;
