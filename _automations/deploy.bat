@ECHO OFF
SET BaseFolder=C:\inetpub\JovialBadger
IF EXIST "%BaseFolder%" RD /S /Q "%BaseFolder%"
MD "%BaseFolder%"


xcopy /s /i "%~dp0..\_site" "%BaseFolder%"