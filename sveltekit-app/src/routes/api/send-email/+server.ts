import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { BREVO_SMTP_USER, BREVO_SMTP_PASS, CLUB_MAIL_ADDRESS, CLUB_MAIL_SENDER_NAME } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {

    let { name, email, subject, message, confirmEmail } = await request.json();

    // Honeypot Check
    if (confirmEmail) {
        // Silent failure for bots - pretend success
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Trim inputs
    name = (name || '').trim();
    email = (email || '').trim();
    subject = (subject || '').trim();
    message = (message || '').trim();

    // Input Validation
    if (!name || !email || !message) {
        return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587, 
            auth:{
                user: BREVO_SMTP_USER,
                pass: BREVO_SMTP_PASS
            },
        });
        
        await transporter.sendMail({
            from: CLUB_MAIL_SENDER_NAME,
            replyTo: `"${name}" <${email}>`,
            to: CLUB_MAIL_ADDRESS,
            subject: subject || 'Neue Kontaktanfrage',
            text:`
            <i>Nachricht von <b>${name}</b> (${email}):</i>
            
            ${message}
            `
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