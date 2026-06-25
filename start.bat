@echo off
:: Change directory to the folder where this batch file is located
cd /d "%~dp0"

title HSE Safety Control System - Bootstrapper
color 0A

echo =======================================================
echo  HSE SAFETY CONTROL SYSTEM - LOCAL Hub Bootloader
echo =======================================================
echo.

:: Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/ before running this system.
    echo.
    pause
    exit /b 1
)

:: Check for node_modules dependency folder
if not exist "node_modules" (
    echo [INFO] Installing required packages [express, multer, cors]...
    echo This might take a minute...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed. Make sure you are connected to the internet.
        pause
        exit /b 1
    )
) else (
    echo [INFO] Dependencies verified.
)

echo.
echo [INFO] Booting Express Local HSE Server...
:: Start the server in a separate background cmd shell
start "HSE Safety Server" cmd /k "node api/index.js"

echo.
echo [INFO] Waiting 3 seconds for server startup...
timeout /t 3 /nobreak > nul

echo.
echo [INFO] Launching HSE Safety Portal at http://localhost:3000
start http://localhost:3000

echo.
echo =======================================================
echo  BOOT COMPLETE!
echo  Please keep the "HSE Safety Server" command window open
echo  while using the application.
echo =======================================================
echo.
pause
