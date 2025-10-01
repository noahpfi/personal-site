'use server';

import { z } from "zod";
import nodemailer from "nodemailer";

const ContactFormSchema = z.object({
  email: z.email(),
  message: z.string().min(10),
});

export async function sendEmail(formData: { email: string; message: string }) {
  const validatedFields = ContactFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { success: false, message: "Validation failed." };
  }
  const { email, message } = validatedFields.data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <p>${message}</p>
      `,
    });
    return { success: true, message: 'Sent!' };
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Please try again >' };
  }
}