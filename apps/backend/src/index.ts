import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { setupAuthDecorators } from './middleware/auth';
import { registerAuthRoutes } from './routes/auth';
import { registerProductRoutes } from './routes/products';
import { registerWishlistRoutes } from './routes/wishlist';
import { registerInquiryRoutes } from './routes/inquiries';
import { registerBusinessConfigRoutes } from './routes/businessConfig';
import { registerReviewRoutes } from './routes/reviews';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Initialize Fastify
const fastify = Fastify({
  logger: logger,
});

// Register plugins
fastify.register(fastifyHelmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
});

fastify.register(fastifyCors, {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
});

fastify.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '15 minutes',
});

fastify.register(fastifyJwt, {
  secret: JWT_SECRET,
});

// Setup auth middleware
setupAuthDecorators(fastify);

// Health check route
fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date(),
  };
});

// API version route
fastify.get('/', async (request, reply) => {
  return {
    message: 'Bubhauz Product Catalogue API',
    version: '2.0.0',
    model: 'Catalogue-based (B2B Inquiries)',
    endpoints: {
      auth: '/auth',
      products: '/products',
      wishlist: '/wishlist',
      inquiries: '/inquiries',
      reviews: '/reviews',
      businessConfig: '/business-config',
    },
  };
});

// Register route plugins
(async () => {
  await registerAuthRoutes(fastify);
  await registerProductRoutes(fastify);
  await registerWishlistRoutes(fastify);
  await registerInquiryRoutes(fastify);
  await registerBusinessConfigRoutes(fastify);
  await registerReviewRoutes(fastify);
})();

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  // Prisma errors
  if (error.code === 'P2002') {
    reply.status(409).send({ error: 'Unique constraint violation' });
    return;
  }

  if (error.code === 'P2025') {
    reply.status(404).send({ error: 'Resource not found' });
    return;
  }

  // JWT errors
  if (error.name === 'UnauthorizedError') {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }

  // Default error
  reply.status(500).send({ error: 'Internal server error' });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Environment: ${NODE_ENV}`);
    logger.info(`Model: Catalogue-based (B2B Inquiries)`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await fastify.close();
  process.exit(0);
});
