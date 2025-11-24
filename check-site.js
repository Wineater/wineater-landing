// Simple script to check if the site is working
const http = require('http');

function checkSite(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers:`, res.headers);
      
      if (res.statusCode === 200) {
        console.log('✅ Site is working correctly!');
        resolve(true);
      } else {
        console.log('❌ Site has issues');
        resolve(false);
      }
    });
    
    req.on('error', (err) => {
      console.log('❌ Error:', err.message);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Request timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Check localhost first
checkSite('http://localhost:3000')
  .then(() => {
    console.log('\n🔍 Checking wineater.com...');
    return checkSite('http://wineater.com');
  })
  .catch((err) => {
    console.log('❌ Error checking site:', err.message);
  });
