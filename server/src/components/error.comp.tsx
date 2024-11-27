const ErrorScreen = ({
    message,
    onRetry,
  }: {
    message: string;
    onRetry: () => void;
  }) => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  };
  
  export default ErrorScreen;
  