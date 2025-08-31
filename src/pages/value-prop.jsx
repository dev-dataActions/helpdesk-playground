import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function ValueProp() {
  return (
    <div className="h-full w-full bg-slate-50">
      <div className="mb-6 px-6 pt-6">
        <h1 className="text-3xl font-bold text-foreground">SaaS Value Proposition</h1>
        <p className="text-muted-foreground mt-2">
          Static diagram showing our SaaS business model and value proposition
        </p>
      </div>

      <div className="px-6 pb-6 space-y-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-lg text-xl font-bold text-center min-w-[400px]">
            Helpdesk SaaS Model
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About the Product */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-purple-200">
            <h3 className="font-bold text-lg mb-3 text-purple-800">About the Product</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Helpdesk is a customer support company that provides solutions to enhance customer interactions for online
              businesses.
              <br />
              <br />
              It helps online businesses automate, improve customer satisfaction, and drive business growth through its
              features like Real Time Chats, Ticket Management, Automated Support etc.
            </p>

            {/* Inline Workflow Loop */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Customer Support Workflow</h4>

              <div className="flex flex-col items-center space-y-4">
                {/* Workflow Steps */}
                <div className="flex flex-col lg:flex-row items-center gap-4">

                  <Link
                    href="/conversations"
                    className="bg-blue-50 p-2 rounded-xl shadow-sm border border-blue-200 min-w-[120px] text-center hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-xs font-medium text-gray-800">Agent resolves ticket</div>
                    <div className="text-xs text-gray-600">with solution & feedback</div>
                  </Link>
        
                  <ArrowRight className="text-gray-300 w-4 h-4 hidden lg:block" />
                  <ArrowDown className="text-gray-300 w-4 h-4 lg:hidden" />

                  <Link
                    href="/conversations"
                    className="bg-blue-50 p-2 rounded-xl shadow-sm border border-blue-200 min-w-[120px] text-center hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-xs font-medium text-gray-800">Talk to CS Agent</div>
                    <div className="text-xs text-gray-600">to Resolve Problem</div>
                  </Link>
                  <ArrowRight className="text-gray-300 w-4 h-4 hidden lg:block" />
                  <ArrowDown className="text-gray-300 w-4 h-4 lg:hidden" />

                  <Link
                    href="/conversations"
                    className="bg-blue-50 p-2 rounded-xl shadow-sm border border-blue-200 min-w-[120px] text-center hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-xs font-medium text-gray-800">Raise new tickets</div>
                    <div className="text-xs text-gray-600">(Customer)</div>
                  </Link>
                </div>

                {/* Loop indicator */}
                <div className="flex flex-col items-center">
                  <div className="text-xl text-gray-300">↑</div>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">Continuous cycle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Value */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-purple-200">
              <h3 className="font-bold text-lg mb-3 text-purple-800">Product Value</h3>
            </div>

            <div className="bg-purple-200 p-3 rounded-lg shadow-md border-2 border-purple-300 text-center">
              <p className="text-sm font-medium text-gray-800">
                Revenue problems
                <br />
                while using product
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-purple-200">
              <h3 className="font-bold text-center mb-3 text-purple-800">Customer Value</h3>
              <div className="space-y-2">
                <div className="bg-purple-100 p-2 rounded text-sm">
                  Customers :<br />
                  Online Businesses
                </div>
                <div className="bg-blue-100 p-2 rounded text-sm text-center font-medium">HelpDesk</div>
                <div className="bg-purple-100 p-2 rounded text-sm">
                  Users :<br />
                  Customers
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-purple-200">
              <h3 className="font-bold text-center mb-3 text-purple-800">Business Value</h3>
              <div className="bg-purple-200 p-2 rounded text-sm text-center font-medium">
                Happy
                <br />
                Customers
              </div>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
            <p className="text-sm font-medium text-gray-800 mb-4">Users using the product.</p>
            <div className="space-y-2">
              <div className="bg-gray-100 p-2 rounded text-sm text-center">
                Customer Support
                <br />
                Leader
              </div>
              <div className="bg-gray-100 p-2 rounded text-sm text-center">
                Customer Support
                <br />
                Team Lead
              </div>
              <div className="bg-gray-100 p-2 rounded text-sm text-center">Customer Support Ops</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
