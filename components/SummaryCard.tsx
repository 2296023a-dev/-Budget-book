import React, { useMemo } from 'react';
import { Expense } from '../types';
import { TrendingUp, Calendar, Wallet } from 'lucide-react';

interface SummaryCardProps {
  expenses: Expense[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ expenses }) => {
  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const today = new Date();
  const monthName = today.toLocaleDateString('ja-JP', { month: 'long' });

  return (
    <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white shadow-xl shadow-navy-900/20 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>{monthName}の支出</span>
            </div>
            <div className="bg-white/10 p-1.5 rounded-lg">
                <Wallet className="w-4 h-4 text-primary-400" />
            </div>
        </div>
        
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-4xl font-bold tracking-tight">
            ¥{currentMonthTotal.toLocaleString()}
          </span>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-xs text-primary-200 bg-primary-500/10 w-fit px-3 py-1 rounded-full border border-primary-500/20">
            <TrendingUp className="w-3 h-3" />
            <span>使いすぎに注意しましょう</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;