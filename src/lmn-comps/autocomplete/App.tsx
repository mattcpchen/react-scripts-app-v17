import React from "react";
import "./App.css";
import { CryptoSearch } from "./components/CryptoSearch";

function App() {
  const [selectedCrypto, setSelectedCrypto] = React.useState<any>(null);

  return (
    <div className="App">
      <h1>Crypto Autocomplete</h1>
      <div className="crypto-search">
        <CryptoSearch onSelect={setSelectedCrypto} />
      </div>
      {selectedCrypto && (
        <div className="selected-crypto">
          <p>{selectedCrypto.name} Selected</p>
        </div>
      )}
    </div>
  );
}

export default App;
