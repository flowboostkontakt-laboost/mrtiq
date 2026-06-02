import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Wymagane ENV (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   — klucz API z resend.com (wymagany do wysyłki maili)
//   RESEND_FROM      — nadawca, np. "MRTIQ — WEKTOR <nabor@mrtiq.pl>" (po weryfikacji domeny)
// Opcjonalne:
//   LEAD_NOTIFY_TO       — gdzie trafia powiadomienie o nowym leadzie (domyślnie intel@mrtiq.pl)
//   NEXT_PUBLIC_SITE_URL — bazowy URL do linków/załączników (domyślnie https://www.mrtiq.pl)
//   GSHEET_WEBHOOK_URL   — URL Web App z Google Apps Script (zapis leada do arkusza)

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrtiq.pl";
const FROM = process.env.RESEND_FROM || "MRTIQ — WEKTOR <nabor@mrtiq.pl>";
const NOTIFY = process.env.LEAD_NOTIFY_TO || "intel@mrtiq.pl";

type Lead = {
  path?: "A" | "B";
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  company?: string;
  nip?: string;
  slot?: string;
};

type Attachment = { filename: string; path: string };
type SendResult = { ok: boolean; skipped?: boolean; status?: number };

const DOCS: [string, string][] = [
  ["Instrukcja krok po kroku", "/dokumenty/Instrukcja-uczestnika-WEKTOR.docx"],
  ["Jak założyć profil zaufany", "/dokumenty/Profil-zaufany-instrukcja.docx"],
  ["Checklista przed naborem", "/dokumenty/Checklista-przed-naborem.docx"],
  ["Wzór wypełnionego wniosku", "/dokumenty/Wzor-wypelnionego-wniosku.docx"],
];
const ATTACHMENTS: Attachment[] = DOCS.map(([, href]) => ({
  filename: href.split("/").pop() as string,
  path: `${SITE}${href}`,
}));

async function sendEmail(to: string, subject: string, html: string, attachments?: Attachment[]): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, skipped: true };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject, html, ...(attachments?.length ? { attachments } : {}) }),
    });
    return { ok: r.ok, status: r.status };
  } catch {
    return { ok: false };
  }
}

async function saveSheet(lead: Lead): Promise<SendResult> {
  const url = process.env.GSHEET_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, ts: new Date().toISOString() }),
      redirect: "follow",
    });
    return { ok: r.ok, status: r.status };
  } catch {
    return { ok: false };
  }
}

// ── Markowy szablon e-mail (kolory MRTIQ, UTF-8, tabela = kompatybilność z klientami) ──
function brandedEmail(opts: { heading: string; bodyHtml: string; ctaText?: string; ctaUrl?: string }) {
  const { heading, bodyHtml, ctaText, ctaUrl } = opts;
  const cta = ctaText && ctaUrl
    ? `<tr><td style="padding:22px 32px 4px;">
         <a href="${ctaUrl}" style="display:inline-block;background:#FFE600;color:#0a0a0c;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;">${ctaText}</a>
       </td></tr>`
    : "";
  return `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0c;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0c;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#111114;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px 0;">
          <img src="${SITE}/mrtiq-mark.png" alt="MRTIQ — Marketing Intelligence" width="148" style="display:block;height:auto;border:0;">
        </td></tr>
        <tr><td style="padding:16px 32px 0;">
          <div style="height:3px;background:linear-gradient(90deg,#00E5C5,#FF2DAA,#FFE600);border-radius:2px;font-size:1px;line-height:1px;">&nbsp;</div>
        </td></tr>
        <tr><td style="padding:26px 32px 0;font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">${heading}</td></tr>
        <tr><td style="padding:12px 32px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#bfbfc6;">${bodyHtml}</td></tr>
        ${cta}
        <tr><td style="padding:26px 32px 30px;">
          <div style="height:1px;background:rgba(255,255,255,0.08);font-size:1px;line-height:1px;">&nbsp;</div>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#7a7a82;margin:16px 0 0;">
            Szkolenie współfinansowane ze środków Unii Europejskiej w ramach projektu WEKTOR (Fundusze Europejskie dla Pomorza 2021–2027, Działanie 5.9). Operator: Agencja Rozwoju Pomorza S.A. · Partner: WUP w Gdańsku. Dofinansowanie do 95% zależnie od kwalifikacji i puli środków.<br><br>
            Dostajesz tę wiadomość, bo zapisałeś(-aś) się na stronie naboru MRTIQ. Kontakt: <a href="mailto:intel@mrtiq.pl" style="color:#00E5C5;text-decoration:none;">intel@mrtiq.pl</a> · +48 502 417 719.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function docListHtml() {
  return `<ul style="padding-left:18px;margin:12px 0;color:#e8e8ea;">${DOCS.map(([l]) => `<li style="margin:6px 0;">${l}</li>`).join("")}</ul>`;
}

function welcomeEmail(lead: Lead) {
  const name = (lead.name || "").trim();
  if (lead.path === "B") {
    const body = `<p style="margin:0 0 12px;">Cześć ${name},</p>
      <p style="margin:0 0 12px;">zapisaliśmy Cię na pomoc przy składaniu wniosku w piątek 29.05${lead.slot ? `, orientacyjnie o <b style="color:#fff;">${lead.slot}</b>` : ""}. Link do spotkania prześlemy rano. W załączniku masz komplet dokumentów:</p>
      ${docListHtml()}
      <p style="margin:0 0 12px;">Dwie rzeczy zrób już dziś: <b style="color:#fff;">profil zaufany</b> (pz.gov.pl) oraz <b style="color:#fff;">konto w BUR</b> i wybór naszej usługi. Asysta <b style="color:#fff;">nie zastępuje profilu zaufanego</b> — logujesz się i podpisujesz samodzielnie.</p>
      <p style="margin:0;color:#8a8a92;">Dla jasności: nie prosimy i nie przyjmujemy Twoich haseł — zostają wyłącznie u Ciebie.</p>`;
    return {
      subject: "Potwierdzenie + Twój termin pomocy w piątek 29.05",
      html: brandedEmail({ heading: "Zapisaliśmy Cię na pomoc 🤝", bodyHtml: body, ctaText: "Jak się przygotować →", ctaUrl: `${SITE}/pomorskie/#przygotowanie` }),
    };
  }
  const body = `<p style="margin:0 0 12px;">Cześć ${name},</p>
    <p style="margin:0 0 12px;">dzięki! W załączniku masz komplet dokumentów, żeby spokojnie przygotować się do piątku:</p>
    ${docListHtml()}
    <p style="margin:0 0 8px;">Dwie rzeczy zrób już dziś, bo w piątek nie będzie na nie czasu:</p>
    <p style="margin:0 0 12px;"><b style="color:#00E5C5;">1.</b> Załóż lub sprawdź <b style="color:#fff;">profil zaufany</b> na pz.gov.pl — to nim podpiszesz wniosek.<br>
    <b style="color:#00E5C5;">2.</b> Załóż konto w <b style="color:#fff;">BUR</b> i wybierz naszą usługę.</p>
    <p style="margin:0;">W piątek o 8:15 wyślemy SMS z przypomnieniem. Nabór: <b style="color:#FFE600;">29.05, 9:00–18:00</b>. Dofinansowanie do 95%, wkład od 384 zł.</p>`;
  return {
    subject: "Twoja instrukcja do naboru 29.05 + dokumenty w załączniku",
    html: brandedEmail({ heading: "Masz komplet dokumentów ✦", bodyHtml: body, ctaText: "Przygotuj się do naboru →", ctaUrl: `${SITE}/pomorskie/#przygotowanie` }),
  };
}

export async function POST(req: Request) {
  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }
  if (!lead?.email || !lead?.name) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
  }

  const w = welcomeEmail(lead);
  const rows = Object.entries(lead)
    .map(([k, v]) => `<tr><td style="padding:2px 10px 2px 0;color:#666">${k}</td><td>${v ?? ""}</td></tr>`)
    .join("");
  const notifyHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,Helvetica,sans-serif"><h3>Nowy lead WEKTOR (ścieżka ${lead.path || "?"})</h3><table>${rows}</table></body></html>`;

  const [welcome] = await Promise.allSettled([
    sendEmail(lead.email, w.subject, w.html, ATTACHMENTS),
    sendEmail(NOTIFY, `Lead WEKTOR (${lead.path || "?"}): ${lead.name}`, notifyHtml),
    saveSheet(lead),
  ]);

  const emailed = welcome.status === "fulfilled" && welcome.value.ok;
  return NextResponse.json({ ok: true, emailed });
}
