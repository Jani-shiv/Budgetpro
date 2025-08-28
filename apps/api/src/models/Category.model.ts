import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  color: string;
  icon?: string;
  type: 'income' | 'expense';
  userId: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name must be less than 50 characters'],
  },
  color: {
    type: String,
    required: [true, 'Category color is required'],
    match: [/^#[0-9A-F]{6}$/i, 'Invalid color format. Use hex format (#RRGGBB)'],
  },
  icon: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Category type is required'],
    enum: ['income', 'expense'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Compound index for user-specific categories
categorySchema.index({ userId: 1, name: 1 }, { unique: true });
categorySchema.index({ userId: 1, type: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
