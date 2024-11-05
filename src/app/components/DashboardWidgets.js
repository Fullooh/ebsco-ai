import { useState, useEffect } from "react";
import axios from "axios";

const DashboardWidgets = () => {
  // State for storing total leads and recent leads
  const [totalLeads, setTotalLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState(0);

  useEffect(() => {
    // Function to fetch data and update states
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json"); // Update this path
        const leads = response.data;

        // Calculate total leads that are purchased
        const total = leads.filter((lead) => lead.purchased).length;
        setTotalLeads(total);

        // Calculate leads closed in the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const recent = leads.filter((lead) => {
          const closedDate = new Date(lead.dateClosed); // Ensure `dateClosed` matches your JSON field
          return lead.purchased && closedDate >= sixMonthsAgo;
        }).length;

        setRecentLeads(recent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Leads Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Total Leads</h2>
        <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
      </div>

      {/* Leads Closed in Last 6 Months Widget */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          Leads Closed in Last 6 Months
        </h2>
        <p className="text-3xl font-bold text-gray-900">{recentLeads}</p>
      </div>

      {/* Pipeline Value Widget (Static for now) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">Pipeline Value</h2>
        <p className="text-3xl font-bold text-gray-900">$50,000</p>
      </div>
    </div>
  );
};

export default DashboardWidgets;
