"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation

export default function LastSixMonthsLeads() {
  const [leads, setLeads] = useState([]);
  const [totalValue, setTotalValue] = useState(0); // State to store the total value
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data"); // Update the path as needed
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const filteredLeads = response.data.filter((lead) => {
          const closedDate = new Date(lead.dateclosed);
          return lead.purchased && closedDate >= sixMonthsAgo;
        });

        // Calculate total value of the filtered leads
        const total = filteredLeads.reduce(
          (sum, lead) => sum + (lead.proposedvalue || 0),
          0,
        );
        setTotalValue(total);

        setLeads(filteredLeads);
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")} // Navigate back to the home page
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold">
          Leads Closed in Last 6 Months
        </h1>
      </div>

      {/* Leads Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Date Closed</th>
            <th className="p-4 text-left">Proposed Value</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{lead.company}</td>
              <td className="p-4">{lead.dateclosed}</td>
              <td className="p-4">${lead.proposedvalue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        {/* Total Value Row */}
        <tfoot>
          <tr className="bg-gray-200 font-semibold">
            <td className="p-4 text-left">Total</td>
            <td className="p-4"></td>
            <td className="p-4">${totalValue.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
