import React from 'react';
import 'bulma/css/bulma.css'

const Footer = () =>
(<footer className="footer">
  <div className="content has-text-centered">
    <p>
      <strong>Copyleft</strong> | {new Date().getFullYear()}
    </p>
  </div>
</footer>);

export default Footer;
