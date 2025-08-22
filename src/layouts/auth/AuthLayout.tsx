import React from "react";
import { ArrowLeft } from "lucide-react";
import AuthLeft from "./AuthLeft";

interface AuthLayoutProps {
  title?: React.ReactNode;
  description?: string;
  logoVariant?: "default" | "auth";
  showBack?: boolean;
  onBack?: () => void; // <-- tambahin props ini
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  description,
  logoVariant = "default",
  showBack = true,
  onBack,
  children,
}) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <AuthLeft
        title={typeof title !== "string" && title ? title : ""}
        description={description}
        logoVariant={logoVariant}
      />
      {/* Right Section */}
      <div
        className="flex-1 h-full flex flex-col items-center 
                   bg-cover bg-bottom 
                   px-6 sm:px-10 md:px-16 py-6 sm:py-10 md:py-16"
        style={{ backgroundImage: "url('/images/auth-right-bg.png')" }}
      >
        <div className="w-full max-w-md flex-1 flex flex-col">
          {/* Back Button */}
          {showBack && (
            <button
              onClick={onBack} // <-- dipanggil disini
              className="mb-6 self-start flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
