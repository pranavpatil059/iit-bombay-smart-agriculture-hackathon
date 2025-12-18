@echo off
color 0E
echo ========================================
echo   QUICK START - Smart Agriculture
echo   IIT Bombay Hackathon 2025
echo ========================================
echo.

REM Check if node_modules exists in backend
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: Backend installation failed!
        pause
        exit /b 1
    )
    cd ..
    echo Backend dependencies installed!
    echo.
)

REM Check if node_modules exists in frontend
if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: Frontend installation failed!
        pause
        exit /b 1
    )
    cd ..
    echo Frontend dependencies installed!
    echo.
)

echo All dependencies are ready!
echo.
echo Starting servers...
echo.

REM Start the servers
call start-local.bat
