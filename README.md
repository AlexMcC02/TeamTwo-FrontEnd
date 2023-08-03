COMMON FRONTEND BUGS AND FIXES:
------------------------------------------------------------
Prerequisites:
"npm install" 
^for dependencies

if testing a branch not in main ensure you are on both the right frontend and backend branches.

if testing main ensure you are in main branch for both frontend and backend
------------------------------------------------------------
Swagger working but localhost is not:

Environment Variables:

CHECK API URL COMMAND:
echo $UI_URL

SET API URL COMMAND:
export UI_URL=http://localhost:8080
------------------------------------------------------------
Unit Tests:

npm run test

UI Tests:

export UI_TEST_URL=http://localhost:3000/job_roles && npm run test-ui

Accessibility Tests:

npm run test-accessibility

^If you get local issuer certs error/ Chromium error

echo $NODE_EXTRA_CA_CERTS 

if empty run:

export NODE_EXTRA_CA_CERTS=/path/to/filename>/kainos-chain.pem  
------------------------------------------------------------
