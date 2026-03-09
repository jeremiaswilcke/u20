"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

const ANFRAGE_OPTIONEN = [
  { value: "", label: "Bitte auswählen..." },
  { value: "auftreten", label: "Ich möchte bei einem Slam auftreten" },
  { value: "workshop-schule", label: "Workshop-Anfrage für eine Schule" },
  { value: "workshop-jugend", label: "Workshop-Anfrage für Jugendzentrum / Organisation" },
  { value: "kooperation", label: "Kooperation / Partnerschaft" },
  { value: "presse", label: "Presse / Medienanfrage" },
  { value: "ehrenamt", label: "Ich möchte ehrenamtlich mithelfen" },
  { value: "sonstiges", label: "Sonstige Anfrage" },
]

const ALTERSGRUPPEN = [
  { value: "", label: "Optional..." },
  { value: "unter-14", label: "Unter 14 Jahre" },
  { value: "14-16", label: "14\u201316 Jahre" },
  { value: "17-20", label: "17\u201320 Jahre" },
  { value: "ueber-20", label: "Über 20 Jahre" },
  { value: "organisation", label: "Ich bin Lehrer*in / Organisation" },
]

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [anfrageTyp, setAnfrageTyp] = useState("")

  const showAlter = ["auftreten", "ehrenamt"].includes(anfrageTyp)
  const showSchule = ["workshop-schule", "workshop-jugend"].includes(anfrageTyp)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    // Build mailto link as fallback (no backend needed)
    const subject = encodeURIComponent(`[U20 Kontakt] ${ANFRAGE_OPTIONEN.find(o => o.value === formData.get("anfrageTyp"))?.label || "Anfrage"}`)
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\n` +
      `E-Mail: ${formData.get("email")}\n` +
      `Anfrage: ${ANFRAGE_OPTIONEN.find(o => o.value === formData.get("anfrageTyp"))?.label || ""}\n` +
      (formData.get("alter") ? `Altersgruppe: ${ALTERSGRUPPEN.find(o => o.value === formData.get("alter"))?.label || ""}\n` : "") +
      (formData.get("schule") ? `Schule/Organisation: ${formData.get("schule")}\n` : "") +
      `\nNachricht:\n${formData.get("nachricht")}`
    )

    window.location.href = `mailto:hallo@u20poetryslam.at?subject=${subject}&body=${body}`
    setFormState("sent")
  }

  if (formState === "sent") {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center">
        <CheckCircle className="w-16 h-16 text-u20-orange mx-auto mb-6" />
        <h3 className="text-2xl font-bold font-heading text-u20-gray-dark mb-3">
          Dein E-Mail-Programm öffnet sich!
        </h3>
        <p className="text-u20-gray leading-relaxed">
          Falls sich kein Fenster geöffnet hat, schreib uns direkt an{" "}
          <a href="mailto:hallo@u20poetryslam.at" className="text-u20-orange hover:underline font-medium">
            hallo@u20poetryslam.at
          </a>
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-6 text-sm text-u20-gray-light hover:text-u20-orange transition-colors"
        >
          Neues Formular ausfüllen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
      <h3 className="text-2xl font-bold font-heading text-u20-gray-dark mb-2">Schreib uns</h3>
      <p className="text-u20-gray-light mb-8">Füll das Formular aus und wir melden uns bei dir.</p>

      <div className="space-y-6">
        {/* Anfrage-Typ */}
        <div>
          <label htmlFor="anfrageTyp" className="block text-sm font-medium text-u20-gray-dark mb-2">
            Worum geht es? <span className="text-u20-pink">*</span>
          </label>
          <select
            id="anfrageTyp"
            name="anfrageTyp"
            required
            value={anfrageTyp}
            onChange={(e) => setAnfrageTyp(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all appearance-none"
          >
            {ANFRAGE_OPTIONEN.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-u20-gray-dark mb-2">
              Name <span className="text-u20-pink">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Dein Name"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-u20-gray-dark mb-2">
              E-Mail <span className="text-u20-pink">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="deine@email.at"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Conditional: Alter */}
        {showAlter && (
          <div>
            <label htmlFor="alter" className="block text-sm font-medium text-u20-gray-dark mb-2">
              Altersgruppe
            </label>
            <select
              id="alter"
              name="alter"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all appearance-none"
            >
              {ALTERSGRUPPEN.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Conditional: Schule */}
        {showSchule && (
          <div>
            <label htmlFor="schule" className="block text-sm font-medium text-u20-gray-dark mb-2">
              Schule / Organisation <span className="text-u20-pink">*</span>
            </label>
            <input
              type="text"
              id="schule"
              name="schule"
              required
              placeholder="z.B. BG/BRG Musterstadt"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Nachricht */}
        <div>
          <label htmlFor="nachricht" className="block text-sm font-medium text-u20-gray-dark mb-2">
            Nachricht <span className="text-u20-pink">*</span>
          </label>
          <textarea
            id="nachricht"
            name="nachricht"
            required
            rows={5}
            placeholder="Erzähl uns mehr..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === "sending"}
          className="w-full h-12 rounded-full bg-u20-orange text-white font-medium hover:bg-u20-orange-dark transition-all shadow-lg shadow-u20-orange/25 hover:shadow-xl hover:shadow-u20-orange/30 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {formState === "sending" ? "Wird gesendet..." : "Nachricht senden"}
        </button>
      </div>
    </form>
  )
}
