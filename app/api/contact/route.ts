import { NextResponse } from 'next/server';
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();
    
    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email to bkimathi973@gmail.com
    await transporter.sendMail({
      from: email, 
      to: 'accidentalauthor86@gmail.com',
      subject: `Life In Installments - ${firstName} ${lastName}`,
      text: message,
      html: `
        <h2>Life In Installments</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}