import { NextResponse } from 'next/server';
import { InquiryService } from '@/services/inquiryService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await InquiryService.submitInquiry(body);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Inquiry error:", error);
    if (error.message === "Missing required fields") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to process inquiry" }, { status: 500 });
  }
}

