function Features() {
  const features = [
    {
      number: "01",
      title: "Vendor Onboarding",
      description:
        "Register, verify, and manage vendor profiles with secure document handling and approval workflows.",
      icon: "◈",
    },
    {
      number: "02",
      title: "Procurement Automation",
      description:
        "Automate quotation requests, purchase orders, approvals, and invoice processing across departments.",
      icon: "⚡",
    },
    {
      number: "03",
      title: "Analytics Dashboard",
      description:
        "Monitor procurement spending, vendor performance, approval delays, and operational efficiency in real time.",
      icon: "◉",
    },
  ];

  return (
    <section
      id="features"
      className="relative max-w-7xl mx-auto px-6 pb-28 pt-16"
    >
      {/* Soft ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Section heading */}
      <div className="relative text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          Powerful Capabilities
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
          Everything You Need to
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {" "}Procure Smarter
          </span>
        </h2>

        <p className="mt-5 max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
          A unified platform designed to simplify vendor management,
          procurement operations, and business intelligence.
        </p>
      </div>

      {/* Feature cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7">
        {features.map((feature) => (
          <div
            key={feature.number}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-200/50"
          >
            {/* Cyan ambient glow */}
            <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/25" />

            {/* Blue glow */}
            <div className="absolute -bottom-24 -left-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />

            {/* Top row */}
            <div className="relative flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-2xl text-blue-600 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-200/60">
                {feature.icon}
              </div>

              <span className="text-sm font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                {feature.number}
              </span>
            </div>

            {/* Content */}
            <div className="relative mt-8">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Animated line */}
            <div className="relative mt-8 h-px w-full bg-slate-200 overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 group-hover:w-full" />
            </div>

            {/* Bottom action */}
            <div className="relative mt-5 text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
              Explore capability
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;