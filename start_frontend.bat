@echo off
REM ========================================
REM COADMO Frontend Start Script
REM ========================================
echo.
echo ========================================
echo  COADMO - Starting Frontend Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist frontend\node_modules (
    echo ERROR: Dependencies not installed!
    echo Please run install_frontend.bat first
    pause
    exit /b 1
)

echo Starting React development server...
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

cd frontend
npm start
cd ..

pause
