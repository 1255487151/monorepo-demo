@echo off
REM Windows pre-commit hook - 避免弹窗
cd /d "%~dp0.."
call pnpm exec lint-staged --relative --quiet
exit /b %errorlevel%