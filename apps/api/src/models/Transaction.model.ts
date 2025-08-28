import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  amount: number;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: 'income' | 'expense';
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
    max: [999999.99, 'Amount is too large'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [255, 'Description must be less than 255 characters'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['income', 'expense'],
  },
  date: {
    type: Date,
    required: [true, 'Transaction date is required'],
    default: Date.now,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Indexes for efficient queries
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, categoryId: 1 });
transactionSchema.index({ userId: 1, type: 1, date: -1 });
transactionSchema.index({ date: 1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
