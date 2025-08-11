Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

' Get the current directory
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Path to images folder
imagesPath = currentDir & "\assets\images"

' Path to questions.js
questionsPath = currentDir & "\js\utils\questions.js"

' Create questions array
questions = "const questions = [" & vbCrLf

' Get all PNG files
Set folder = fso.GetFolder(imagesPath)
Set files = folder.Files

' Process each file
For Each file in files
    If LCase(fso.GetExtensionName(file.Name)) = "png" Then
        ' Get filename without extension
        fileName = fso.GetBaseName(file.Name)
        
        ' Split by last underscore to get name and dB
        lastUnderscore = InStrRev(fileName, "_")
        If lastUnderscore > 0 Then
            name = Left(fileName, lastUnderscore - 1)
            db = Mid(fileName, lastUnderscore + 1)
            
            ' Format name with spaces
            name = Replace(name, "_", " ")
            name = Replace(name, "(", " (")
            name = Replace(name, ")", ") ")
            
            ' Add to questions array
            questions = questions & "    {" & vbCrLf
            questions = questions & "        ""itemName"": """ & name & """," & vbCrLf
            questions = questions & "        ""dB"": """ & db & """," & vbCrLf
            questions = questions & "        ""imagePath"": ""assets/images/" & file.Name & """" & vbCrLf
            questions = questions & "    }," & vbCrLf
        End If
    End If
Next

' Remove last comma and close array
questions = Left(questions, Len(questions) - 3) & vbCrLf & "];"

' Write to questions.js
Set questionsFile = fso.CreateTextFile(questionsPath, True)
questionsFile.Write questions
questionsFile.Close

' Show success message
MsgBox "Questions updated successfully!", vbInformation, "Update Complete" 