## Installing

1. Put this folder somewhere on your PC
1. Go to about://extensions page in chrome
1. Click "Load unpacked" and specify path to the extension's folder
1. Profit

## Description

Try to read a canvas on the page, and see if it can be parsed into a url

Currently very limited to finding the first image that is in a canvas. Then
try to open it.

## How it works

The extension will look on a website for a canvas. If it is there, parse it using
QR code magis.

- If it can be parsed as a url, the link is opened
- If it can be parsed, but not as url, the text is shown in a `alert` popup
- If something else, do nothing

## TODO

- Make it possible to snip an area from the page (html2canvas)

