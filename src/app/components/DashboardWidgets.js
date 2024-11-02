// src/components/DashboardWidgets.js
const DashboardWidgets = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Total Leads</h2>
      <p className="text-3xl font-bold">120</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Upcoming Interactions</h2>
      <p className="text-3xl font-bold">5</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Pipeline Value</h2>
      <p className="text-3xl font-bold">$50,000</p>
    </div>
  </div>
);

export default DashboardWidgets;
