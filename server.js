// Root entrypoint wrapper for Vercel and local runs
const express = require('express');
const app = require('./api/index.js');

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LOCAL] HSE Safety Server active on http://localhost:${PORT}`);
  });
}

module.exports = app;
