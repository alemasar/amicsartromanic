cd amicsartromanic/admin
npm --version
if test -d node_modules
then
  printf "${GREEN}website node_modules exists, skipping npm install${NC}\n"
else 
 printf "${GREEN}website node_modules doesn't exists, running npm install${NC}\n"
  npm install
fi &&
npm run launch