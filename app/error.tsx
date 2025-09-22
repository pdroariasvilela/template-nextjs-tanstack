"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-16 h-16 text-red-500 mx-auto"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error }: GlobalErrorProps) {
  const { reset: resetTanStackQueries } = useQueryErrorResetBoundary();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <div className="text-center max-w-lg p-8 bg-white rounded-xl shadow-md">
        <ErrorIcon />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Oops, algo salió mal
        </h1>
        <p className="mt-4 text-md text-gray-600">
          Parece que tuvimos un problema al cargar los datos que necesitas.
          Puedes intentar de nuevo.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 text-left bg-gray-100 p-3 rounded-md text-sm text-gray-700">
            <p className="font-semibold">Mensaje de error:</p>
            <pre className="whitespace-pre-wrap break-words">
              {error?.message || "No message available"}
            </pre>
          </div>
        )}

        <button
          onClick={() => resetTanStackQueries()}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
