import React, { useState } from "react";
import Layout from "../Layout/Layout";

const PriceComparison = () => {
  const [medication, setMedication] = useState("");
  const [prices, setPrices] = useState([]);

  const comparePrices = () => {
    // Logic to fetch price comparisons for the medication
    setPrices([
      { pharmacy: "Pharmacy 1", price: "$20" },
      { pharmacy: "Pharmacy 2", price: "$18" },
      { pharmacy: "Pharmacy 3", price: "$22" },
    ]);
  };

  return (
    <Layout>
        <div>
      <h2>Medication Price Comparison</h2>
      <input
        type="text"
        placeholder="Enter medication name"
        value={medication}
        onChange={(e) => setMedication(e.target.value)}
      />
      <button onClick={comparePrices}>Compare Prices</button>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>
            {price.pharmacy}: {price.price}
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default PriceComparison;
