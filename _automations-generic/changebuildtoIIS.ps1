((Get-Content -path ..\_config.yml -Raw) -replace 'environment: "jekyll"','environment: "iis"' -replace 'environment: "live"','environment: "iis"') | Set-Content -Path ..\_config.yml

cmd.exe /c 'serve.bat'
