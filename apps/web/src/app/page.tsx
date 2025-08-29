'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Users 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <nav className="relative flex items-center justify-between pt-6 lg:justify-start lg:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/" className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-primary-600" />
                  <span className="text-xl font-bold text-gray-900">BudgetPro</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
                <Link
                  href="/auth/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Take Control of Your
              <span className="text-primary-600"> Finances</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto text-xl text-gray-600 mb-8"
            >
              Smart budget management with real-time analytics, automated insights, 
              and cross-platform synchronization. Make informed financial decisions 
              with BudgetPro.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
              </Link>
              <Link href="#features" className="btn-secondary text-lg px-8 py-3">
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Money
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify your financial life and help you reach your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their finances with BudgetPro.
          </p>
          <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <DollarSign className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">BudgetPro</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 BudgetPro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Smart Analytics',
    description: 'Get insights into your spending patterns with advanced charts and reports that help you make better financial decisions.',
    icon: BarChart3,
  },
  {
    title: 'Secure & Private',
    description: 'Your financial data is protected with bank-level security and encryption. Your privacy is our top priority.',
    icon: Shield,
  },
  {
    title: 'Cross-Platform',
    description: 'Access your budget anywhere with our web app and mobile apps. Your data syncs seamlessly across all devices.',
    icon: Smartphone,
  },
  {
    title: 'Automated Tracking',
    description: 'Set up automated rules and notifications to track expenses and stay on top of your budget without manual work.',
    icon: TrendingUp,
  },
  {
    title: 'Goal Setting',
    description: 'Set financial goals and track your progress with visual indicators and personalized recommendations.',
    icon: DollarSign,
  },
  {
    title: 'Family Sharing',
    description: 'Share budgets with family members and collaborate on financial goals together with permission controls.',
    icon: Users,
  },
];
