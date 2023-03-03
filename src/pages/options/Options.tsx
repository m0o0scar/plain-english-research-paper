import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@pages/options/Options.css';

const KEY = 'apikey';

const Options: React.FC = () => {
  const [apiKey, setAPIKey] = useState<string | undefined>();

  const save = async () => {
    await chrome.storage.local.set({ [KEY]: apiKey });

    toast.success('😎 Options saved', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    (async () => {
      const cached = await chrome.storage.local.get([KEY]);
      setAPIKey(cached[KEY] || '');
    })();
  }, []);

  return (
    // fullscreen wrapper
    <div className="w-screen h-screen flex items-center justify-center">
      {/* container */}
      <div className="flex flex-col gap-2 w-full max-w-lg">
        {/* OpenAI API Key */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">OpenAI API Key</span>
          </label>
          <input
            type="text"
            disabled={apiKey === undefined}
            className="input input-bordered w-full"
            value={apiKey}
            onChange={(e) => setAPIKey(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button className="btn" disabled={!apiKey} onClick={save}>
            Save
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Options;
