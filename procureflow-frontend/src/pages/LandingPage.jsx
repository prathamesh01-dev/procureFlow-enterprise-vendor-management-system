import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Modules from '../components/Modules';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function LandingPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  return (
<div className='min-h-screen premium-page'>
       <Navbar onContactClick={() => setContactOpen(true)} />

      <section id='hero'>
        <Hero />
      </section>

      

      <section id='modules'>
  <Modules />
</section>

      <section id='pricing' className='bg-white py-24'>
  <div className='max-w-7xl mx-auto px-6'>

    <div className='text-center mb-16'>
      <h2 className='text-5xl font-bold text-slate-900'>
        Simple Enterprise Pricing
      </h2>

      <p className='mt-4 text-xl text-slate-600'>
        Choose a plan that fits your procurement operations.
      </p>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

      <div className='group border border-slate-200 rounded-3xl p-8 bg-slate-50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500 hover:bg-white'>
        <h3 className='text-2xl font-bold text-slate-900'>
          Starter
        </h3>

        <p className='mt-2 text-slate-600'>
          For small teams and startups
        </p>

        <div className='mt-6'>
          <span className='text-5xl font-bold'>
            ₹999
          </span>

          <span className='text-slate-500'>
            /month
          </span>
        </div>

        <ul className='mt-8 space-y-3 text-slate-700'>
          <li>Up to 25 vendors</li>
          <li>Purchase orders</li>
          <li>Email notifications</li>
          <li>Basic reports</li>
        </ul>

        <Link to='/dashboard'>
  <button className='mt-10 w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300'>
    Register
  </button>
</Link>
      </div>

<div className='group border border-slate-200 rounded-3xl p-8 bg-slate-50 text-slate-900 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-600 hover:bg-blue-600 hover:text-white'>
        <div className='inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4'>
          Most Popular
        </div>

        <h3 className='text-2xl font-bold'>
          Professional
        </h3>

        <p className='mt-2 text-blue-100'>
          For growing businesses
        </p>

        <div className='mt-6'>
          <span className='text-5xl font-bold'>
            ₹2,999
          </span>

          <span className='text-blue-100'>
            /month
          </span>
        </div>

        <ul className='mt-8 space-y-3'>
          <li>Unlimited vendors</li>
          <li>Advanced approval workflow</li>
          <li>Invoices & payments</li>
          <li>Analytics dashboard</li>
          <li>Email automation</li>
        </ul>

        <Link to='/dashboard'>
          <button className='mt-10 w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300'>
               Start Free Trial
          </button>
        </Link>
      </div>

      <div className='group border border-slate-200 rounded-3xl p-8 bg-slate-50 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500 hover:bg-white'>
        <h3 className='text-2xl font-bold text-slate-900'>
          Enterprise
        </h3>

        <p className='mt-2 text-slate-600'>
          For large organizations
        </p>

        <div className='mt-6'>
          <span className='text-5xl font-bold'>
            Custom
          </span>
        </div>

        <ul className='mt-8 space-y-3 text-slate-700'>
          <li>Custom integrations</li>
          <li>Role-based access</li>
          <li>Dedicated support</li>
          <li>Compliance reports</li>
          <li>On-premise deployment</li>
        </ul>

       <Link to='/dashboard'>
  <button className='mt-10 w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300'>
    Contact Sales
  </button>
</Link>
      </div>

    </div>

  </div>
</section>

      <section id='contact'>
        <Footer />
      </section>
            {contactOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setContactOpen(false)}
        >
          <div
  className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-8 overflow-y-auto animate-[slideIn_0.35s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Get in touch
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  Let's Talk 👋
                </h2>

                <p className="text-slate-500 mt-2">
                  Have a question? We'd love to hear from you.
                </p>
              </div>

              <button
                onClick={() => setContactOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xl transition"
              >
                ✕
              </button>
            </div>

           {!contactSent && ( <form
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      message: form.message.value,
    };

    try {
      const response = await fetch('https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
  form.reset();
  setContactSent(true);
} else {
        alert(data.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('CONTACT FORM ERROR:', error);
      alert('Unable to send message. Please try again.');
    }
  }}
  className="space-y-5"
>
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      required
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      Work Email
    </label>

    <input
      type="email"
      name="email"
      placeholder="you@company.com"
      required
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      Company Name
    </label>

    <input
      type="text"
      name="company"
      placeholder="Your company"
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      How can we help?
    </label>

    <textarea
      name="message"
      rows="5"
      placeholder="Tell us about your requirement..."
      required
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300"
  >
    Send Message →
  </button>
</form>
)}
{contactSent && (
  <div className="flex flex-col items-center justify-center text-center py-16">
    
    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
      <span className="text-4xl">✓</span>
    </div>

    <h3 className="text-3xl font-bold text-slate-900">
      Message Sent!
    </h3>

    <p className="text-slate-500 mt-3 max-w-sm">
      Thanks for reaching out. Our team will get back to you shortly.
    </p>

    <button
      onClick={() => {
        setContactSent(false);
        setContactOpen(false);
      }}
      className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
    >
      Done
    </button>

  </div>
)}

            <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-500">
                Our team usually responds within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;