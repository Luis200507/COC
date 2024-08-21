@echo off
echo Installing Node.js...

REM Baixa e instala Node.js (assumindo que o Node.js é baixado e instalado via um instalador .msi)
curl -o nodejs.msi https://nodejs.org/dist/v20.16.0/node-v20.16.0-x64.msi
start /wait msiexec /i nodejs.msi /passive /norestart

set "PATH=%PATH%;C:\Program Files\nodejs\"

echo Node.js installed. Version:
node -v

del nodejs.msi

npm i -g puppeteer

call npx puppeteer browsers install chrome

echo Setup concluído.

start "" start.exe
