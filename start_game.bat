@echo off
echo Starting local server on http://localhost:8080 and launching the game...
pushd %~dp0
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo Node.js is required to run the local server. Please install Node.js from https://nodejs.org/
  pause
  exit /b 1
)
start cmd /c "node server.js"
timeout /t 1 >nul
start http://localhost:8080/
popd