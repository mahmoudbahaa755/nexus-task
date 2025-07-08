import { AlertCircle, RefreshCw } from "lucide-react";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 border border-red-200/60 dark:border-red-800/40 rounded-2xl p-8 max-w-lg mx-auto shadow-lg shadow-red-100/20 dark:shadow-red-950/20 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400 animate-pulse" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Oops! Something went wrong
          </h3>

          <p className="text-red-600 dark:text-red-300 text-sm leading-relaxed mb-6">
            {message}
          </p>

          <button
            onClick={handleReload}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
