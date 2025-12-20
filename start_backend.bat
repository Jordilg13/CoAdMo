@echo off
REM ========================================
REM COADMO Backend Start Script
REM ========================================
echo.
echo ========================================
echo  COADMO - Starting Backend Server
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo ERROR: .env file not found!
    echo Please copy .env.example to .env and configure it
    echo See SETUP.md for details
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist backend\venv (
    echo WARNING: Virtual environment not detected
    echo Recommended: Create a virtual environment first
    echo.
)

echo Starting Django development server...
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

cd backend
python manage.py runserver
cd ..

pause
