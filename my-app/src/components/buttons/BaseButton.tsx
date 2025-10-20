import React from "react";
import LoadingScreen from "../loadings/LoadingScreen.tsx";

interface Props {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    iconLeft?: string;
    iconRight?: string;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const BaseButton: React.FC<Props> = ({
                                         children,
                                         onClick,
                                         type = "button",
                                         variant = "primary",
                                         size = "md",
                                         iconLeft,
                                         iconRight,
                                         disabled = false,
                                         isLoading = false,
                                         className = "",
                                         href,
                                         target = "_self",
                                     }) => {
    const variantStyles = {
        primary: `
            bg-purple-500 hover:bg-purple-600 text-white
            focus:ring-2 cursor-pointer transition-colors
        `,
        secondary: `
            bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white
            focus:ring-2 cursor-pointer transition-colors
        `,
        outline: `
            border border-gray-400 text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-400 dark:text-white
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            cursor-pointer transition-colors
        `,
        ghost: `
            bg-gray-100 dark:bg-gray-900 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            cursor-pointer transition-colors
        `,
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const baseClasses = `
        inline-flex items-center justify-center gap-2 rounded-md font-medium
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

    if (href) {
        return (
            <a
                href={href}
                target={target}
                onClick={(e) => {
                    if (isLoading || disabled) e.preventDefault();
                    else onClick?.(e);
                }}
                className={baseClasses}
            >
                {iconLeft && <img src={iconLeft} alt="" className="w-5 h-5" />}
                {children}
                {iconRight && <img src={iconRight} alt="" className="w-5 h-5" />}
                {isLoading && <LoadingScreen />}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={(e) => {
                e.preventDefault();
                if (!isLoading && !disabled) onClick?.(e);
            }}
            disabled={disabled || isLoading}
            className={baseClasses}
        >
            {iconLeft && <img src={iconLeft} alt="" className="w-5 h-5" />}
            {children}
            {iconRight && <img src={iconRight} alt="" className="w-5 h-5" />}
            {isLoading && <LoadingScreen />}
        </button>
    );
};

export default BaseButton;