import React from "react";
import Routes from "./Routes";
// Import the provider - double-check the path below matches your project structure
import { WorkflowProvider } from "./context/WorkflowContext"; 

function App() {
  return (
    <WorkflowProvider>
      <Routes />
    </WorkflowProvider>
  );
}

export default App;
