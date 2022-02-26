---
title: 'How to add autocomplete to PowerShell in 2 steps'
description: 'Add autocomplete to Windows PowerShell in 2 easy steps'
date: 2022-02-26
categories: ['blog']
ogImage: ./og-image.png
---

One of my friends informed me about this really cool feature that allows you to add autocomplete to Windows powershell in 2 easy steps:

Here’s a demo of what we’ll be doing today (Thanks to [nexxel](https://personal-website-nexxeln.vercel.app/) for the blog idea and this GIF)

![https://us-east-1.tixte.net/uploads/nexxel-has.no-friends.xyz/WindowsTerminal_AXalnvCIax.gif](https://us-east-1.tixte.net/uploads/nexxel-has.no-friends.xyz/WindowsTerminal_AXalnvCIax.gif)

 How? By using PSReadLine

## Step one

Install PSreadline

```powershell
Install-Module PSReadLine
```

## Step two

Open your PowerShell PROFILE in your preferred editor (get the file by using `$PROFILE` )

paste this code snippet:

```powershell
Import-Module PSReadLine

# Shows navigable menu of all options when hitting Tab
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# Autocompleteion for Arrow keys
Set-PSReadLineOption -HistorySearchCursorMovesToEnd
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

Set-PSReadLineOption -ShowToolTips
Set-PSReadLineOption -PredictionSource History
```

And that’s it!!

