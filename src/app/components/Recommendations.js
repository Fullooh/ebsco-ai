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
           - Precise reasons for disinterest (explicit declination, negative language, historical investment context, resistance to change).
           - Verbatim examples from their messages demonstrating rejection.
           - Psychological and organizational barriers to adoption.
           - Long-term potential reassessment strategy.
           - Suggested next steps:
              - Minimal immediate intervention.
              - Establish low-touch, annual review touchpoints.
              - Provide subtle awareness through industry insights.
              - Respectful and non-intrusive communication approach.
           - A follow-up email template structured as follows:
              - Acknowledge their current stance.
              - Provide value-added industry information.
              - Extend an open invitation for future discussions.
              - Avoid hard sell or pressure tactics.

      2. **Evaluating Multiple Vendors**
         - Leads currently exploring multiple solutions/vendors but have not committed.
         - Provide:
           - Reasons for categorization (active comparison, competitive proposals, requirements gathering, due diligence).
           - Proof from their messages.
           - Intelligence on:
              - Specific vendors being considered.
              - Decision-making timeline.
              - Key evaluation criteria.
              - Budget constraints and flexibility.
              - Internal stakeholder dynamics.
           - Suggested next steps:
              - Provide a differentiated value proposition.
              - Offer comprehensive comparison resources.
              - Develop tailored demonstration materials.
              - Create a low-friction evaluation experience.
           - A follow-up email template structured as follows:
              - Include personalized insights relevant to their evaluation.
              - Offer neutral, consultative support.
              - Make scheduling discussions simple.
              - Reference case studies or relevant materials.

      3. **Ready for Future Consideration**
         - Leads not ready to proceed now but open to future discussions.
         - Provide:
           - Reasons for categorization (acknowledging non-readiness, identifying trigger points, organizational constraints, potential future alignment).
           - Examples from their messages.
           - Preparatory intelligence on:
              - Projected technology refresh cycles.
              - Anticipated budget allocation periods.
              - Emerging organizational challenges.
              - Strategic transformation plans.
           - Suggested next steps:
              - Create a low-intensity engagement model.
              - Develop thought leadership content.
              - Build relationships without direct selling.
              - Establish credibility and trust.
           - A friendly follow-up email template structured as follows:
              - Informative, non-transactional approach.
              - Provide periodic insights tailored to their industry.
              - Demonstrate continuous value.
              - Ensure flexible, pressure-free interaction.

      ### Rules:
      - Avoid redundancy in displaying categorized leads.
      - Use lead names, company names, or districts as section headers to start a new section.
      - Format all content for easy readability in markdown.
      - Use new lines between every paragraph to improve readability.
      - **Bold and underline critical identifiers** (e.g., names, dates, locations, etc.).
      - Use bullet points or numbered lists where applicable to organize information.
      - Wrap technical terms in backticks (\`example\`).
      - End with a summary section using a horizontal rule (---).

      ### Documentation Standards:
      - Anonymize sensitive information.
      - Provide clear, actionable insights.
      - Support claims with concrete evidence.

      ### Ethical Considerations:
      - Respect leads' communication preferences.
      - Maintain a professional, non-intrusive approach.
      - Prioritize long-term relationship building.
      - Be transparent about data usage and communication intentions.
      ---
  `;

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

  return (
    <div className="bg-white p-6 rounded-lg shadow ring-1 ring-gray-300">
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {recommendations && (
        <div className="border-t border-black-300 mt-4 pt-4 space-y-6">
          <h2 className="text-lg font-bold text-gray-700">
            AI Recommendations
          </h2>
          <div className="border border-black-300 p-4 rounded-lg bg-gray-50">
            <MarkdownRenderer content={recommendations} />
          </div>
        </div>
      )}
      {!loading && !recommendations && !error && (
        <p>No recommendations yet. Submit a query to get started.</p>
      )}
    </div>
  );
}
