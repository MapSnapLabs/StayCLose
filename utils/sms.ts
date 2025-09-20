import * as SMS from "expo-sms";

/**
 * Send an SMS with given phone + message.
 * Returns "sent", "cancelled", or "unavailable".
 */
export async function sendSMS(phone: string, message: string): Promise<string> {
  try {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.warn("SMS service not available on this device");
      return "unavailable";
    }

    const { result } = await SMS.sendSMSAsync([phone], message);
    return result; // "sent" | "cancelled"
  } catch (err) {
    console.error("sendSMS error:", err);
    return "failed";
  }
}