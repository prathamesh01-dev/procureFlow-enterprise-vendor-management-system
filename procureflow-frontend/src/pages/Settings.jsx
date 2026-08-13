function Settings() {
  return (
    <div className='min-h-screen bg-slate-100 p-8'>

      <h1 className='text-3xl font-bold text-slate-900 mb-8'>
        Settings
      </h1>

      <div className='bg-white rounded-2xl p-8 shadow-sm max-w-2xl'>

        <div className='mb-6'>
          <label className='block text-slate-600 mb-2'>
            Company Name
          </label>

          <input
            defaultValue='ProcureFlow Technologies'
            className='w-full border border-slate-300 rounded-xl px-4 py-3'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-slate-600 mb-2'>
            Procurement Email
          </label>

          <input
            defaultValue='procurement@procureflow.com'
            className='w-full border border-slate-300 rounded-xl px-4 py-3'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-slate-600 mb-2'>
            Currency
          </label>

          <select className='w-full border border-slate-300 rounded-xl px-4 py-3'>
            <option>Indian Rupee (INR)</option>
          </select>
        </div>

        <button className='bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition'>
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;