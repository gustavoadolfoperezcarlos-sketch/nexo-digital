"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Service = {
  id: string;
  number: string;
  name: string;
  short: string;
  promise: string;
  description: string;
  outcomes: string[];
  examples: string[];
  accent: string;
  glyph: string;
};

const services: Service[] = [
  {
    id: "apps",
    number: "01",
    name: "Apps",
    short: "Productos móviles que la gente entiende y quiere usar.",
    promise: "De una idea suelta a una experiencia móvil clara.",
    description:
      "Diseñamos la lógica, los recorridos y la interfaz de tu aplicación alrededor de una necesidad real. La tecnología llega después de entender a las personas.",
    outcomes: ["Prototipo navegable", "Aplicación web o móvil", "Panel de administración"],
    examples: ["Reservas y citas", "Operaciones internas", "Servicios por suscripción"],
    accent: "lime",
    glyph: "▯",
  },
  {
    id: "web",
    number: "02",
    name: "Web",
    short: "Sitios con una narrativa que convierte visitas en conversaciones.",
    promise: "Tu valor, entendido en los primeros segundos.",
    description:
      "Creamos sitios rápidos y expresivos que explican qué haces, por qué importa y cuál es el siguiente paso. Cada sección tiene un propósito comercial.",
    outcomes: ["Estrategia de contenido", "Diseño responsive", "Sitio optimizado"],
    examples: ["Portafolios comerciales", "Landing pages", "Plataformas de contenido"],
    accent: "blue",
    glyph: "◎",
  },
  {
    id: "ia",
    number: "03",
    name: "Inteligencia Artificial",
    short: "IA aplicada a decisiones, contenido y atención útil.",
    promise: "Menos demostración; más utilidad para tu operación.",
    description:
      "Detectamos dónde la inteligencia artificial aporta una ventaja concreta y diseñamos una solución segura, medible y comprensible para tu equipo.",
    outcomes: ["Asistentes especializados", "Búsqueda inteligente", "Flujos con modelos de IA"],
    examples: ["Atención inicial", "Análisis de documentos", "Generación asistida"],
    accent: "ink",
    glyph: "✦",
  },
  {
    id: "automatizacion",
    number: "04",
    name: "Automatización",
    short: "Procesos conectados que recuperan tiempo para tu equipo.",
    promise: "Lo repetitivo ocurre solo; lo importante conserva criterio humano.",
    description:
      "Mapeamos tareas, decisiones y sistemas para eliminar capturas dobles, seguimientos manuales y pasos que frenan tu crecimiento.",
    outcomes: ["Mapa del proceso", "Integraciones", "Alertas y seguimiento"],
    examples: ["Ventas y seguimiento", "Administración", "Reportes recurrentes"],
    accent: "blue",
    glyph: "⌘",
  },
  {
    id: "crm",
    number: "05",
    name: "CRM",
    short: "Una visión clara de cada cliente y cada oportunidad.",
    promise: "Conversaciones, tareas y ventas en un mismo lugar.",
    description:
      "Diseñamos e implementamos un sistema de relación con clientes adaptado a tu proceso, sin obligarte a trabajar como dicta una plantilla.",
    outcomes: ["Embudo comercial", "Registro de contactos", "Tableros y recordatorios"],
    examples: ["Prospectos de formularios", "Seguimiento por etapas", "Servicio posventa"],
    accent: "lime",
    glyph: "◫",
  },
  {
    id: "chatbots",
    number: "06",
    name: "Chatbots",
    short: "Conversaciones útiles para vender, atender y orientar.",
    promise: "Un asistente que entiende el contexto de tu negocio.",
    description:
      "Diseñamos chatbots con un objetivo claro, una voz coherente y rutas de escalamiento a personas. Pueden conversar en tu sitio, WhatsApp o canales internos e integrarse con tus herramientas.",
    outcomes: ["Guion conversacional", "Base de conocimiento", "Integración con CRM o equipo humano"],
    examples: ["Ventas y calificación", "Atención y preguntas frecuentes", "Asistentes internos para empresas"],
    accent: "blue",
    glyph: "◌",
  },
];

const chatbotCases = [
  { number: "01", title: "Ventas", text: "Detecta la necesidad, recomienda opciones y entrega prospectos con contexto." },
  { number: "02", title: "Atención", text: "Resuelve preguntas frecuentes y deriva casos sensibles a una persona." },
  { number: "03", title: "Prospectos", text: "Califica oportunidades con preguntas breves antes de registrarlas en el CRM." },
  { number: "04", title: "Reservas", text: "Ayuda a elegir un servicio, consultar disponibilidad y preparar una cita." },
  { number: "05", title: "Equipos", text: "Facilita el acceso a procesos, políticas y conocimiento interno de la empresa." },
  { number: "06", title: "Operaciones", text: "Consulta estatus, captura solicitudes y activa automatizaciones conectadas." },
];

const projectTypes = services.map((service) => service.name);

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function Portfolio() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefStep, setBriefStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [projectAudience, setProjectAudience] = useState("");
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    document.body.style.overflow = activeService || briefOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeService, briefOpen]);

  const progress = useMemo(() => `${(briefStep / 3) * 100}%`, [briefStep]);

  function openBrief(service?: Service) {
    if (service) setSelectedType(service.name);
    setActiveService(null);
    setBriefStep(1);
    setSent(false);
    setProjectIdea("");
    setExpectedResult("");
    setProjectAudience("");
    setContactName("");
    setCompany("");
    setContactEmail("");
    setContactPhone("");
    setFormStartedAt(Date.now());
    setFormError("");
    setBriefOpen(true);
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get("website");
    setSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedType,
          idea: projectIdea,
          result: expectedResult,
          audience: projectAudience,
          deadline: new FormData(form).get("plazo"),
          name: contactName,
          company,
          email: contactEmail,
          phone: contactPhone,
          website: honeypot,
          startedAt: formStartedAt,
        }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "No pudimos enviar tu idea.");
      setSent(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No pudimos enviar tu idea. Inténtalo nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Nexo Digital, inicio">
          <strong>NEXO</strong><span>DIGITAL</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#enfoque">Enfoque</a>
          <a href="#fundador">Quién soy</a>
        </nav>
        <button className="header-cta" onClick={() => openBrief()}>
          Iniciar un proyecto <ArrowIcon />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">ESTRATEGIA <i>×</i> TECNOLOGÍA <i>×</i> RESULTADOS</p>
          <h1><strong>Ideas claras.</strong><span>Soluciones que avanzan.</span></h1>
          <p className="hero-lead">
            Diseñamos apps, web, IA, automatizaciones, CRM y chatbots para transformar la forma en que trabajas.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => openBrief()}>
              Cuéntanos tu idea <ArrowIcon />
            </button>
            <a className="button button-secondary" href="#servicios">Explorar servicios <span>→</span></a>
          </div>
        </div>

        <div className="system-map" aria-label="Mapa visual de servicios conectados">
          <div className="map-grid" />
          <div className="core"><span>NEXO</span><small>DIGITAL</small></div>
          <div className="connector connector-a" /><div className="connector connector-b" />
          <div className="connector connector-c" /><div className="connector connector-d" />
          <div className="map-node node-app"><span>▯</span><small>APPS</small></div>
          <div className="map-node node-web"><span>◎</span><small>WEB</small></div>
          <div className="map-node node-ai"><span>✦</span><small>IA</small></div>
          <div className="map-node node-auto"><span>⌘</span><small>AUTOMATIZACIÓN</small></div>
          <div className="map-node node-crm"><span>◫</span><small>CRM</small></div>
          <div className="map-node node-bot"><span>◌</span><small>CHATBOTS</small></div>
          <p className="map-note">SISTEMAS CONECTADOS<br />PARA UN CRECIMIENTO REAL</p>
        </div>
      </section>

      <section className="services" id="servicios" aria-labelledby="services-title">
        <div className="section-intro">
          <p className="eyebrow">QUÉ PODEMOS CONSTRUIR</p>
          <h2 id="services-title">Seis puertas.<br />Una misma estrategia.</h2>
          <p>Elige un servicio para conocer cómo puede aplicarse a tu proyecto.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <button
              className={`service-card accent-${service.accent}`}
              key={service.id}
              onClick={() => setActiveService(service)}
              aria-label={`Conocer más sobre ${service.name}`}
            >
              <div className="card-top"><span>{service.number}</span><span className="glyph">{service.glyph}</span></div>
              <div><h3>{service.name}</h3><p>{service.short}</p></div>
              <span className="card-link">Ver cómo funciona <ArrowIcon /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="chatbot-showcase" aria-labelledby="chatbot-title">
        <div className="chatbot-heading">
          <p className="eyebrow">CHATBOTS CON UN TRABAJO REAL</p>
          <h2 id="chatbot-title">No solo responden.<br /><span>Saben qué debe pasar después.</span></h2>
          <p>Diseñamos la conversación, la conexión con tus sistemas y el momento exacto en que debe intervenir una persona.</p>
          <button className="button button-primary" onClick={() => openBrief(services[5])}>Quiero explorar un chatbot <ArrowIcon /></button>
        </div>
        <div className="chatbot-cases">
          {chatbotCases.map((item) => (
            <article key={item.title}>
              <span>{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="process" id="proceso">
        <div className="process-title"><p className="eyebrow">NUESTRO PROCESO</p><h2>De la conversación<br />a una solución real.</h2></div>
        <ol>
          <li><span>01</span><div><strong>Exploramos</strong><p>Entendemos tu idea, contexto y resultado esperado.</p></div></li>
          <li><span>02</span><div><strong>Definimos</strong><p>Convertimos posibilidades en una ruta concreta.</p></div></li>
          <li><span>03</span><div><strong>Diseñamos</strong><p>Probamos la experiencia antes de construir.</p></div></li>
          <li><span>04</span><div><strong>Desarrollamos</strong><p>Implementamos, medimos y mejoramos.</p></div></li>
        </ol>
      </section>

      <section className="founder" id="fundador" aria-labelledby="founder-name">
        <div className="founder-mark" aria-hidden="true">
          <span>G</span><span>A</span><span>P</span><span>C</span>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">DETRÁS DE NEXO DIGITAL</p>
          <h2 id="founder-name">Gustavo Adolfo<br />Perez Carlos</h2>
          <p className="founder-title">Ingeniero en Inteligencia Artificial</p>
          <p className="founder-description">
            Diseño soluciones digitales que conectan tecnología, procesos y personas para resolver necesidades reales de negocio.
          </p>
          <button className="button button-secondary" onClick={() => openBrief()}>
            Conversemos sobre tu idea <ArrowIcon />
          </button>
        </div>
      </section>

      <section className="principles" id="enfoque">
        <p className="eyebrow">POR QUÉ SE SIENTE DIFERENTE</p>
        <div className="principles-grid">
          <h2>No empezamos con una plantilla.<br /><span>Empezamos con una pregunta.</span></h2>
          <div className="principle-list">
            <article><b>01</b><h3>¿Qué debe cambiar?</h3><p>Diseñamos alrededor del resultado, no de una lista de funciones.</p></article>
            <article><b>02</b><h3>¿Para quién importa?</h3><p>La experiencia responde a las personas que realmente la usarán.</p></article>
            <article><b>03</b><h3>¿Cómo sabremos que funciona?</h3><p>Definimos señales de éxito antes de escribir una línea de código.</p></article>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">TU PROYECTO PUEDE EMPEZAR AQUÍ</p>
        <h2>Una buena solución empieza<br />con una conversación honesta.</h2>
        <button className="button button-dark" onClick={() => openBrief()}>
          Platicar mi idea <ArrowIcon />
        </button>
      </section>

      <section className="direct-contact" aria-labelledby="direct-contact-title">
        <div>
          <p className="eyebrow">CONTACTO DIRECTO</p>
          <h2 id="direct-contact-title">¿Prefieres escribir<br />sin llenar el registro?</h2>
        </div>
        <div className="contact-links">
          <a href="mailto:gustavoadolfoperezcarlos@gmail.com">
            <span>Correo</span>
            <strong>gustavoadolfoperezcarlos@gmail.com</strong>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="https://wa.me/525540457529?text=Hola%20Gustavo%2C%20quiero%20platicarte%20una%20idea%20de%20proyecto." target="_blank" rel="noreferrer">
            <span>WhatsApp</span>
            <strong>+52 55 4045 7529</strong>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="tel:+525540457529">
            <span>Teléfono</span>
            <strong>+52 55 4045 7529</strong>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <footer><div className="brand"><strong>NEXO</strong><span>DIGITAL</span></div><p>Nexo Digital — dirigido por Gustavo Adolfo Perez Carlos</p><div className="footer-links"><a href="/privacidad">Privacidad</a><a href="#inicio">Volver arriba ↑</a></div></footer>

      {activeService && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="service-dialog-title" onMouseDown={() => setActiveService(null)}>
          <article className="service-dialog" onMouseDown={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setActiveService(null)} aria-label="Cerrar">×</button>
            <p className="eyebrow">{activeService.number} / {activeService.name.toUpperCase()}</p>
            <h2 id="service-dialog-title">{activeService.promise}</h2>
            <p className="dialog-lead">{activeService.description}</p>
            <div className="dialog-columns">
              <div><h3>Qué podemos entregar</h3><ul>{activeService.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>Puede aplicarse a</h3><ul>{activeService.examples.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <button className="button button-primary" onClick={() => openBrief(activeService)}>
              Tengo una idea para {activeService.name} <ArrowIcon />
            </button>
          </article>
        </div>
      )}

      {briefOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="brief-title">
          <form className="brief-dialog" onSubmit={submitBrief}>
            <button type="button" className="close" onClick={() => setBriefOpen(false)} aria-label="Cerrar">×</button>
            {!sent ? (
              <>
                <div className="brief-progress"><span style={{ width: progress }} /></div>
                <p className="eyebrow">BRIEF DE PROYECTO · PASO {briefStep} DE 3</p>
                {briefStep === 1 && (
                  <fieldset>
                    <legend id="brief-title">¿Qué te gustaría crear?</legend>
                    <p className="field-help">Puedes elegir más de un servicio después. Empecemos por el principal.</p>
                    <div className="choice-grid">
                      {projectTypes.map((type) => (
                        <label className={selectedType === type ? "selected" : ""} key={type}>
                          <input type="radio" name="tipo" value={type} checked={selectedType === type} onChange={() => setSelectedType(type)} required />
                          {type}<span>→</span>
                        </label>
                      ))}
                      <label className={selectedType === "No estoy seguro" ? "selected" : ""}>
                        <input type="radio" name="tipo" value="No estoy seguro" checked={selectedType === "No estoy seguro"} onChange={() => setSelectedType("No estoy seguro")} required />
                        No estoy seguro<span>?</span>
                      </label>
                    </div>
                  </fieldset>
                )}
                {briefStep === 2 && (
                  <fieldset>
                    <legend>Platícanos la idea.</legend>
                    <label className="field">¿Qué problema quieres resolver o qué oportunidad ves?<textarea name="idea" rows={4} required value={projectIdea} onChange={(event) => setProjectIdea(event.target.value)} placeholder="Ejemplo: hoy damos seguimiento a clientes en varias hojas y perdemos oportunidades..." /></label>
                    <label className="field">¿Cómo te gustaría que fuera el resultado?<textarea name="resultado" rows={3} required value={expectedResult} onChange={(event) => setExpectedResult(event.target.value)} placeholder="Describe la experiencia ideal para tu equipo o tus clientes..." /></label>
                    <div className="form-row"><label className="field">¿Para quién es?<input name="publico" required value={projectAudience} onChange={(event) => setProjectAudience(event.target.value)} placeholder="Clientes, equipo interno..." /></label><label className="field">Plazo aproximado<input name="plazo" placeholder="Sin fecha, 1–3 meses..." /></label></div>
                  </fieldset>
                )}
                {briefStep === 3 && (
                  <fieldset>
                    <legend>¿Cómo continuamos la conversación?</legend>
                    <div className="form-row"><label className="field">Nombre<input name="nombre" autoComplete="name" required value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Tu nombre" /></label><label className="field">Empresa<input name="empresa" autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Opcional" /></label></div>
                    <label className="field">Correo electrónico<input type="email" name="email" autoComplete="email" required value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="nombre@empresa.com" /></label>
                    <label className="field">WhatsApp<input type="tel" name="telefono" autoComplete="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} placeholder="Opcional" /></label>
                    <label className="honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
                    <label className="consent"><input type="checkbox" required /><span>Acepto que me contacten para conversar sobre este proyecto y he leído el <a href="/privacidad" target="_blank">aviso de privacidad</a>.</span></label>
                    {formError && <p className="form-error" role="alert">{formError}</p>}
                  </fieldset>
                )}
                <div className="brief-actions">
                  {briefStep > 1 && <button type="button" className="text-button" onClick={() => setBriefStep((step) => step - 1)}>← Atrás</button>}
                  {briefStep < 3 ? <button type="button" className="button button-dark" disabled={(briefStep === 1 && !selectedType) || (briefStep === 2 && (!projectIdea.trim() || !expectedResult.trim() || !projectAudience.trim()))} onClick={() => setBriefStep((step) => step + 1)}>Continuar →</button> : <button type="submit" className="button button-primary" disabled={submitting}>{submitting ? "Enviando..." : "Enviar mi idea"} {!submitting && <ArrowIcon />}</button>}
                </div>
              </>
            ) : (
              <div className="success-state"><span>✓</span><p className="eyebrow">IDEA REGISTRADA</p><h2>Gracias por compartir<br />lo que tienes en mente.</h2><p>Tu mensaje fue enviado correctamente. Revisaremos la información y continuaremos la conversación por los datos de contacto que compartiste.</p><button type="button" className="button button-dark" onClick={() => setBriefOpen(false)}>Volver al sitio</button></div>
            )}
          </form>
        </div>
      )}
    </main>
  );
}
