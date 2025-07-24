import { EmailProviderSendVerificationRequestParams } from "next-auth/providers";
import { createTransport, Transporter } from "nodemailer";

// DEFAULT Auth.JS FUNCTIN
// WITH CUSTOM HTML

interface Theme {
    brandColor?: string;
    buttonText?: string;
}

export async function sendVerificationRequest(params: EmailProviderSendVerificationRequestParams): Promise<void> {
    const { identifier, url, provider, theme } = params;
    const { host } = new URL(url);

    const transport: Transporter = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host, theme }),
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length > 0) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
}

function html(params: { url: string; host: string; theme: Theme }): string {
    const { url, theme } = params;

    const escapedHost = "PainDB";
    const brandColor = theme.brandColor || "#2a8e9e";

    const color = {
        background: "#f4f4f5",
        text: "#1e293b",
        mainBackground: "#ffffff",
        buttonBackground: brandColor,
        buttonBorder: brandColor,
        buttonText: theme.buttonText || "#ffffff",
        mutedText: "#64748b",
    };

    return `
<body style="background: ${color.background}; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" width="600" style="background: ${color.mainBackground}; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
          <tr>
            <td style="padding: 40px 30px 0 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; color: ${color.text}; font-weight: 600;">Welcome back to <span style="color: ${brandColor};">${escapedHost}</span></h1>
              <p style="font-size: 16px; color: ${color.mutedText}; margin-top: 10px;">Click below to access your dashboard and keep tracking the world’s real problems.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center;">
              <a href="${url}" target="_blank"
                style="background: ${color.buttonBackground}; color: ${color.buttonText}; padding: 14px 28px; text-decoration: none; border-radius: 6px; border: 1px solid ${color.buttonBorder}; font-weight: 600; font-size: 16px; display: inline-block;">
                Sign in to PainDB
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center; font-size: 14px; color: ${color.mutedText};">
              If you didn’t request this, no worries — just ignore this email and your data stays safe.
            </td>
          </tr>
          <tr>
            <td style="background: ${color.background}; padding: 20px 30px; text-align: center; font-size: 12px; color: ${color.mutedText}; border-top: 1px solid #e2e8f0;">
              You’re receiving this email because someone tried to sign in to <strong>${escapedHost}</strong> using your address.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
  `;
}

function text({ url, host }: { url: string; host: string }): string {
    return `Sign in to ${host}\n${url}\n\n`;
}
