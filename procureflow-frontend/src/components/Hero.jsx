import { Link } from 'react-router-dom';
import { useState } from 'react';

function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-32 text-center overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Small Badge */}
      <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        Enterprise Vendor Management Platform
      </div>

      {/* Main Heading */}
      <h1 className="relative text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
        Smarter Vendor & Procurement
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          Operations for Modern Enterprises
        </span>
      </h1>

      {/* Description */}
      <p className="relative mt-7 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
        Centralize vendors, automate procurement workflows, track purchase
        orders, manage invoices, and gain real-time business insights from a
        single enterprise platform.
      </p>

      {/* CTA Buttons */}
      <div className="relative mt-10 flex flex-col sm:flex-row justify-center gap-4">

        {/* GET STARTED - NOW OPENS LOGIN PAGE */}
        <Link to="/login">
          <button className="group relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300">
            Get Started
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </Link>

        {/* WATCH DEMO */}
        <button
          onClick={() => setDemoOpen(true)}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
        >
          ▶ Watch Demo
        </button>

      </div>

      {/* Trust indicators */}
      <div className="relative mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
        <span>✓ Vendor Management</span>
        <span>✓ Automated Workflows</span>
        <span>✓ Real-time Analytics</span>
        <span>✓ Enterprise Ready</span>
      </div>

      {demoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-6"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  PROCUREFLOW DEMO
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  See ProcureFlow in Action
                </h2>
              </div>

              <button
                onClick={() => setDemoOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Demo Area */}
            <div className="p-6">

              <div className="relative h-80 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center overflow-hidden">

                <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

                <div className="relative text-center text-white">

                  <div className="mx-auto w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/30">
                    <span className="text-3xl ml-1">▶</span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    ProcureFlow Enterprise Dashboard
                  </h3>

                  <p className="mt-2 text-slate-300">
                    Manage vendors, purchase orders, invoices and approvals
                    from one centralized platform.
                  </p>

                </div>

              </div>

              <button
                onClick={() => setDemoOpen(false)}
                className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 text-white font-semibold hover:bg-blue-700 transition"
              >
                Explore ProcureFlow
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default Hero;