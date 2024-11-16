"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TotalValuePage = () => {
  const [leads, setLeads] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data");
        // Filter only purchased leads
        const purchasedLeads = response.data.filter((lead) => lead.purchased);
        setLeads(purchasedLeads);

        // Calculate the total value
        const total = purchasedLeads.reduce(
          (sum, lead) => sum + (lead.proposedvalue || 0),
          0,
        );
        setTotalValue(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold">
          Purchased Companies Breakdown
        </h1>
      </div>

      {/* Leads Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Proposed Value</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{lead.company}</td>
              <td className="p-4">
                $
                {lead.proposedvalue ? lead.proposedvalue.toLocaleString() : "0"}
              </td>
            </tr>
          ))}
          {/* Total Value Row */}
          <tr className="bg-gray-100 font-semibold">
            <td className="p-4">Total Value</td>
            <td className="p-4">${totalValue.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalValuePage;
