import React from "react";

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Help & Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team for assistance.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="group">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  1. How do I place an order?
                </h3>
                <p className="mt-2 text-gray-600">
                  Simply browse our products, add items to your cart, and proceed to checkout. 
                  You'll need to provide shipping information and payment details to complete your order.
                </p>
              </div>

              <div className="group">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  2. What payment methods do you accept?
                </h3>
                <p className="mt-2 text-gray-600">
                  We accept all major credit/debit cards, UPI payments, Net Banking, and select digital wallets. 
                  All payments are processed through secure, encrypted channels.
                </p>
              </div>

              <div className="group">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  3. How can I track my order?
                </h3>
                <p className="mt-2 text-gray-600">
                  Once your order ships, you'll receive an email with a tracking number and link. 
                  You can also track your order by logging into your account and viewing order history.
                </p>
              </div>

              <div className="group">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  4. Can I return or exchange a product?
                </h3>
                <p className="mt-2 text-gray-600">
                  Yes, we offer a 7-day hassle-free return policy for most items. 
                  Items must be unused, in original packaging with all tags attached. 
                  Please visit our Returns Center for detailed instructions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
              Contact Support
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Can't find what you're looking for? Our support team is available to help you.
              </p>
              
              <div className="flex items-start mt-4">
                <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                  <p className="mt-1 text-gray-600">
                    Typically responds within 2 hours during business hours
                  </p>
                  <a 
                    href="mailto:support@clickcart.com" 
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    support@clickcart.com
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="flex items-start mt-6">
                <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                  <p className="mt-1 text-gray-600">
                    Available Monday to Friday, 9AM to 6PM
                  </p>
                  <a 
                    href="tel:+911234567890" 
                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    +91 123-456-7890
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                <p className="mt-1 text-gray-600">
                  For instant help, try our 24/7 live chat support
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;