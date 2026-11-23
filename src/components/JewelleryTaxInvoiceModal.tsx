import React, { useEffect } from 'react';
import { Order } from '../types';
import { Printer, X } from 'lucide-react';

interface JewelleryTaxInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

// Helper to convert Indian Rupees numbers to words
function numberToWordsINR(amount: number): string {
  if (amount === 0) return 'Zero Rupees Only';

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n: number): string {
    if (n === 0) return '';
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit > 0 ? ' ' + units[unit] : '');
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let str = '';
    if (hundred > 0) {
      str += units[hundred] + ' Hundred';
      if (rest > 0) str += ' and ';
    }
    if (rest > 0) {
      str += convertTwoDigits(rest);
    }
    return str;
  }

  let crore = Math.floor(amount / 10000000);
  let rem = amount % 10000000;
  let lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  let thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  let hundred = rem;

  let words = '';
  if (crore > 0) words += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertTwoDigits(thousand) + ' Thousand ';
  if (hundred > 0) words += convertThreeDigits(hundred);

  return 'Rupees ' + words.trim() + ' Only';
}

export const JewelleryTaxInvoiceModal: React.FC<JewelleryTaxInvoiceModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  // Lock background scroll when bill popup is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `PCL/2026-27/INV-${order.id.replace('PCL-2026-', '')}`;
  const cgstAmount = Math.round(order.gstAmount / 2);
  const sgstAmount = order.gstAmount - cgstAmount;
  const totalInWords = numberToWordsINR(order.total);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center items-start p-2 sm:p-6 md:p-8 print:p-0 print:bg-white print:static"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      
      {/* Invoice Container */}
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-xl shadow-2xl overflow-hidden my-4 sm:my-8 print:my-0 print:shadow-none print:rounded-none print:w-full print:max-w-none">
        
        {/* Screen Action Bar (Hidden in Print) */}
        <div className="bg-[#1A1A1A] text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#E0C79B]"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#E0C79B]">
              Official GST Jewellery Tax Invoice
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#E0C79B] text-black hover:bg-white text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bill / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet (A4 Proportionate) */}
        <div className="p-6 sm:p-10 font-sans text-xs print:p-6 print:text-[11px] leading-tight">
          
          {/* Header 1: Registered Company Information */}
          <div className="border-b-2 border-neutral-900 pb-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase text-neutral-900">
                  PANCHALOHA
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-1">
                  Fine Jewellery Private Limited
                </p>
                <p className="text-neutral-600 font-light leading-normal max-w-md text-[11px]">
                  Registered Office: Villa 14, Lavelle Road Crescent, Shantala Nagar,<br />
                  Bengaluru, Karnataka – 560001, India<br />
                  CIN: U36911KA2026PTC198421 | Phone: +91 80 4912 8800<br />
                  Email: accounts@panchalohajewels.com | Web: www.panchaloha.com
                </p>
              </div>

              {/* Tax & Hallmark Accreditation Badges */}
              <div className="text-right sm:text-right border-l sm:border-l sm:pl-4 border-neutral-200 text-[11px] text-neutral-700 space-y-0.5">
                <div className="bg-[#FAF9F5] px-2.5 py-1 border border-neutral-200 rounded font-semibold text-neutral-900 mb-1 inline-block">
                  GSTIN: 29AAACP9821K1Z5
                </div>
                <div>PAN: <span className="font-mono font-medium">AAACP9821K</span></div>
                <div>State: <span className="font-medium">Karnataka (Code: 29)</span></div>
                <div>BIS Hallmark Lic: <span className="font-mono font-medium">HM/C-62819401</span></div>
                <div>IGI Jewellery Lab Lic: <span className="font-mono font-medium">IGI-BLR-9842</span></div>
              </div>
            </div>
          </div>

          {/* Header 2: Tax Invoice Title & Meta */}
          <div className="bg-neutral-100 py-1.5 px-3 text-center uppercase tracking-[0.25em] font-bold text-neutral-900 text-xs border border-neutral-300 mb-4">
            TAX INVOICE / BILL OF SUPPLY
            <span className="block text-[9px] font-normal tracking-normal text-neutral-600 lowercase">
              (Issued under Section 31 of the Central Goods and Services Tax Act, 2017)
            </span>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-neutral-300 p-3 mb-4 bg-[#FAF9F6] text-[11px]">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Invoice Number:</span>
              <span className="font-mono font-bold text-neutral-900">{invoiceNumber}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Invoice Date:</span>
              <span className="font-medium text-neutral-900">{order.date}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Order Reference:</span>
              <span className="font-mono font-medium text-neutral-800">{order.id}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Place of Supply:</span>
              <span className="font-medium text-neutral-900">{order.customer.state} ({order.customer.state.toLowerCase() === 'karnataka' ? 'Code 29' : 'Inter-State'})</span>
            </div>
          </div>

          {/* Two-Column Buyer & Delivery Particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 border border-neutral-300 p-3.5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                Billed To (Customer Details):
              </span>
              <div className="font-bold text-sm text-neutral-900">{order.customer.name}</div>
              <div className="text-neutral-600 text-[11px] leading-tight mt-1">
                {order.customer.address}<br />
                {order.customer.city}, {order.customer.state} – {order.customer.pincode}<br />
                Phone: +91 {order.customer.phone}<br />
                Email: {order.customer.email}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                Dispatched Via (Armored Courier):
              </span>
              <div className="font-semibold text-neutral-900">Sequel Armored Logistics / Blue Dart Apex</div>
              <div className="text-neutral-600 text-[11px] leading-tight mt-1">
                Consignment Tracking: <span className="font-mono font-bold text-neutral-900">{order.trackingNumber}</span><br />
                Insurance Policy: 100% Full Transit Cover (Policy: ORIENT-JWL-9918)<br />
                Payment Terms: <span className="font-medium text-emerald-800">{order.paymentMethod}</span><br />
                Reverse Charge Applicable: <span className="font-medium">NO</span>
              </div>
            </div>
          </div>

          {/* Itemized Particulars Table (Official Tax Format) */}
          <div className="border border-neutral-300 mb-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-neutral-100 text-neutral-800 font-semibold border-b border-neutral-300 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2 px-2 border-r border-neutral-300 text-center w-8">#</th>
                  <th className="py-2 px-3 border-r border-neutral-300">Description of Jewellery Goods</th>
                  <th className="py-2 px-2 border-r border-neutral-300 text-center w-14">HSN</th>
                  <th className="py-2 px-2 border-r border-neutral-300 text-center">Purity</th>
                  <th className="py-2 px-2 border-r border-neutral-300 text-center">Qty</th>
                  <th className="py-2 px-2.5 border-r border-neutral-300 text-right">Taxable Val (₹)</th>
                  <th className="py-2 px-2 border-r border-neutral-300 text-right">CGST (1.5%)</th>
                  <th className="py-2 px-2 border-r border-neutral-300 text-right">SGST (1.5%)</th>
                  <th className="py-2 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => {
                  const lineTotal = item.product.price * item.quantity;
                  const itemGstRate = item.product.gstRate || 3;
                  const itemBase = Math.round(lineTotal / (1 + itemGstRate / 100));
                  const itemGst = lineTotal - itemBase;
                  const itemCgst = Math.round(itemGst / 2);
                  const itemSgst = itemGst - itemCgst;

                  // Extract weight from details if present
                  const weightDetail = item.product.details.find(d => d.toLowerCase().includes('weight'));

                  return (
                    <tr key={idx} className="hover:bg-neutral-50/50">
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-center">{idx + 1}</td>
                      <td className="py-2.5 px-3 border-r border-neutral-200">
                        <div className="font-semibold text-neutral-900">{item.product.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          SKU: {item.product.id.slice(0, 16).toUpperCase()}
                          {item.selectedMaterial && ` • ${item.selectedMaterial}`}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                          {weightDetail && ` • ${weightDetail}`}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-center font-mono text-[10px]">7113</td>
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-center font-mono text-[10px]">22KT 916</td>
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-center font-semibold">{item.quantity}</td>
                      <td className="py-2.5 px-2.5 border-r border-neutral-200 text-right font-mono">
                        ₹{itemBase.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-right font-mono text-[10px]">
                        ₹{itemCgst.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-2 border-r border-neutral-200 text-right font-mono text-[10px]">
                        ₹{itemSgst.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-neutral-900">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation & Tax Slip Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 items-start">
            
            {/* Amount In Words & HUID Hallmarking Box */}
            <div className="sm:col-span-7 border border-neutral-300 p-3 bg-[#FAF9F6] space-y-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                  Total Invoice Amount in Words:
                </span>
                <span className="font-serif italic font-semibold text-neutral-900 text-xs block mt-0.5">
                  {totalInWords}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[10px] text-neutral-600 leading-tight">
                <span className="font-bold text-neutral-900 block mb-0.5">BIS Hallmarking & Purity Certification:</span>
                This piece is assayed and hallmarked under BIS license HM/C-62819401 with unique laser-inscribed HUID numbers. Purity of gold is 91.6% (22 Karat standard).
              </div>
            </div>

            {/* Numerical Totals Table */}
            <div className="sm:col-span-5 border border-neutral-300 p-3 text-[11px] space-y-1.5 font-mono">
              <div className="flex justify-between text-neutral-600">
                <span className="font-sans">Total Taxable Value:</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span className="font-sans">CGST (1.5%):</span>
                <span>₹{cgstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span className="font-sans">SGST (1.5%):</span>
                <span>₹{sgstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span className="font-sans">Total GST (3.0%):</span>
                <span className="font-semibold text-neutral-900">₹{order.gstAmount.toLocaleString('en-IN')}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span className="font-sans">Privilege Discount:</span>
                  <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span className="font-sans">Insured Armored Freight:</span>
                <span className="text-neutral-900 font-medium">₹0.00 (Free)</span>
              </div>

              <div className="flex justify-between pt-2 border-t-2 border-neutral-900 text-sm font-bold text-neutral-900">
                <span className="font-sans uppercase">Grand Total (₹):</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Terms & Conditions & Signatory Box */}
          <div className="border border-neutral-300 p-3.5 mb-2 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            
            <div className="sm:col-span-8 text-[10px] text-neutral-500 leading-tight space-y-1">
              <span className="font-bold uppercase tracking-wider text-neutral-800 block mb-0.5">Terms & Conditions of Sale:</span>
              <p>1. All fine jewellery pieces sold are certified 100% BIS Hallmarked and comply with Bureau of Indian Standards HUID norms.</p>
              <p>2. Lifetime exchange and buyback available at prevailing market bullion rates at any authorized Panchaloha atelier.</p>
              <p>3. Goods once sold can be returned within 15 calendar days in pristine original condition with hallmark intact.</p>
              <p>4. Subject to Bengaluru Jurisdiction only. This is a computer-generated tax invoice.</p>
            </div>

            <div className="sm:col-span-4 text-center border-t sm:border-t-0 sm:border-l border-neutral-200 pt-3 sm:pt-0 sm:pl-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-3 font-semibold">
                For PANCHALOHA FINE JEWELLERY PVT LTD
              </span>
              
              {/* Seal & Signature Graphic */}
              <div className="inline-block border-2 border-neutral-800 rounded-full px-3 py-1 font-serif text-[10px] text-neutral-800 rotate-[-4deg] mb-2 uppercase font-bold tracking-wider">
                Authorized Signatory
              </div>

              <span className="block text-[9px] text-neutral-400 uppercase font-mono">
                Tax Invoice Generated Electronically
              </span>
            </div>

          </div>

          {/* Bottom Footer Note */}
          <div className="text-center text-[9px] text-neutral-400 uppercase tracking-widest pt-2">
            Panchaloha Fine Jewellery • Lavelle Road • Bengaluru • Assayed & Insured
          </div>

        </div>

      </div>
    </div>
  );
};
