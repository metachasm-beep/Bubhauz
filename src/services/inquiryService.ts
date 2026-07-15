import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendNotification } from '@/lib/notifications';

export interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  productOfInterest: string;
  message?: string;
}

export const InquiryService = {
  async submitInquiry(data: InquiryData) {
    if (!data.name || !data.email || !data.productOfInterest) {
      throw new Error("Missing required fields");
    }

    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...data,
      phone: data.phone || '',
      message: data.message || '',
      status: 'NEW',
      createdAt: serverTimestamp(),
    });

    // Fire & forget notifications
    try {
      sendNotification({
        type: 'INQUIRY_RECEIVED',
        to: data.email,
        name: data.name,
        productId: data.productOfInterest
      });
    } catch (e) {
      console.error("Failed to send notification", e);
    }

    return docRef.id;
  }
}
