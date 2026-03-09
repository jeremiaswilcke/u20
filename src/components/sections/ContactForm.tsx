"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Send, CheckCircle } from "lucide-react"

const ANFRAGE_OPTIONEN = [
  { value: "", label: "Bitte auswählen..." },
  { value: "auftreten", label: "Ich möchte bei einem Slam auftreten" },
  { value: "workshop-schule", label: "schreib\u2019 KLASSE! \u2013 Anfrage für eine Schule" },
  { value: "workshop-jugend", label: "schreib\u2019 KLASSE! \u2013 Anfrage für Jugendzentrum / Organisation" },
  { value: "workshop-privat", label: "schreib\u2019 KLASSE! \u2013 Privater Workshop / Gruppe" },
  { value: "kooperation", label: "Kooperation / Partnerschaft" },
  { value: "presse", label: "Presse / Medienanfrage" },
  { value: "ehrenamt", label: "Ich möchte ehrenamtlich mithelfen" },
  { value: "sonstiges", label: "Sonstige Anfrage" },
]

const ALTERSGRUPPEN = [
  { value: "", label: "Bitte auswählen..." },
  { value: "unter-14", label: "Unter 14 Jahre" },
  { value: "14-16", label: "14\u201316 Jahre" },
  { value: "17-20", label: "17\u201320 Jahre" },
  { value: "ueber-20", label: "Über 20 Jahre" },
  { value: "organisation", label: "Ich bin Lehrer*in / Organisation" },
]

const GRUPPENGROESSE = [
  { value: "", label: "Bitte auswählen..." },
  { value: "bis-15", label: "Bis 15 Personen" },
  { value: "15-20", label: "15\u201320 Personen" },
  { value: "20-25", label: "20\u201325 Personen" },
  { value: "25-30", label: "25\u201330 Personen" },
  { value: "ueber-30", label: "Über 30 Personen" },
]

const GRUPPENART = [
  { value: "", label: "Bitte auswählen..." },
  { value: "schulklasse", label: "Schulklasse" },
  { value: "wahlpflichtfach", label: "Wahlpflichtfach / Unverbindliche Übung" },
  { value: "projekttage", label: "Projekttage / Projektwoche" },
  { value: "jugendzentrum", label: "Jugendzentrum / Jugendgruppe" },
  { value: "verein", label: "Verein / Initiative" },
  { value: "privat", label: "Private Gruppe" },
  { value: "sonstiges", label: "Sonstiges" },
]

const WORKSHOP_ALTER = [
  { value: "", label: "Bitte auswählen..." },
  { value: "10-12", label: "10\u201312 Jahre (Unterstufe)" },
  { value: "13-14", label: "13\u201314 Jahre (Unterstufe/Oberstufe)" },
  { value: "15-16", label: "15\u201316 Jahre (Oberstufe)" },
  { value: "17-18", label: "17\u201318 Jahre (Oberstufe)" },
  { value: "19-20", label: "19\u201320 Jahre" },
  { value: "gemischt", label: "Gemischte Altersgruppe" },
]

const inputClass = "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-u20-gray focus:outline-none focus:ring-2 focus:ring-u20-orange focus:border-transparent transition-all"
const selectClass = `${inputClass} appearance-none`
const labelClass = "block text-sm font-medium text-u20-gray-dark mb-2"

function getInitialAnfrage(searchParams: URLSearchParams): string {
  const preset = searchParams.get("anfrage")
  if (preset && ANFRAGE_OPTIONEN.some(o => o.value === preset)) {
    return preset
  }
  return ""
}

export function ContactForm() {
  const searchParams = useSearchParams()
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [anfrageTyp, setAnfrageTyp] = useState(() => getInitialAnfrage(searchParams))

  const isWorkshop = ["workshop-schule", "workshop-jugend", "workshop-privat"].includes(anfrageTyp)
  const showPerformerAlter = ["auftreten", "ehrenamt"].includes(anfrageTyp)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("sending")

    const formData = new FormData(e.currentTarget)

    const parts: string[] = [
      `Name: ${formData.get("name")}`,
      `E-Mail: ${formData.get("email")}`,
      `Anfrage: ${ANFRAGE_OPTIONEN.find(o => o.value === formData.get("anfrageTyp"))?.label || ""}`,
    ]

    if (formData.get("alter"))
      parts.push(`Altersgruppe: ${ALTERSGRUPPEN.find(o => o.value === formData.get("alter"))?.label || ""}`)
    if (formData.get("schule"))
      parts.push(`Schule/Organisation: ${formData.get("schule")}`)
    if (formData.get("gruppenart"))
      parts.push(`Art der Gruppe: ${GRUPPENART.find(o => o.value === formData.get("gruppenart"))?.label || ""}`)
    if (formData.get("workshopAlter"))
      parts.push(`Alter der Gruppe: ${WORKSHOP_ALTER.find(o => o.value === formData.get("workshopAlter"))?.label || ""}`)
    if (formData.get("gruppengroesse"))
      parts.push(`Gruppengröße: ${GRUPPENGROESSE.find(o => o.value === formData.get("gruppengroesse"))?.label || ""}`)

    parts.push("", `Nachricht:`, `${formData.get("nachricht")}`)

    const subject = encodeURIComponent(`[U20 Kontakt] ${ANFRAGE_OPTIONEN.find(o => o.value === formData.get("anfrageTyp"))?.label || "Anfrage"}`)
    const body = encodeURIComponent(parts.join("\n"))

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
          onClick={() => { setFormState("idle"); setAnfrageTyp("") }}
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
          <label htmlFor="anfrageTyp" className={labelClass}>
            Worum geht es? <span className="text-u20-pink">*</span>
          </label>
          <select
            id="anfrageTyp"
            name="anfrageTyp"
            required
            value={anfrageTyp}
            onChange={(e) => setAnfrageTyp(e.target.value)}
            className={selectClass}
          >
            {ANFRAGE_OPTIONEN.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-u20-pink">*</span>
            </label>
            <input
              type="text" id="name" name="name" required
              placeholder="Dein Name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              E-Mail <span className="text-u20-pink">*</span>
            </label>
            <input
              type="email" id="email" name="email" required
              placeholder="deine@email.at"
              className={inputClass}
            />
          </div>
        </div>

        {/* === WORKSHOP FIELDS === */}
        {isWorkshop && (
          <div className="space-y-6 p-6 bg-u20-orange/5 rounded-2xl border border-u20-orange/10">
            <p className="text-sm font-medium text-u20-orange uppercase tracking-wider">Workshop-Details</p>

            {/* Schule / Organisation */}
            <div>
              <label htmlFor="schule" className={labelClass}>
                Schule / Organisation <span className="text-u20-pink">*</span>
              </label>
              <input
                type="text" id="schule" name="schule" required
                placeholder="z.B. BG/BRG Musterstadt"
                className={inputClass}
              />
            </div>

            {/* Art der Gruppe */}
            <div>
              <label htmlFor="gruppenart" className={labelClass}>
                Art der Gruppe <span className="text-u20-pink">*</span>
              </label>
              <select id="gruppenart" name="gruppenart" required className={selectClass}>
                {GRUPPENART.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Alter der Gruppe & Gruppengröße */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="workshopAlter" className={labelClass}>
                  Alter der Teilnehmer*innen <span className="text-u20-pink">*</span>
                </label>
                <select id="workshopAlter" name="workshopAlter" required className={selectClass}>
                  {WORKSHOP_ALTER.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gruppengroesse" className={labelClass}>
                  Gruppengröße <span className="text-u20-pink">*</span>
                </label>
                <select id="gruppengroesse" name="gruppengroesse" required className={selectClass}>
                  {GRUPPENGROESSE.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* === PERFORMER ALTER === */}
        {showPerformerAlter && (
          <div>
            <label htmlFor="alter" className={labelClass}>
              Altersgruppe <span className="text-u20-pink">*</span>
            </label>
            <select id="alter" name="alter" required className={selectClass}>
              {ALTERSGRUPPEN.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Nachricht */}
        <div>
          <label htmlFor="nachricht" className={labelClass}>
            Nachricht <span className="text-u20-pink">*</span>
          </label>
          <textarea
            id="nachricht" name="nachricht" required rows={5}
            placeholder={isWorkshop ? "Wunschtermin, besondere Wünsche, Fragen..." : "Erzähl uns mehr..."}
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
