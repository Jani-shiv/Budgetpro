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
    min: [0.01, 'Budget amount must be greater than 0'],
    max: [999999.99, 'Budget amount is too large'],
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
    validate: {
      validator: function(this: IBudget, value: Date) {
        return value > this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Indexes for efficient queries
budgetSchema.index({ userId: 1, period: 1 });
budgetSchema.index({ userId: 1, categoryId: 1 });
budgetSchema.index({ startDate: 1, endDate: 1 });

// Virtual for budget percentage used
budgetSchema.virtual('percentageUsed').get(function(this: IBudget) {
  return this.amount > 0 ? Math.round((this.spent / this.amount) * 100 * 100) / 100 : 0;
});

// Virtual for remaining budget
budgetSchema.virtual('remaining').get(function(this: IBudget) {
  return Math.max(0, this.amount - this.spent);
});

// Virtual for budget status
budgetSchema.virtual('status').get(function(this: IBudget) {
  const percentage = this.spent / this.amount;
  if (percentage >= 1) return 'over-budget';
  if (percentage >= 0.8) return 'close-to-limit';
  return 'on-track';
});

// Include virtuals in JSON output
budgetSchema.set('toJSON', { virtuals: true });

export const Budget = mongoose.model<IBudget>('Budget', budgetSchema);
