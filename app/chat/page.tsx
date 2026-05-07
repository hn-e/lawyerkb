import Chat from "@/components/chat";

export default async function Page(props: {
  searchParams?: Promise<{ template?: string }>;
}) {
  const searchParams = await props.searchParams;
  return <Chat templateId={searchParams?.template} />;
}
