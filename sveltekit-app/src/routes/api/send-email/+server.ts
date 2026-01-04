import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const { name, email, subject, message } = await request.json();

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email', // e.g., 'smtp.gmail.com' for Gmail or any other host we might use
            port: 587, // probably  465 for SSL, not sure yet
            secure: false,
            auth:{
                user: EMAIL_USER,
                pass: EMAIL_PASS
            },
        });
        
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: EMAIL_USER,
            subject: subject || 'Neue Kontaktanfrage',
            text:`
            Name: ${name}
            Email: ${email}
            Betreff: ${subject}
            Nachricht: ${message}`,
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error){
        console.error('E-Mail-Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: String(error) }), 
            { status: 500 }
        );
    }
};