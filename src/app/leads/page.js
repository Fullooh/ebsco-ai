"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data"); // Update the path as needed

        // Sort leads so purchased ones appear first
        const data = response.data
          .map((lead) => ({
            ...lead,
          }))
          .sort((a, b) =>
            a.purchased === b.purchased ? 0 : a.purchased ? -1 : 1,
          );

        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dotted-background min-h-screen">
      <div className="p-8">
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
              <th className="p-4 text-left">Date First Contacted</th>
              <th className="p-4 text-left">Interest Level</th>
              <th className="p-4 text-left">Proposed Value</th>
              <th className="p-4 text-left">Purchased</th>
              <th className="p-4 text-left">Date Closed</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{lead.company}</td>
                <td className="p-4">{lead.datefirstcontacted}</td>
                <td className="p-4">{lead.interestlevel}</td>
                <td className="p-4">{`$${lead.proposedvalue.toLocaleString()}`}</td>
                <td className="p-4">{lead.purchased ? "Yes" : "No"}</td>
                <td className="p-4">{lead.dateclosed || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
