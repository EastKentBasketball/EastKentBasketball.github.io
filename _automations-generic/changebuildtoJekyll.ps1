((Get-Content -path ..\_config.yml -Raw) -replace 'environment: "iis"','environment: "jekyll"' -replace 'environment: "live"','environment: "jekyll"') | Set-Content -Path ..\_config.yml

cmd.exe /c 'serve.bat'
