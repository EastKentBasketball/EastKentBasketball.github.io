((Get-Content -path ..\_config.yml -Raw) -replace 'environment: "jekyll"','environment: "live"' -replace 'environment: "iis"','environment: "live"') | Set-Content -Path ..\_config.yml

cmd.exe /c 'serve.bat'
