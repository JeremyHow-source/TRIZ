@echo off
cd /d C:\TRIZ\team-eval-app
start "" python run.py
echo Team Eval App started on http://localhost:5000
timeout /t 3 /nobreak >nul
