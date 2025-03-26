import React, { useState } from 'react';

const BuyPages = () => {
  const [pagesToBuy, setPagesToBuy] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('BKPay');

  const handlePurchase = () => {
    // Implement purchase logic
    console.log(`Purchasing ${pagesToBuy} pages using ${paymentMethod}`);
  };

  return (
    <div className="bg-white p-5 rounded shadow-sm mb-4">
      <p>Số dư trang in hiện tại: A4: 100 trang, A3: 50 trang</p>
      <div className="mb-3">
        <label className="form-label">Số lượng trang muốn mua (A4)</label>
        <input type="number" className="form-control" value={pagesToBuy} onChange={(e) => setPagesToBuy(e.target.value)} />
      </div>
      <div className="mb-3">
        <p>Tương đương số trang A3: {Math.floor(pagesToBuy / 2)}</p>
      </div>
      <div className="mb-3">
        <p>Tổng chi phí: {pagesToBuy * 5000} VND</p>
      </div>
      <div className="mb-3">
        <label className="form-label">Phương thức thanh toán</label>
        <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="BKPay">BKPay</option>
        </select>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handlePurchase}>Thanh toán</button>
        <button className="btn btn-danger">Hủy</button>
      </div>
    </div>
  );
};

export default BuyPages;