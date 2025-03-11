
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logger from "@/utils/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.group("NotFound Page Rendered", () => {
      logger.error("404 Error: User attempted to access non-existent route:", location.pathname);
      logger.debug("Location state:", location.state);
      logger.debug("Document URL:", document.URL);
      logger.debug("Referrer:", document.referrer);
      
      // Log navigation timing data
      if (window.performance) {
        const timing = window.performance.timing;
        logger.debug("Navigation timing:", {
          redirectTime: timing.redirectEnd - timing.redirectStart,
          dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
          tcpTime: timing.connectEnd - timing.connectStart,
          requestTime: timing.responseEnd - timing.requestStart,
          domProcessingTime: timing.domComplete - timing.domLoading,
          pageLoadTime: timing.loadEventEnd - timing.navigationStart
        });
      }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page not found</p>
        <p className="text-gray-600 mb-6">
          The page you are looking for ({location.pathname}) does not exist or has been moved.
        </p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
