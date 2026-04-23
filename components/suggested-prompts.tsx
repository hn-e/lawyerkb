"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { memo } from "react";

interface SuggestedPromptsProps {
  sendMessage: (input: string) => void;
}

function PureSuggestedPrompts({ sendMessage }: SuggestedPromptsProps) {
  const suggestedActions = [
    {
      title: "Draft a divorce petition",
      label: "on illustrative facts",
      action: "Draft a divorce petition on illustrative facts under Hindu Marriage Act",
    },
    {
      title: "Explain Section 498A",
      label: "of the Indian Penal Code",
      action: "Explain Section 498A of the Indian Penal Code and its implications",
    },
    {
      title: "Summarize the Kesavananda",
      label: "Bharati case ratio",
      action: "Summarize the ratio decidendi of Kesavananda Bharati v. State of Kerala",
    },
    {
      title: "What are the grounds",
      label: "for filing a consumer complaint?",
      action: "What are the grounds and procedure for filing a consumer complaint in India?",
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              sendMessage(suggestedAction.action);
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedPrompts = memo(PureSuggestedPrompts, () => true);