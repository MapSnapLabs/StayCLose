@echo off
echo ============================================
echo 🚀 StayClose Clean + Build Script
echo ============================================

REM Step 1: Go to project root
cd /d %~dp0

REM Step 2: Clean node_modules, lock file, and Gradle cache
echo 🧹 Cleaning old build files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
if exist android\.gradle rmdir /s /q android\.gradle
if exist android\app\build rmdir /s /q android\app\build

REM Step 3: Reinstall dependencies
echo 📦 Installing npm dependencies...
call npm install

REM Step 4: Regenerate Gradle wrapper if missing
cd android
if not exist gradlew.bat (
    echo 🔧 Gradle wrapper missing, regenerating...
    gradle wrapper --gradle-version 8.7 --distribution-type all
)
echo 🧹 Cleaning Gradle project...
call gradlew.bat clean
cd ..

REM Step 5: Build & install on device
echo 🚀 Running Expo build...
call npx expo run:android