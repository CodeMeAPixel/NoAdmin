import type { Metadata } from "next";
import { Calculator } from "@/components/tools/Calculator";
import { Container, PageHeader } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/metadata";
import { PERMISSIONS } from "@/lib/permissions";

export const metadata: Metadata = pageMetadata({
  title: "Permission calculator",
  description:
    "Pick exactly the Discord permissions your bot needs and get the permission integer, an invite link and code for discord.js, discord.py, Serenity, JDA and DiscordGo.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <Container width="xl" className="pb-20">
      <PageHeader
        eyebrow="Tool"
        title="Permission calculator"
        description={`Choose only what your bot uses from all ${PERMISSIONS.length} Discord permissions. The link in your address bar always reflects your selection, so you can share it.`}
      />
      <Calculator />
    </Container>
  );
}
