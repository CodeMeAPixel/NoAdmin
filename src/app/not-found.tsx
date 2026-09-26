import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container
      width="md"
      className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        Page not found
      </h1>
      <p className="mt-3 text-zinc-400">
        That page doesn&apos;t exist. Maybe one of these helps.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/calculator" variant="secondary">
          Calculator
        </ButtonLink>
        <ButtonLink href="/permissions" variant="secondary">
          Permission reference
        </ButtonLink>
      </div>
    </Container>
  );
}
