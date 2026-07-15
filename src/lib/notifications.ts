export type NotificationEvent = {
  type: 'INQUIRY_RECEIVED' | 'BULK_ORDER_REQUEST';
  to: string;
  name: string;
  productId?: string;
}

export async function sendNotification(event: NotificationEvent) {
  // Scaffolding for SMS (e.g. Msg91) and Email (e.g. AWS SES / Resend)
  console.log(`[Notification Service] Triggered ${event.type} for ${event.to}`);
  
  if (event.type === 'INQUIRY_RECEIVED') {
    console.log(`[Email] To: ${event.to} | Hello ${event.name}, thank you for your interest in Bubhauz. Our team will contact you shortly regarding ${event.productId}.`);
    console.log(`[SMS] To: Bubhauz Sales Team | New Lead: ${event.name} is inquiring about ${event.productId}.`);
  }
}
