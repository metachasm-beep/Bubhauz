import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendNotification } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, productOfInterest, message } = body;

    if (!name || !email || !productOfInterest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'inquiries'), {
      name,
      email,
      phone: phone || '',
      productOfInterest,
      message: message || '',
      status: 'NEW',
      createdAt: serverTimestamp(),
    });

    // Fire & forget notifications
    sendNotification({
      type: 'INQUIRY_RECEIVED',
      to: email,
      name,
      productId: productOfInterest
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: error.message || "Failed to process inquiry" }, { status: 500 });
  }
}
