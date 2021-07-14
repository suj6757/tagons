import React, { useEffect } from 'react';

const UserLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <main>
        <div className="container login-wrap">{children}</div>
      </main>
    </>
  );
};

export default UserLayout;
