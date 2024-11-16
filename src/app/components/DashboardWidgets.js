import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the router

const DashboardWidgets = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data");
        const leads = response.data;

        // Calculate Total Leads
        const total = leads.filter((lead) => lead.purchased).length;
        setTotalLeads(total);

        // Calculate Leads Closed in the Last 6 Months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const recent = leads.filter((lead) => {
          const closedDate = new Date(lead.dateclosed);
          return lead.purchased && closedDate >= sixMonthsAgo;
        }).length;
        setRecentLeads(recent);

        // Calculate Total Value (only for purchased leads)
        const totalValue = leads
          .filter((lead) => lead.purchased) // Only include purchased leads
          .reduce((sum, lead) => sum + (lead.proposedvalue || 0), 0); // Sum proposed values
        setTotalValue(totalValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Click handler to navigate to the leads page
  const handleTotalLeadsClick = () => {
    router.push("/leads"); // Navigate to the /leads page
  };

  // Click handler to navigate to the "Last 6 Months" leads page
  const handleRecentLeadsClick = () => {
    router.push("/leads/last-six-months"); // Navigate to the specific page
  };

  // Click handler to navigate to the "Total Value" page
  const handleTotalValueClick = () => {
    router.push("/leads/total-value"); // Navigate to the specific page
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Leads Widget with click and hover effect */}
      <div
        onClick={handleTotalLeadsClick} // Add click handler here
        className="group bg-white p-6 rounded-lg shadow ring-1 ring-gray-300 hover:bg-sky-500 hover:ring-sky-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white">
            Total Leads
          </h2>
        </div>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-white">
          {totalLeads}
        </p>
      </div>

      {/* Leads Closed in Last 6 Months Widget with click and hover effect */}
      <div
        onClick={handleRecentLeadsClick} // Add click handler here
        className="group bg-white p-6 rounded-lg shadow ring-1 ring-gray-300 hover:bg-sky-500 hover:ring-sky-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white">
            Leads Closed in Last 6 Months
          </h2>
        </div>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-white">
          {recentLeads}
        </p>
      </div>

      {/* Total Value Widget with click and hover effect */}
      <div
        onClick={handleTotalValueClick} // Add click handler here
        className="group bg-white p-6 rounded-lg shadow ring-1 ring-gray-300 hover:bg-sky-500 hover:ring-sky-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white">
            Total Value
          </h2>
        </div>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-white">
          ${totalValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DashboardWidgets;
