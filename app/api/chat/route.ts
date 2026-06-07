export const runtime = "edge";

const SYSTEM_PROMPT = `Eres el asistente virtual de Disfrazarte, la tienda de alquiler de trajes y disfraces más completa de Ecuador.

Información clave sobre Disfrazarte:
- Más de 500 modelos de trajes y disfraces disponibles
- Categorías: trajes de desfile y reinas, carnaval y fiestas, teatro y fotografía, accesorios completos (coronas, cetros, capas, máscaras)
- Locales: Casa Matriz en Ambato (13 de Abril y Mera, Centro Comercial Ambato) y sucursal en Riobamba
- Horario: Lunes a Sábado de 9:00 a 19:00
- Contacto: WhatsApp 096 901 6264
- Instagram: @disfrazarte_ec
- Envíos a todo Ecuador

Cómo funciona el alquiler:
- El cliente elige su traje por WhatsApp, Instagram o visitando el local
- Se coordina fecha de uso y entrega
- Se deja un depósito de garantía
- Después del evento se devuelve el traje

Tu rol:
- Ayuda a los clientes a encontrar el traje ideal para su evento
- Responde preguntas sobre disponibilidad, precios, horarios y ubicaciones
- Dirige a los clientes a WhatsApp (096 901 6264) para reservas y consultas específicas de precio
- Sé amable, entusiasta y usa un tono festivo y profesional
- Si no sabes el precio exacto de algo, invita a preguntar por WhatsApp
- Responde siempre en español

No respondas preguntas que no tengan relación con Disfrazarte o el alquiler de trajes.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages?.length) {
    return new Response("Bad request", { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  const contents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.text();
    return new Response(err, { status: res.status });
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
