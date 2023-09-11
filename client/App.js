import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Loading from "./Loading"; // Import the Loading component

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading state as true

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds (for demonstration)
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Routes />
        </>
      )}
    </div>
  );
};

export default App;
