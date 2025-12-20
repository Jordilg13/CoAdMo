@echo off
REM ========================================
REM COADMO Frontend Installation Script
REM ========================================
echo.
echo ========================================
echo  COADMO - Frontend Installation
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18 LTS or higher from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Node.js detected:
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed
    echo Please reinstall Node.js
    pause
    exit /b 1
)

echo [2/3] npm detected:
npm --version
echo.

echo [3/3] Installing frontend dependencies...
echo This may take several minutes...
echo.
cd frontend
npm install
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

cd ..
echo.
echo ========================================
echo  Frontend installation completed!
echo ========================================
echo.
echo Next steps:
echo - Run start_frontend.bat to start the development server
echo.
pause
