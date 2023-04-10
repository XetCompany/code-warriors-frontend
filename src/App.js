import './App.css';
import React from 'react';
import LoadableMobxRouterComponent from './ui/loadableComponents/LoadableMobxRouterComponent';

function App() {
  return (
    <div className="App">
      <div
        onDrop={(event) => {
          event.preventDefault();
        }}
      >
        <LoadableMobxRouterComponent />
      </div>
    </div>
  );
}

export default App;
