
import { useState, useEffect } from 'react'
import './App.css'
import MainScreen from './components/MainScreen'
import Settings from './components/Settings'


function App() {
const [isSettings, setIsSettings] = useState(false)
const [workMinutes, setWorkMinutes] = useState(45)
const [breakMinutes, setBreakMinutes] = useState(10)
const updateSettings = (bool) => {
  setIsSettings(bool);
};

const pomodoroHandler = (_workMinutes, _breakMinutes) => {
setWorkMinutes(_workMinutes),
setBreakMinutes(_breakMinutes)
}



useEffect(() => {
  setIsSettings(isSettings);
}, [isSettings]);



  return (
    <>
    <MainScreen workMinutes={workMinutes} breakMinutes={breakMinutes} updateSettings={updateSettings} />
    {isSettings && (
       <Settings pomodoroHandler={pomodoroHandler} updateSettings={updateSettings} />
    )}

    </>
  )
}

export default App
