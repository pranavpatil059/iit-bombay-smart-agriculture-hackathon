@echo off
echo ========================================
echo Creating Pull Request for Local Setup
echo ========================================
echo.

echo Step 1: Creating new branch...
git checkout -b feature/local-development-setup
if %errorlevel% neq 0 (
    echo ERROR: Failed to create branch!
    pause
    exit /b 1
)
echo Branch created successfully!
echo.

echo Step 2: Adding all changes...
git add .
echo Files added!
echo.

echo Step 3: Committing changes...
git commit -m "Add local development setup scripts and documentation

- Added setup-local.bat for easy dependency installation
- Added start-local.bat to run frontend and backend servers
- Created comprehensive LOCAL-SETUP-GUIDE.md
- Added environment configuration files
- Updated backend and frontend for localhost support
- Added quick reference documentation files"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit!
    pause
    exit /b 1
)
echo Changes committed!
echo.

echo Step 4: Pushing to GitHub...
git push -u origin feature/local-development-setup
if %errorlevel% neq 0 (
    echo ERROR: Failed to push!
    echo Make sure you have push access to the repository
    pause
    exit /b 1
)
echo.

echo ========================================
echo SUCCESS! Branch pushed to GitHub
echo ========================================
echo.
echo Next Steps:
echo 1. Go to: https://github.com/pranavpatil059/iit-bombay-smart-agriculture-hackathon
echo 2. You'll see a "Compare & pull request" button
echo 3. Click it and create your pull request
echo 4. Add description of your changes
echo 5. Submit the PR for review
echo.
echo Opening GitHub in browser...
start https://github.com/pranavpatil059/iit-bombay-smart-agriculture-hackathon/pulls
echo.
pause
