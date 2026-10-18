type ContactPayload = {
  service?: unknown;
  idea?: unknown;
  result?: unknown;
  audience?: unknown;
  deadline?: unknown;
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:10px 12px;border-bottom:1px solid #ddd;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value || "No especificado")}</td></tr>`;
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && new URL(requestOrigin).host !== new URL(request.url).host) {
    return Response.json({ message: "Solicitud no permitida." }, { status: 403 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "La información enviada no es válida." }, { status: 400 });
  }

  if (text(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (elapsed < 2500 || elapsed > 7_200_000) {
    return Response.json({ message: "Actualiza la página e inténtalo nuevamente." }, { status: 400 });
  }

  const values = {
    service: text(payload.service, 80),
    idea: text(payload.idea, 3000),
    result: text(payload.result, 3000),
    audience: text(payload.audience, 500),
    deadline: text(payload.deadline, 200),
    name: text(payload.name, 160),
    company: text(payload.company, 200),
    email: text(payload.email, 254).toLowerCase(),
    phone: text(payload.phone, 80),
  };

  if (!values.service || !values.idea || !values.result || !values.audience || !values.name || !emailPattern.test(values.email)) {
    return Response.json({ message: "Revisa los campos obligatorios antes de enviar." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact email environment variables are not configured.");
    return Response.json({ message: "El formulario se está configurando. Escríbenos directamente por correo o WhatsApp." }, { status: 503 });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#171813;max-width:720px;margin:auto">
      <p style="font-size:12px;letter-spacing:2px">NEXO DIGITAL · NUEVO PROYECTO</p>
      <h1 style="font-size:32px">${escapeHtml(values.name)} quiere conversar sobre ${escapeHtml(values.service)}</h1>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${row("Servicio", values.service)}
        ${row("Idea o problema", values.idea)}
        ${row("Resultado esperado", values.result)}
        ${row("Público", values.audience)}
        ${row("Plazo", values.deadline)}
        ${row("Nombre", values.name)}
        ${row("Empresa", values.company)}
        ${row("Correo", values.email)}
        ${row("WhatsApp", values.phone)}
      </table>
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: values.email,
      subject: `Nuevo proyecto de ${values.service} — ${values.name}`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Resend request failed", response.status, await response.text());
    return Response.json({ message: "No pudimos enviar tu mensaje. Inténtalo nuevamente o contáctanos directamente." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
