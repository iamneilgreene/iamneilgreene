import nodemailer from 'nodemailer'

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.MAIL_FROM)
}

/** Credentials remain server-side. Never enable SMTP debug logging here. */
export async function sendWebsiteMail(input: { to: string; subject: string; text: string; html?: string; replyTo?: string }) {
  if (!isMailConfigured()) throw new Error('Email service unavailable')
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    logger: false,
    debug: false,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  try {
    const receipt = await transport.sendMail({
      from: { name: 'Neil Greene', address: process.env.MAIL_FROM! },
      to: { address: input.to, name: '' },
      replyTo: { address: input.replyTo ?? process.env.MAIL_FROM!, name: '' },
      subject: input.subject,
      text: input.text,
      html: input.html,
    })
    if (!receipt.accepted.some((address) => String(address).toLowerCase() === input.to.toLowerCase()) || receipt.rejected.length) throw new Error('Email acceptance not confirmed')
    return { accepted: true as const }
  } finally { transport.close() }
}
