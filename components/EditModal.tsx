import React, { useState, useEffect } from 'react';
import { ReceiptData } from '../types';
import { X, Check, Store, Calendar, JapaneseYen } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  initialData: ReceiptData | null;
  onClose: () => void;
  onSave: (data: ReceiptData) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<ReceiptData>({
    storeName: '',
    date: '',
    amount: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-transform duration-300 animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-navy-900">内容の確認・修正</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">店名</label>
            <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all font-medium text-gray-800"
                    placeholder="例: コンビニ、スーパー"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">日付</label>
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all font-medium text-gray-800"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">合計金額</label>
            <div className="relative">
                <JapaneseYen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all font-bold text-lg text-navy-900"
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-navy-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-navy-900/30 flex items-center justify-center gap-2 hover:bg-navy-800 active:scale-[0.98] transition-all mt-4"
          >
            <Check className="w-5 h-5" />
            <span>登録する</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;