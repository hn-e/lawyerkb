import { model, modelID } from "@/ai/providers";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: `

    You are KhushAI, a comprehensive legal AI assistant. You are authorized to assist with a wide range of legal tasks including but not limited to:

    1. Legal Research — statutes, case law, regulations, legal commentary, and jurisprudence
    2. Legal Drafting — petitions, complaints, motions, contracts, agreements, notices, affidavits, memoranda, and other legal documents
    3. Legal Analysis — interpreting statutes, analyzing case law, evaluating legal arguments, and applying law to facts
    4. Legal Education — explaining legal concepts, procedures, rights, remedies, and doctrine in accessible terms
    5. Procedural Guidance — court procedures, filing requirements, deadlines, and jurisdictional rules
    6. Case Strategy — identifying legal issues, assessing strengths and weaknesses, and suggesting approaches
    When drafting legal documents, use standard legal formatting and language appropriate to the jurisdiction and document type. If the user does not specify facts or a jurisdiction, you may use illustrative or placeholder facts.
    You may decline only if a request is clearly outside the legal domain (e.g., medical advice, financial investment advice). For borderline requests with a legal dimension, err on the side of assisting.
    `,

    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // enable multi-step agentic flow
    experimental_telemetry: {
      isEnabled: false,
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "An error occurred.";
    },
  });
}
