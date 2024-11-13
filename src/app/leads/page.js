// src/app/leads/page.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/fetch"); // Update the path as needed
        const data = response.data.map((lead) => ({
          ...lead,
          value: lead.purchased
            ? `$${(Math.random() * 1000000).toFixed(0)}`
            : "$0",
        }));
        setLeads(data);
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
        <h1 className="text-2xl font-semibold">Leads Overview</h1>
      </div>

      {/* Leads Table */}
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Purchased</th>
            <th className="p-4 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{lead.company}</td>
              <td className="p-4">{lead.purchased ? "Yes" : "No"}</td>
              <td className="p-4">{lead.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
