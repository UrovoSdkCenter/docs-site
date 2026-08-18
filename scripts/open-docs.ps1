$root = Join-Path $PSScriptRoot 'docs'
if (-not (Test-Path $root)) {
    Write-Host "未找到 docs 目录，请勿移动本脚本。"
    exit 1
}

$prefix = 'http://127.0.0.1:8080/'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
} catch {
    Write-Host "无法监听 8080 端口，可能已被占用。"
    Write-Host $_.Exception.Message
    exit 1
}

Start-Process 'http://127.0.0.1:8080/label-printer/k388pro-ble/'

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.js'   = 'application/javascript'
    '.css'  = 'text/css'
    '.json' = 'application/json'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
    '.txt'  = 'text/plain; charset=utf-8'
}

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $reqPath = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = 'index.html' }
    $full = Join-Path $root $reqPath
    if ((Test-Path $full) -and (Get-Item $full).PSIsContainer) {
        $full = Join-Path $full 'index.html'
    }
    if (-not (Test-Path $full)) {
        $fullHtml = $full
        if (-not $fullHtml.EndsWith('.html')) { $fullHtml = "$full.html" }
        if (Test-Path $fullHtml) { $full = $fullHtml }
    }
    $res = $ctx.Response
    if (Test-Path $full) {
        $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
        $res.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' })
        $bytes = [IO.File]::ReadAllBytes($full)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
        $msg = [Text.Encoding]::UTF8.GetBytes('Not Found')
        $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.Close()
}
