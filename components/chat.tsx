"use client";

import { defaultModel, modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { DraftingForm } from "./drafting-form";
import { draftingTemplates } from "@/lib/drafting-templates";
import { toast } from "sonner";

export default function Chat({ templateId }: { templateId?: string }) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  const [factsSubmitted, setFactsSubmitted] = useState(false);

  const template = templateId
    ? draftingTemplates.find((t) => t.id === templateId)
    : undefined;

  const { sendMessage, messages, status, stop } = useChat({
    onError: (error) => {
      toast.error(
        error.message.length > 0
          ? error.message
          : "An error occured, please try again later.",
        { position: "top-center", richColors: true },
      );
    },
  });

  const isLoading = status === "streaming" || status === "submitted";
  const showDraftingForm = template && messages.length === 0 && !factsSubmitted;

  const handleFactsSubmit = (facts: string) => {
    setFactsSubmitted(true);
    sendMessage(
      { text: `Draft a ${template!.label.toLowerCase()}. Here are the case details:\n\n${facts}` },
      { body: { selectedModel, template: template!.id } },
    );
  };

  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      {showDraftingForm ? (
        <DraftingForm
          template={template}
          onSubmit={handleFactsSubmit}
          isLoading={isLoading}
        />
      ) : messages.length === 0 ? (
        <div className="max-w-xl mx-auto w-full">
          <ProjectOverview />
        </div>
      ) : (
        <Messages messages={messages} isLoading={isLoading} status={status} />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input }, { body: { selectedModel, template: template?.id } });
          setInput("");
        }}
        className="pb-8 bg-white dark:bg-black w-full max-w-xl mx-auto px-4 sm:px-0"
      >
        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={(e) => setInput(e.currentTarget.value)}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
