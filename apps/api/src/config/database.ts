import mongoose from 'mongoose';

interface DatabaseConnectionOptions {
  retries: number;
  retryDelayMs: number;
}

const defaultOptions: DatabaseConnectionOptions = {
  retries: 5,
  retryDelayMs: 5000,
};

export const connectDatabase = async (
  options: Partial<DatabaseConnectionOptions> = {}
): Promise<void> => {
  const { retries, retryDelayMs } = { ...defaultOptions, ...options };
  
  const mongoUri = process.env.NODE_ENV === 'test' 
    ? process.env.MONGODB_URI_TEST 
    : process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  let attempt = 0;
  
  while (attempt < retries) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        heartbeatFrequencyMS: 2000,
      });
      
      console.log(`✅ MongoDB connected successfully to ${mongoose.connection.name}`);
      
      // Handle connection events
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
      });

      return;
    } catch (error) {
      attempt++;
      console.error(`❌ MongoDB connection attempt ${attempt} failed:`, error);
      
      if (attempt >= retries) {
        throw new Error(`Failed to connect to MongoDB after ${retries} attempts`);
      }
      
      console.log(`⏳ Retrying in ${retryDelayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, retryDelayMs));
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('👋 MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

export const clearDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('clearDatabase can only be used in test environment');
  }
  
  try {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    
    console.log('🧹 Test database cleared');
  } catch (error) {
    console.error('❌ Error clearing test database:', error);
    throw error;
  }
};
