import React from "react";

interface AuthLeftProps {
  title: React.ReactNode;
  description?: string;
  logoVariant?: "default" | "auth";
}

const AuthLeft: React.FC<AuthLeftProps> = ({
  title,
  description,
  logoVariant = "default",
}) => {
  return (
    <div
      className="h-56 sm:h-64 md:h-auto lg:w-[27%] w-full 
                 bg-cover bg-bottom flex flex-col 
                 items-center justify-center 
                 lg:items-start lg:justify-start 
                 px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
      style={{ backgroundImage: "url('/images/auth-left-bg.png')" }}
    >
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <img
          src={
            logoVariant === "auth"
              ? "/images/logo-auth.png"
              : "/images/logo.png"
          }
          alt="Logo"
          className="w-32 sm:w-40 h-auto mb-6"
        />
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
          {title}
        </h1>
        {description && (
          <p className="hidden lg:block mt-4 sm:mt-6 text-sm text-white max-w-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLeft;
