import React, { useState, useEffect } from 'react';
import { Calculator, Home, TrendingUp, DollarSign, Calendar, PieChart, ExternalLink } from 'lucide-react';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [annualRate, setAnnualRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    annualInterest: 0
  });

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, annualRate, loanTerm]);

  const calculateMortgage = () => {
    if (loanAmount <= 0 || annualRate <= 0 || loanTerm <= 0) return;

    // الفائدة السنوية - الطريقة المبسطة (مبلغ التمويل × نسبة الفائدة)
    const annualInterest = loanAmount * (annualRate / 100);
    
    // إجمالي الفائدة - الطريقة المبسطة (الفائدة السنوية × عدد السنوات)
    const totalInterest = annualInterest * loanTerm;
    
    // إجمالي التمويل (مبلغ التمويل + إجمالي الفائدة)
    const totalAmount = loanAmount + totalInterest;
    
    // القسط الشهري - الطريقة المبسطة (إجمالي التمويل ÷ عدد الأشهر)
    const simpleMonthlyPayment = totalAmount / (loanTerm * 12);
    
    // القسط الشهري - الطريقة المعقدة (معادلة الأقساط الثابتة)
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const complexMonthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setResults({
      monthlyPayment: Math.round(simpleMonthlyPayment),
      complexMonthlyPayment: Math.round(complexMonthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      annualInterest: Math.round(annualInterest)
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getInterestPercentage = () => {
    return ((results.totalInterest / loanAmount) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="D:\اختصار سطح المكتب الجديد\images\logo.png" 
              alt="شعار الشركة" 
              className="h-16 w-auto ml-4"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <p className="text-gray-600 text-lg mb-2">صفحة استاذ فاضل المبارك لـ</p>
          <div className="flex items-center justify-center mb-4">
            <Home className="text-blue-600 ml-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-800">حاسبة التمويل العقاري</h1>
          </div>
          <p className="text-gray-600 text-lg">احسب قيمة القسط الشهري والفوائد بطريقة مبسطة ودقيقة</p>
          
          {/* Twitter Follow Button */}
          <div className="mt-4">
            <a 
              href="https://x.com/Fnar9595" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {/* X (Twitter) Icon */}
              <svg 
                className="w-5 h-5 ml-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-sm font-medium">تابعني على تويتر</span>
              <ExternalLink className="w-4 h-4 mr-2" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Calculator className="text-blue-600 ml-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">بيانات التمويل</h2>
            </div>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  مبلغ التمويل (ريال سعودي)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-right"
                    placeholder="500,000"
                  />
                  <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
                <div className="flex gap-2 mt-2">
                  {[300000, 500000, 750000, 1000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setLoanAmount(amount)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                    >
                      {(amount / 1000)}ك
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  معدل الفائدة السنوي (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-right"
                    placeholder="4.5"
                  />
                  <TrendingUp className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
                <div className="flex gap-2 mt-2">
                  {[3.5, 4.0, 4.5, 5.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setAnnualRate(rate)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  مدة التمويل (سنة)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg text-right"
                    placeholder="25"
                  />
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
                <div className="flex gap-2 mt-2">
                  {[15, 20, 25, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm hover:bg-purple-200 transition-colors"
                    >
                      {term} سنة
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Monthly Payment - Simple */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">القسط الشهري (الطريقة المبسطة)</h3>
                <DollarSign size={28} />
              </div>
              <div className="text-4xl font-bold mb-2">{formatNumber(results.monthlyPayment)}</div>
              <p className="text-blue-100">إجمالي التمويل ÷ عدد الأشهر</p>
            </div>

            {/* Monthly Payment - Complex */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">القسط الشهري (المعادلة المعقدة)</h3>
                <Calculator size={24} />
              </div>
              <div className="text-2xl font-bold mb-1">{formatNumber(results.complexMonthlyPayment)}</div>
              <p className="text-indigo-100 text-sm">معادلة الأقساط الثابتة</p>
            </div>

            {/* Annual Interest */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">الفائدة السنوية</h3>
                <TrendingUp size={24} />
              </div>
              <div className="text-2xl font-bold mb-1">{formatNumber(results.annualInterest)}</div>
              <p className="text-green-100 text-sm">مبلغ التمويل × نسبة الفائدة السنوية</p>
            </div>

            {/* Total Interest */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">إجمالي الفائدة</h3>
                <PieChart size={24} />
              </div>
              <div className="text-2xl font-bold mb-1">{formatNumber(results.totalInterest)}</div>
              <p className="text-orange-100 text-sm">الفائدة السنوية × عدد السنوات</p>
            </div>

            {/* Total Financing */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">إجمالي التمويل</h3>
                <Home size={24} />
              </div>
              <div className="text-2xl font-bold mb-1">{formatNumber(results.totalAmount)}</div>
              <p className="text-purple-100 text-sm">مبلغ التمويل + إجمالي الفائدة</p>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">ملخص التمويل</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">مبلغ التمويل الأصلي</div>
              <div className="text-xl font-bold text-gray-800">{formatNumber(loanAmount)}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">معدل الفائدة السنوي</div>
              <div className="text-xl font-bold text-gray-800">{annualRate}%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">مدة التمويل</div>
              <div className="text-xl font-bold text-gray-800">{loanTerm} سنة</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">عدد الأقساط</div>
              <div className="text-xl font-bold text-gray-800">{loanTerm * 12} قسط</div>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">شرح طريقة الحساب</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-bold mb-2">القسط الشهري (الطريقة المبسطة):</h4>
              <p className="text-sm mb-4 bg-blue-50 p-3 rounded">
                <strong>الصيغة:</strong> إجمالي التمويل ÷ عدد الأشهر<br/>
                <strong>المثال:</strong> {formatNumber(results.totalAmount)} ÷ {loanTerm * 12} = {formatNumber(results.monthlyPayment)}
              </p>
              
              <h4 className="font-bold mb-2">الفائدة السنوية:</h4>
              <p className="text-sm bg-green-50 p-3 rounded">
                <strong>الصيغة:</strong> مبلغ التمويل × نسبة الفائدة السنوية<br/>
                <strong>المثال:</strong> {formatNumber(loanAmount)} × {annualRate}% = {formatNumber(results.annualInterest)}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">إجمالي الفائدة:</h4>
              <p className="text-sm mb-4 bg-orange-50 p-3 rounded">
                <strong>الصيغة:</strong> الفائدة السنوية × عدد السنوات<br/>
                <strong>المثال:</strong> {formatNumber(results.annualInterest)} × {loanTerm} = {formatNumber(results.totalInterest)}
              </p>
              
              <h4 className="font-bold mb-2">إجمالي التمويل:</h4>
              <p className="text-sm">= مبلغ التمويل الأصلي + إجمالي الفائدة</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>هذه الحسابات تقريبية وللأغراض التوضيحية فقط. للحصول على عروض دقيقة يرجى مراجعة البنك أو المؤسسة المالية.</p>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;