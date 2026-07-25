Add-Type -AssemblyName System.Drawing  
 = [System.Drawing.Bitmap]::FromFile('C:\Users\RSR_DEV\.gemini\antigravity\brain\a8723c1f-c825-42c6-add9-c3c57005a39e\media__1785011743166.png')  
 = .GetPixel(50,50)  
Write-Host ('#' + .R.ToString('X2') + .G.ToString('X2') + .B.ToString('X2'))  
