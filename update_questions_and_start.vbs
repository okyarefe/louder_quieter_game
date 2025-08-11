Set WshShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Run the build script
WshShell.Run "cmd /c node build.js", 0, True

' Open the game in default browser
WshShell.Run "cmd /c start index.html", 0, False 