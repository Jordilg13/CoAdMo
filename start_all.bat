@echo off
REM ========================================
REM COADMO Start All Services Script
REM ========================================
echo.
echo ========================================
echo  COADMO - Starting All Services
echo ========================================
echo.

echo This will start both Backend and Frontend servers in separate windows
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause >nul

REM Start Backend in new window
start "COADMO Backend Server" cmd /k "cd /d %~dp0 && start_backend.bat"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend in new window
start "COADMO Frontend Server" cmd /k "cd /d %~dp0 && start_frontend.bat"

echo.
echo ========================================
echo  Both servers are starting...
echo ========================================
echo.
echo Check the new windows for server output
echo Close those windows to stop the servers
echo.
pause
