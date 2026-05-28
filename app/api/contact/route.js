import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        // 1. Validate fields
        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    error: "All fields (name, email, message) are required.",
                },
                { status: 400 },
            );
        }

        // 2. Check API Key
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error(
                "Resend API Key is missing from environment variables.",
            );
            return NextResponse.json(
                {
                    success: false,
                    error: "Resend API Key is not configured on the server. Please add RESEND_API_KEY to your .env.local file.",
                },
                { status: 500 },
            );
        }

        const receiverEmail =
            process.env.CONTACT_RECEIVER_EMAIL || "adi1510jain@gmail.com";

        // 3. Initialize Resend
        const resend = new Resend(apiKey);

        // 4. Send Email
        const emailResponse = await resend.emails.send({
            from: "Portfolio Contact <portfolio@adijain.click>",
            to: receiverEmail,
            subject: `New Message from ${name} (Portfolio)`,
            replyTo: email,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #fafafa;">
                    <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: #ffffff;">
                        <h2 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Portfolio Connection Request</h2>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #a0a0a0;">Received via adijain.click</p>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
                        <div style="margin-bottom: 20px;">
                            <span style="font-size: 12px; text-transform: uppercase; color: #888888; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Sender Details</span>
                            <strong style="font-size: 16px; color: #333333; display: block;">${name}</strong>
                            <a href="mailto:${email}" style="font-size: 14px; color: #3b82f6; text-decoration: none;">${email}</a>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                        <div style="margin-bottom: 10px;">
                            <span style="font-size: 12px; text-transform: uppercase; color: #888888; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message</span>
                            <div style="font-size: 15px; color: #4a5568; line-height: 1.6; white-space: pre-wrap; background-color: #f7fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #1a1a1a;">${message}</div>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #a0a0a0;">
                        <p style="margin: 0;">This email was sent automatically from your website's contact form.</p>
                        <p style="margin: 4px 0 0 0;">Reply directly to this email to respond to the sender.</p>
                    </div>
                </div>
            `,
        });

        // Check if sending encountered an error
        if (emailResponse.error) {
            console.error("Resend API Send Error:", emailResponse.error);
            return NextResponse.json(
                { success: false, error: emailResponse.error.message },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
            id: emailResponse.data?.id,
        });
    } catch (error) {
        console.error("Server Contact API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "An unexpected error occurred.",
            },
            { status: 500 },
        );
    }
}
