import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const rateLimitStore = new Map<string, RateLimitEntry>()

function getClientKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  return req.headers.get('x-real-ip') || 'local'
}

function checkRateLimit(clientKey: string): boolean {
  const now = Date.now()
  const existing = rateLimitStore.get(clientKey)

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  existing.count += 1
  return true
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, maxLength)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request)
  if (!checkRateLimit(clientKey)) {
    return NextResponse.json(
      {
        error:
          'Too many inquiry attempts from this address. Please wait a few minutes or email vishnurajvishwakarma@gmail.com directly.',
      },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    )
  }

  // Honeypot trap: bots often populate hidden website/companyUrlCheck fields
  const honeypot = sanitizeText(body.website, 120)
  if (honeypot.length > 0) {
    return NextResponse.json(
      { error: 'Submission could not be verified.' },
      { status: 400 }
    )
  }

  // Minimum human interaction timing check (1.2s)
  const formStartedAt = Number(body.formStartedAt)
  if (Number.isFinite(formStartedAt) && Date.now() - formStartedAt < 1200) {
    return NextResponse.json(
      { error: 'Please take a moment to review your inquiry before submitting.' },
      { status: 400 }
    )
  }

  const name = sanitizeText(body.name, 120)
  const email = sanitizeText(body.email, 160).toLowerCase()
  const organization = sanitizeText(body.organization, 140)
  const topic = sanitizeText(body.topic, 140)
  const message = sanitizeText(body.message, 3000)
  const consent = body.consent === true

  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Please enter your name (at least 2 characters).' },
      { status: 400 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid business or personal email address.' },
      { status: 400 }
    )
  }

  if (message.length < 15) {
    return NextResponse.json(
      { error: 'Please share a brief overview of your business challenge (at least 15 characters).' },
      { status: 400 }
    )
  }

  if (!consent) {
    return NextResponse.json(
      { error: 'Please confirm consent for inquiry communication before submitting.' },
      { status: 400 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isConfigured =
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl!.includes('placeholder.supabase.co') &&
    supabaseAnonKey !== 'placeholder-anon-key'

  if (!isConfigured) {
    return NextResponse.json(
      {
        code: 'INBOX_NOT_CONFIGURED',
        error:
          'The online message inbox is not connected in this environment. Please use the direct email link below to send your message to vishnurajvishwakarma@gmail.com.',
      },
      { status: 503 }
    )
  }

  const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
  const formattedSubject = [topic, organization].filter(Boolean).join(' · ') || 'Consulting Inquiry'

  const { error } = await supabase.from('messages').insert({
    name,
    email,
    subject: formattedSubject,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json(
      {
        code: 'INBOX_DELIVERY_FAILED',
        error:
          'Unable to deliver your message right now. Please reach out directly at vishnurajvishwakarma@gmail.com.',
      },
      { status: 502 }
    )
  }

  return NextResponse.json(
    {
      ok: true,
      message: 'Your inquiry has been received. Thank you for reaching out.',
    },
    { status: 201 }
  )
}

