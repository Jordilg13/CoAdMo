@echo off
REM ========================================
REM COADMO Backend Installation Script
REM ========================================
echo.
echo ========================================
echo  COADMO - Backend Installation
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

echo [1/4] Python detected:
python --version
echo.

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: pip is not installed
    echo Please reinstall Python with pip
    pause
    exit /b 1
)

echo [2/4] Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    echo.
    echo Common issues:
    echo - ODBC Driver 17 for SQL Server not installed
    echo - Missing Visual C++ Build Tools for python-ldap
    echo.
    echo Please check SETUP.md for detailed installation instructions
    pause
    exit /b 1
)

echo.
echo [3/4] Checking .env configuration...
cd ..
if not exist .env (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and configure it
    echo.
    pause
)

echo.
echo [4/4] Running database migrations...
cd backend
python manage.py migrate
if errorlevel 1 (
    echo.
    echo WARNING: Database migration failed
    echo Make sure SQL Server is accessible and .env is configured correctly
    echo.
)

cd ..
echo.
echo ========================================
echo  Backend installation completed!
echo ========================================
echo.
echo Next steps:
echo 1. Configure .env file if not done yet
echo 2. Run start_backend.bat to start the server
echo.
pause
