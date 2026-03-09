import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <section className="py-32 bg-white">
      <Container className="text-center max-w-lg">
        <p className="text-u20-orange font-bold text-7xl font-heading mb-4">404</p>
        <h1 className="text-3xl font-bold font-heading text-u20-gray-dark mb-4">Seite nicht gefunden</h1>
        <p className="text-u20-gray mb-8">
          Die Seite, die du suchst, existiert leider nicht oder wurde verschoben.
        </p>
        <Button asChild>
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </Container>
    </section>
  )
}
