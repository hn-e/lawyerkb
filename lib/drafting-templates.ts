import {
  FileText,
  File,
  Shield,
  ScrollText,
  PenSquare,
  FileStack,
  type LucideIcon,
} from "lucide-react";

export interface DraftingTemplate {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  prompt: string;
}

export const draftingTemplates: DraftingTemplate[] = [
  {
    id: "legal-notice",
    label: "Legal Notice",
    description: "Draft a legal notice demanding action or redressal before litigation",
    icon: FileText,
    prompt:
      "You are drafting a legal notice. Follow the standard format: (1) Parties and addresses, (2) Recitals / Background facts, (3) Cause of action, (4) Demand / Relief sought, (5) Notice period and consequences of non-compliance. Use formal legal language and cite relevant statutory provisions.",
  },
  {
    id: "civil-plaint",
    label: "Civil Plaint",
    description: "Draft a plaint for filing in civil court",
    icon: File,
    prompt:
      "You are drafting a civil plaint under the Code of Civil Procedure, 1908. Include: (1) Name, description and place of residence of plaintiff and defendant, (2) Facts constituting the cause of action and when it arose, (3) Facts showing the court has jurisdiction, (4) Relief claimed, (5) Limitation details, (6) Valuation for court fees. Use proper numbering of paragraphs.",
  },
  {
    id: "bail-application",
    label: "Bail Application",
    description: "Draft an application for regular or anticipatory bail",
    icon: Shield,
    prompt:
      "You are drafting a bail application under the Bharatiya Nagarik Suraksha Sanhita, 2023. Include: (1) Court details and case number, (2) Name and details of the accused, (3) Offence alleged with sections, (4) Grounds for bail — triable by Magistrate, no criminal antecedents, investigation complete, etc., (5) Undertaking to comply with conditions, (6) List of surety details. Cite relevant case law where appropriate.",
  },
  {
    id: "writ-petition",
    label: "Writ Petition",
    description: "Draft a writ petition under Article 226 or Article 32",
    icon: ScrollText,
    prompt:
      "You are drafting a writ petition under Article 226 of the Constitution of India. Include: (1) Name and details of the petitioner, (2) Name and details of the respondent(s), (3) Jurisdiction of the court, (4) Grounds for the writ — violation of fundamental rights or legal rights, (5) Material facts in chronological order, (6) Relief sought, (7) Interim relief if any. Use proper writ petition format with sworn affidavits.",
  },
  {
    id: "affidavit",
    label: "Affidavit",
    description: "Draft an affidavit for court proceedings or sworn statements",
    icon: PenSquare,
    prompt:
      "You are drafting an affidavit. Follow the format: (1) Title of the case and court, (2) Name, age, father's name, occupation and address of the deponent, (3) Sworn statements numbered in paragraphs, (4) Verification clause stating what is true to knowledge and what is believed to be true, (5) Solemn affirmation / oath before the oath commissioner. Use first-person narrative.",
  },
  {
    id: "written-statement",
    label: "Written Statement",
    description: "Draft a written statement in response to a civil plaint",
    icon: FileStack,
    prompt:
      "You are drafting a written statement under Order VIII of the Code of Civil Procedure, 1908. Respond to each allegation in the plaint seriatim (paragraph-wise): admit, deny, or state not admitted. Include: (1) Preliminary objections (jurisdiction, limitation, maintainability, etc.), (2) Denials and traverses, (3) Affirmative defenses, (4) Counterclaim if any. End with a prayer for dismissal.",
  },
];
