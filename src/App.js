import "./App.css";
import Body from "./Body";
import React, { useRef} from "react";

function App() {
  const backendAddressRef = useRef();
  return (
    <div className="main">
      <header>
        <span>냥 중 일 기</span>
      </header>
      <div>back-end address</div>
        <input defaultValue="http://118.67.129.17:6019/image" ref={backendAddressRef}/>
      <Body backend_address={backendAddressRef}/>
    </div>
  );
}

export default App;
