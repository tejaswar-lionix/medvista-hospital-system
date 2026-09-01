import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, category } = result.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        category: category || 'GENERAL',
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      {
        message: 'Your message has been received. We will get back to you shortly.',
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to submit contact message:', error);
    return NextResponse.json(
      { error: 'Failed to submit message. Please try again later.' },
      { status: 500 }
    );
  }
}