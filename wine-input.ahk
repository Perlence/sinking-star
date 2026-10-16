#Requires AutoHotkey v2.0
#SingleInstance Off
#NoTrayIcon

KEY_HOLD_MS := 50
KEY_GAP_MS := 350
MESSAGE_TIMEOUT_MS := 1000

; Run using portable AutoHotkey64.exe in the game's CrossOver bottle.
; For background input, notify the game of focus without activating it.
Main()

Main() {
    global KEY_HOLD_MS, KEY_GAP_MS, MESSAGE_TIMEOUT_MS

    if A_Args.Length != 1 || !RegExMatch(A_Args[1], "^[wasdczrxvf123456789]+$") {
        FileAppend("Use the game tool to run this helper`n", "**")
        ExitApp(2)
    }
    target := 0
    notified := false
    exitCode := 0
    try {
        target := WinExist("ahk_exe sinking_star.exe")
        if !target
            throw Error("Game window not found")
        foreground := DllCall("GetForegroundWindow", "Ptr")
        SetKeyDelay(-1, KEY_HOLD_MS)
        if foreground != target {
            ; Set notified first so cleanup is attempted even on a timeout.
            notified := true
            SendMessage(0x0007, 0, 0, target, , , , , MESSAGE_TIMEOUT_MS) ; WM_SETFOCUS
        }
        for key in StrSplit(A_Args[1]) {
            if !WinExist("ahk_id " target)
                throw Error("Game window disappeared during input")
            ; Explicit virtual keys avoid layout-dependent modifiers.
            vk := Ord(StrUpper(key))
            ControlSend("{Blind}{vk" Format("{:02X}", vk) "}", target)
            Sleep(KEY_GAP_MS)
        }
        FileAppend("Sent " StrLen(A_Args[1]) " key(s) without activation`n", "*")
    } catch Error as err {
        FileAppend(err.Message "`n", "**")
        exitCode := 1
    } finally {
        if notified && WinExist("ahk_id " target) && !WinActive("ahk_id " target)
            SendMessage(0x0008, 0, 0, target, , , , , MESSAGE_TIMEOUT_MS) ; WM_KILLFOCUS
    }
    ExitApp(exitCode)
}
