
import { useState } from "react";

function Modules() {
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      number: "01",
      title: "Vendor Management",
      description:
        "Centralize vendor profiles, verification, documents, ratings, and approval status in one place.",
      icon: "◈",
    },
    {
      number: "02",
      title: "Purchase Orders",
      description:
        "Create, track, approve, and manage purchase orders with complete operational visibility.",
      icon: "▣",
    },
    {
      number: "03",
      title: "Invoice Management",
      description:
        "Track invoices, payment status, approvals, and financial records without manual follow-ups.",
      icon: "₹",
    },
    {
      number: "04",
      title: "Approval Workflow",
      description:
        "Build structured approval flows that keep procurement decisions fast, transparent, and controlled.",
      icon: "✓",
    },
    {
      number: "05",
      title: "Analytics & Insights",
      description:
        "Turn procurement data into actionable insights with real-time performance and spending analytics.",
      icon: "◒",
    },
    {
      number: "06",
      title: "Notifications",
      description:
        "Keep teams updated with automated alerts for approvals, vendor changes, invoices, and critical actions.",
      icon: "⌁",
    },
  ];

  return (
    <section
      id="modules"
      className="relative max-w-7xl mx-auto px-6 py-28"
    >
      {/* Section Heading */}
      <div className="relative z-20 text-center mb-14">

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          One Platform
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-blue-600">
          Everything Your{" "}
          <span className="text-blue-600">
            Procurement Team Needs
          </span>
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          Powerful modules designed to connect every stage of your vendor and
          procurement operations.
        </p>

      </div>

      {/* Modules */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {modules.map((module) => (
          <div
            key={module.number}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/65 backdrop-blur-xl p-7 shadow-md shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:bg-white/90 hover:shadow-xl hover:shadow-blue-200/40"
          >

            {/* Glow */}
            <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl transition-all duration-500 group-hover:bg-blue-400/25" />

            {/* Icon + Number */}
            <div className="relative flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-xl text-blue-600 transition-all duration-500 group-hover:scale-110">
                {module.icon}
              </div>

              <span className="text-xs font-bold tracking-wider text-slate-300 group-hover:text-blue-400 transition-colors">
                {module.number}
              </span>

            </div>

            {/* Title */}
            <h3 className="relative mt-7 text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              {module.title}
            </h3>

            {/* Description */}
            <p className="relative mt-3 text-sm text-slate-500 leading-relaxed">
              {module.description}
            </p>

            {/* Learn More */}
            <button
              type="button"
              onClick={() => setSelectedModule(module)}
              className="relative mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors"
            >
              Learn more

              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

          </div>
        ))}

      </div>

      {/* Module Modal */}
      {selectedModule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-6"
          onClick={() => setSelectedModule(null)}
        >

          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedModule(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-2xl text-blue-600">
              {selectedModule.icon}
            </div>

            {/* Module Number */}
            <p className="mt-6 text-sm font-bold tracking-widest text-blue-600">
              MODULE {selectedModule.number}
            </p>

            {/* Title */}
            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {selectedModule.title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-slate-600 leading-relaxed">
              {selectedModule.description}
            </p>

            {/* Information */}
            <div className="mt-7 rounded-2xl bg-slate-50 border border-slate-100 p-5">

              <p className="text-sm font-semibold text-slate-800">
                Why use this module?
              </p>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Manage this part of your procurement workflow efficiently
                with ProcureFlow's centralized enterprise platform.
              </p>

            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedModule(null)}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 text-white font-semibold hover:bg-blue-700 transition"
            >
              Got it
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Modules;