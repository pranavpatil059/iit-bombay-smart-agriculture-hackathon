@echo off
color 0A
echo ========================================
echo   Smart Agriculture Platform - LOCAL
echo   IIT Bombay Hackathon 2025
echo ========================================
echo.
echo Starting servers...
echo.

start "Backend Server - Port 3000" cmd /k "cd backend && echo Backend Server Starting... && echo. && npm start"
timeout /t 3 /nobreak >nul
start "Frontend Server - Port 5173" cmd /k "cd frontend && echo Frontend Server Starting... && echo. && npm run dev"

timeout /t 2 /nobreak >nul
cls
color 0B
echo ========================================
echo   SERVERS ARE RUNNING!
echo ========================================
echo.
echo Backend API Server:
echo   http://localhost:3000
echo.
echo Frontend Application:
echo   http://localhost:5173
echo.
echo FarmShield Pro (Wildlife Protection):
echo   http://localhost:5173/farmshield
echo.
echo ========================================
echo.
echo Press Ctrl+C in each terminal to stop
echo Check the terminal windows for logs
echo.
echo Your browser should open automatically
echo If not, click the links above!
echo ========================================
pause
