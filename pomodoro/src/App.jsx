import { useState, useRef } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'
import IconArrowUp from './assets/IconArrowUp'
import IconArrowDown from './assets/IconArrowDown'


function App() {
  const modal = useRef()
  const [time, SetTime] = useState([{
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  }])
  const [timer, setTimer] = useState([])

  function increasePomodoro(){
    SetTime(prev => prev.map(time => {
      return {
        ...time, pomodoro: time.pomodoro + 1
      }
    }))
  }

  function DecreasePomodoro(){
    SetTime(prev => prev.map(time => {
      return {
        ...time, pomodoro: time.pomodoro <= 1 ? 1 : time.pomodoro - 1 
      }
    }))
  }

  function applyChanges(){
    setTimer(prev => {
      const updatedArray = [...prev]
      updatedArray.push(time.map(time=>time.pomodoro))
      if(updatedArray.length > 1){
        updatedArray.shift()
      }
      return updatedArray
    })
  }
  
  return (
    <div className='wrapper'>
    <header className='header'>
      <h1 className='logo'><Logo /></h1>

      <nav>
        <ul className='nav__menu'>
          <li className='isActiveTab nav__item'>pomodoro</li>
          <li className='nav__item'>short break</li>
          <li className='nav__item'>long break</li>
        </ul>
      </nav>
    </header>

    <main className='main'>
      <time className='main__time'>{timer}</time>
      <p className='main__timeStatus'>RESTART</p>
      {/* <svg className='circleContainer' xmlns="http://www.w3.org/2000/svg">
        <circle pathLength="100" cx="100" cy="60" r="50" stroke="black" class="circle" />
      </svg> */}
    </main>

    <footer className='footer' onClick={()=> modal.current.showModal()}>
      <IconSettings />
    </footer>

    <dialog className='dialog' ref={modal}>
      <div className='flex--center settings'>
        <h2 className='settings__title'>Settings</h2>
        <button className='iconClose' onClick={()=> modal.current.close()}><IconClose /></button>
      </div>

      <div className='timeContainer'>
        <h3 className='timeTitle'>TIME (MINUTES)</h3>

        <div className='flexContainer'>
          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>pomodoro</p>

            <div className='flex--center timeEdit'>
              <p>{time.map(time => time.pomodoro)}</p>

              <div className='arrowContainer'>
                <IconArrowUp increasePomodoro={()=> increasePomodoro()}/>
                <IconArrowDown DecreasePomodoro={()=> DecreasePomodoro()}/>
              </div>
            </div>
          </div>

          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>short break</p>

            <div className='flex--center timeEdit'>
              <p>5</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>

          <div className='flex--between'>
            <p className='timeEditTitle'>long break</p>

            <div className='flex--center timeEdit'>
              <p>15</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex fontContainer'>
        <h3>FONT</h3>

        <div className='fontButtonContainer'>
          <button className='fontButton attr isActiveFont'>Aa</button>
          <button className='fontButton attr'>Aa</button>
          <button className='fontButton attr'>Aa</button>
        </div>
      </div>

      <div className='flex clrContainer'>
        <h3>COLOR</h3>

        <div>
          <button className='clrButton attr isActiveColor'></button>
          <button className='clrButton attr'></button>
          <button className='clrButton attr'></button>
        </div>
      </div>

      <button className='apply' onClick={()=> {applyChanges(); modal.current.close();}}>Apply</button>
    </dialog>
    </div>
  )
}

export default App
