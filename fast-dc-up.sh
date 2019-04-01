GREEN='\033[0;32m'
NC='\033[0m'

printf "${GREEN}Installing website dependencies${NC}\n"
cd amicsartromanic/app
npm --version
if test -d node_modules
then
  printf "${GREEN}website node_modules exists, skipping npm install${NC}\n"
else 
 printf "${GREEN}website node_modules doesn't exists, running npm install${NC}\n"
  npm install
fi && 

printf "${GREEN}transpiling website${NC}\n"
npm run launch
#npm run clean-server
#npm run build-server
# Dont build webpack
cd ../

echo " ___________________________________________"
echo "< Welcome to AMICS ART ROMANIC DE SABADELL >"
echo " -------------------------------------------"
echo "        \   ^__^"
echo "         \  (oo)\_______"
echo "            (__)\       )\/\\"
echo "                ||----w |"
echo "                ||     ||"

docker-compose up
