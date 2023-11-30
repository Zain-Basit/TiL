import React from 'react';

function Header({ showForm, setShowForm }) {
  const appTitle = 'Today I Learned';

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="The logo for the TiL App" />
        <h1>{appTitle}</h1>
      </div>
      {' '}
      {/* // Change the value of the state variable */}
      <button
        type="button"
        data-testid="header-button"
        className="btn btn-large btn-share"
        onClick={() => setShowForm((c) => !c)}
      >
        {showForm ? 'Close' : 'Share a Fact'}
      </button>
    </header>
  );
}

export default Header;
