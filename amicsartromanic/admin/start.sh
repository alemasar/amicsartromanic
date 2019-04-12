GREEN='\033[0;32m'
NC='\033[0m'

printf "${GREEN}Installing website dependencies${NC}\n"
#cd amicsartromanic/admin
npm --version
if test -d node_modules
then
  printf "${GREEN}website node_modules exists, skipping npm install${NC}\n"
else 
 printf "${GREEN}website node_modules doesn't exists, running npm install${NC}\n"
  npm install
fi&&
npm run buildDev