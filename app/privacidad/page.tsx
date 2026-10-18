import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Nexo Digital",
  description: "Información sobre el tratamiento de datos de contacto en Nexo Digital.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <Link className="brand" href="/"><strong>NEXO</strong><span>DIGITAL</span></Link>
        <Link href="/">← Volver al sitio</Link>
      </header>
      <article className="privacy-content">
        <p className="eyebrow">AVISO DE PRIVACIDAD</p>
        <h1>Tu idea es tuya.<br /><strong>Tus datos también.</strong></h1>
        <p className="privacy-lead">Este aviso explica, de manera clara, cómo usamos la información que compartes al registrar una idea de proyecto.</p>

        <section>
          <h2>Responsable</h2>
          <p>Nexo Digital, dirigido por Gustavo Adolfo Perez Carlos, es responsable del tratamiento de los datos que envías mediante este sitio.</p>
        </section>
        <section>
          <h2>Datos que podemos recibir</h2>
          <p>Nombre, empresa, correo electrónico, teléfono o WhatsApp, así como la descripción, público, plazo y resultado esperado de tu proyecto.</p>
        </section>
        <section>
          <h2>Para qué los utilizamos</h2>
          <p>Únicamente para comprender tu necesidad, evaluar de forma preliminar el proyecto, responder tu solicitud y continuar la conversación comercial que tú iniciaste.</p>
        </section>
        <section>
          <h2>Servicios que intervienen</h2>
          <p>El sitio y el envío del formulario pueden apoyarse en proveedores tecnológicos de alojamiento y correo. Esos servicios procesan la información necesaria para entregar tu mensaje.</p>
        </section>
        <section>
          <h2>Conservación y tus derechos</h2>
          <p>Conservaremos la información solamente durante el tiempo necesario para atender tu solicitud y dar seguimiento a la relación comercial. Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a <a href="mailto:gustavoadolfoperezcarlos@gmail.com">gustavoadolfoperezcarlos@gmail.com</a>.</p>
        </section>
        <p className="privacy-update">Última actualización: 18 de octubre de 2026.</p>
      </article>
    </main>
  );
}
