import { useState } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { submitReview } from '../services/api';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    rating: 5,
    title: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await submitReview({
        productId,
        ...formData,
      });

      setSuccess(true);
      setFormData({
        customerName: '',
        customerEmail: '',
        rating: 5,
        title: '',
        content: '',
      });

      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? 'Cancel' : 'Write a Review'}
      </button>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 bg-white border border-gray-200 rounded-lg p-6"
        >
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg text-sm">
              ✓ Review submitted successfully! It will be visible after approval.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData({ ...formData, customerEmail: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: i + 1 })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      i < formData.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Excellent product!"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Your Review
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your experience with this product..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
          >
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}
