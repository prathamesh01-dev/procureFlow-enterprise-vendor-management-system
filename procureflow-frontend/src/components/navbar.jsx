import { Link } from 'react-router-dom';

function Navbar({ onContactClick }) {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
<h1 className="text-2xl font-bold text-slate-900">
  ProcureFlow 
</h1>
        <div className="flex items-center gap-6 text-slate-600 font-medium">
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#modules" className="hover:text-slate-900 transition">Modules</a>
          <a href="#pricing" className="hover:text-slate-900 transition">Pricing</a>

          <button
            onClick={onContactClick}
            className="hover:text-slate-900 transition"
          >
            Contact
          </button>

          <Link
            to="/login"
            className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;