@echo off
cd /d "%~dp0.."
pnpm exec lint-staged --relative
