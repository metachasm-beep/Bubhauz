import { describe, it, expect, vi } from 'vitest';
import { InquiryService } from './inquiryService';

// Mock the external Firebase and Notification dependencies
vi.mock('@/lib/firebase', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'mock-id-123' }),
  serverTimestamp: vi.fn()
}));

vi.mock('@/lib/notifications', () => ({
  sendNotification: vi.fn()
}));

describe('InquiryService', () => {
  it('should throw an error if required fields are missing', async () => {
    await expect(
      InquiryService.submitInquiry({ name: '', email: '', productOfInterest: '' })
    ).rejects.toThrow("Missing required fields");
  });

  it('should return a doc id on successful submission', async () => {
    const id = await InquiryService.submitInquiry({ 
      name: 'Jane Doe', 
      email: 'jane@example.com', 
      productOfInterest: 'crib-123' 
    });
    
    expect(id).toBe('mock-id-123');
  });
});
