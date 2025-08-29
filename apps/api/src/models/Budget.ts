import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  name: string;
  amount: number;
  spent: number;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  period: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

const budgetSchema = new Schema<IBudget>({
  name: {
    type: String,
    required: [true, 'Budget name is required'],
    trim: true,
    maxlength: [50, 'Budget name must be less than 50 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'Budget amount is required'],
    min: [0.01, 'Amount must be greater than 0'],
    max: [999999.99, 'Amount is too large'],
  },
  spent: {
    type: Number,
    default: 0,
    min: [0, 'Spent amount cannot be negative'],
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
  period: {
    type: String,
    required: [true, 'Budget period is required'],
    enum: ['monthly', 'yearly'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

budgetSchema.index({ userId: 1, period: 1 });
budgetSchema.index({ userId: 1, categoryId: 1 });

export const Budget = mongoose.model<IBudget>('Budget', budgetSchema);
