"use client";

import { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function Recommendations({ userPrompt }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState("");

  const staticInstructions = `
    You are an AI Lead Management Specialist. Analyze the leads based on the provided data and categorize them into one of the following groups:

    ### Categories:
    1. **Not Interested in New Tools/Providers**
       - Leads that have explicitly declined interest in new tools or services.
       - Provide:
         - Reasons for categorization.
         - Examples from their messages.
         - Suggested next steps.
         - A follow-up email template (if applicable).

    2. **Evaluating Multiple Vendors**
       - Leads currently exploring multiple solutions/vendors but have not committed.
       - Provide:
         - Reasons for categorization.
         - Proof from their messages.
         - Suggested next steps.
         - A follow-up email template.

    3. **Ready for Future Consideration**
       - Leads not ready to proceed now but open to future discussions.
       - Provide:
         - Reasons for categorization.
         - Examples from their messages.
         - Suggested next steps.
         - A friendly follow-up email template.

    ### Rules:
    - Each lead must belong to only one category based on the most relevant data.
    - Avoid duplication across categories.
    - If the lead does not fit any category, provide: "No relevant category found."

    Leads Data:
`;

  // Fetch static recommendations on component mount
  useEffect(() => {
    const fetchStaticRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data");
        const leads = await response.json();
        const prompt = staticInstructions + JSON.stringify(leads);

        const aiResponse = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!aiResponse.ok)
          throw new Error("Failed to fetch static recommendations");

        const result = await aiResponse.json();
        setRecommendations(result.text);
      } catch (err) {
        setError("Error fetching recommendations: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticRecommendations();
  }, []);

  // Fetch recommendations dynamically whenever `userPrompt` changes
  useEffect(() => {
    if (!userPrompt) return; // Skip if no user prompt provided

    const fetchDynamicRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const aiResponse = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userPrompt }),
        });

        if (!aiResponse.ok)
          throw new Error("Failed to fetch dynamic recommendations");

        const result = await aiResponse.json();
        setRecommendations(result.text);
      } catch (err) {
        setError("Error processing user input: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicRecommendations();
  }, [userPrompt]);

  return (
    <div className="bg-white p-6 rounded-lg shadow ring-1 ring-gray-300">
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {recommendations && <MarkdownRenderer content={recommendations} />}
      {!loading && !recommendations && !error && (
        <p>No recommendations yet. Submit a query to get started.</p>
      )}
    </div>
  );
}
