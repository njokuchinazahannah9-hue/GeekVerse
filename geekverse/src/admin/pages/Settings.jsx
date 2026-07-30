function Settings() {

  return (

    <div className="settings-page">

      <h1>Settings</h1>

      <p>
        Configure GeekVerse Admin.
      </p>

      <div className="settings-card">

        <div className="setting-item">

          <label>Store Name</label>

          <input
            defaultValue="GeekVerse"
          />

        </div>

        <div className="setting-item">

          <label>Support Email</label>

          <input
            defaultValue="support@geekverse.com"
          />

        </div>

        <div className="setting-item">

          <label>Currency</label>

          <select>

            <option>USD ($)</option>

            <option>NGN (₦)</option>

          </select>

        </div>

        <button className="save-btn">

          Save Changes

        </button>

      </div>

    </div>

  );

}

export default Settings;