import { useState, useRef } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'
import IconArrowUp from './assets/IconArrowUp'
import IconArrowDown from './assets/IconArrowDown'
import CheckMark from './assets/CheckMark'


function App() {
  const modal = useRef()
  
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
      <time className='main__time'>17:59</time>
      <p className='main__timeStatus'>RESTART</p>
      {/* <svg className='circleContainer' xmlns="http://www.w3.org/2000/svg">
        <circle pathLength="100" cx="100" cy="60" r="50" stroke="black" class="circle" />
      </svg> */}
    </main>

    <footer className='footer' onClick={()=> modal.current.showModal()}>
      <IconSettings />
    </footer>

    <dialog className='dialog' ref={modal}>
      <div className='flex--between settings'>
        <h2 className='settings__title'>Settings</h2>
        <button className='iconClose'><IconClose /></button>
      </div>

      <div className='timeContainer'>
        <h3 className='timeTitle'>TIME (MINUTES)</h3>

        <div>
          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>pomodoro</p>

            <div className='flex--between timeEdit'>
              <p>25</p>

              <div className='arrowContainer'>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>

          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>short break</p>

            <div className='flex--between timeEdit'>
              <p>5</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>

          <div className='flex--between'>
            <p className='timeEditTitle'>long break</p>

            <div className='flex--between timeEdit'>
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
          <button className='clrButton attr'><CheckMark/></button>
          <button className='clrButton attr'></button>
          <button className='clrButton attr'></button>
        </div>
      </div>

      <button className='Apply'>Apply</button>
    </dialog>
    </div>
  )
}

export default App
