import React, { useState, useEffect } from 'react';
import { Tag, Clock, Star } from 'lucide-react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('https://coupon-swap-backend.onrender.com/api/coupon');
        const currentDate = new Date();

        const formattedCoupons = response.data.data
          .map((coupon) => ({
            id: coupon._id,
            platform: coupon.platform,
            value: coupon.valueRs || coupon.valuePercent * 10,
            price: coupon.sellingPrice,
            expires: new Date(coupon.expiryDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }),
            expiryDateRaw: new Date(coupon.expiryDate),
            code: coupon.couponCode,
            description: coupon.description || 'No description available',
            seller: coupon.sellerName,
            rating: 4.5 + Math.random() * 0.4,
            discount: calculateDiscount(coupon.valueRs, coupon.valuePercent, coupon.sellingPrice),
            createdAt: new Date(coupon.createdAt),
          }))
          .filter((coupon) => coupon.expiryDateRaw >= currentDate)
          .sort((a, b) => b.createdAt - a.createdAt); // नवीन ते जुनं सॉर्ट

        setCoupons(formattedCoupons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const calculateDiscount = (valueRs, valuePercent, sellingPrice) => {
    if (valueRs) {
      return Math.round((1 - sellingPrice / valueRs) * 100);
    } else if (valuePercent) {
      return valuePercent;
    }
    return 0;
  };

  const isNewCoupon = (createdAt) => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return new Date(createdAt) > oneDayAgo;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-2xl font-bold text-orange-600">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C50,120 80,20 100,100 L100,0 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">Coupon Notifications</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Stay updated with the latest coupons added to our marketplace
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Latest Coupons ({coupons.length} available)
        </h2>

        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all duration-300 border border-gray-100 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {isNewCoupon(coupon.createdAt) && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
              )}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
                  <Tag size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-md text-gray-900">{coupon.platform}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> Expires: {coupon.expires}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="text-sm">
                  <span className="text-gray-600">Value: </span>
                  <span className="font-bold text-gray-900">₹{coupon.value}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Price: </span>
                  <span className="font-bold text-orange-600">₹{coupon.price}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Discount: </span>
                  <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                    {coupon.discount}% OFF
                  </span>
                </div>
                <div className="text-sm flex items-center gap-1">
                  <span className="text-gray-600">Seller: </span>
                  <span className="text-gray-700">{coupon.seller}</span>
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span className="text-gray-600">{coupon.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;