@echo off
color 0A
echo ========================================
echo   Committing Changes to GitHub
echo   IIT Bombay Smart Agriculture Project
echo ========================================
echo.

cd iit-bombay-smart-agriculture-hackathon

echo Step 1: Checking Git status...
git status
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Committing changes...
git commit -m "feat: Add Soil Monitoring System with Pattern Matching and Demo Mode

Features Added:
- Real-time soil moisture monitoring with IoT integration
- Multi-line crop comparison graphs (8 crops)
- Pattern matching algorithm for crop recommendations
- Visual sorting animation showing comparison process
- Demo mode with sample data for presentations
- Individual crop comparison graphs
- Raspberry Pi and Arduino integration
- Toggle switch between Demo and Live modes
- Crop recommendation cards with match scores
- Performance metrics dashboard

Technical Updates:
- Enhanced IoTMonitoring component with advanced features
- Added demo mode with 7 sample readings
- Implemented visual sorting with comparison overlay
- Created crop moisture pattern database
- Added backend IoT routes for sensor data
- Updated Navbar with Soil Monitoring link
- Cleaned up redundant documentation files

Documentation:
- DEMO-MODE-GUIDE.md - Demo mode usage
- CROP-PATTERN-MATCHING.md - Pattern matching explanation
- LOCAL-SETUP-GUIDE.md - Local setup instructions
- RASPBERRY-PI-DIRECT-SETUP.md - Hardware setup
- ARDUINO-RASPBERRY-PI-SETUP.md - Arduino integration"
echo.

echo Step 4: Pushing to GitHub...
echo.
echo Choose your remote:
echo 1. Push to origin (main repository)
echo 2. Push to myfork (your fork)
echo 3. Push to both
echo.
set /p choice="Enter choice (1/2/3): "

if "%choice%"=="1" (
    echo Pushing to origin...
    git push origin main
) else if "%choice%"=="2" (
    echo Pushing to your fork...
    git push myfork main
) else if "%choice%"=="3" (
    echo Pushing to origin...
    git push origin main
    echo.
    echo Pushing to your fork...
    git push myfork main
) else (
    echo Invalid choice. Pushing to origin by default...
    git push origin main
)

echo.
echo ========================================
echo   ✓ Changes pushed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Go to GitHub repository
echo 2. Create a Pull Request if needed
echo 3. Review changes online
echo.
pause
