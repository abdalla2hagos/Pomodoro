import { useState, useRef, useEffect } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'
import IconArrowUp from './assets/IconArrowUp'
import IconArrowDown from './assets/IconArrowDown'


function App() {
  const pomodoro = 'pomodoro'
  const longBreak = 'long break'
  const shortBreak = 'short break'

  const modal = useRef()
  const [time, setTime] = useState([{
    type: pomodoro,
    duration: 25,
    isActive: true
  },{
    type: shortBreak,
    duration: 5,
    isActive: false
  },{
    type: longBreak,
    duration: 15,
    isActive: false
  }])
  const [timer, setTimer] = useState('')
  const [activeMode, setActiveMode] = useState(pomodoro)
  const [activeFont, setActiveFont] = useState('monospace')
  const [tempTime, setTempTime] = useState(time)
  
  useEffect(()=>{
    const activeTime = time.find(item => item.isActive)
    if (activeTime) {
      setTimer(activeTime.duration)
    }
  },[time])

  function increaseTime(type){
    setTempTime(prev => prev.map(item => {
      if(item.type === type)
      return {
        ...item, duration: item.duration + 1
      }
      return item
    }))
  }

  function decreaseTime(type){
    setTempTime(prev => prev.map(item => {
      if(item.type === type){
        return {
          ...item, duration: item.duration <= 1 ? 1 : item.duration - 1 
        }
      }
      return item
    }))
  }

  function changeMode(e){
    setActiveMode(e.target.dataset.name)
    setActiveFont(e.target.dataset.name)
    setTime(prev => prev.map(item =>{
      if(item.type === e.target.dataset.name){
        return{
          ...item, isActive: item.isActive = true
        }
      }else{
        return{
          ...item, isActive: item.isActive = false
        }
      }
    }))
  }

  return (
    <div className='wrapper'>
    <header className='header'>
      <h1 className='logo'><Logo /></h1>

      <nav>
        <ul className='nav__menu' onClick={changeMode}>
          <li className={`nav__item' ${activeMode === pomodoro ? 'isActiveTab' : ''}`} data-name = 'pomodoro'>pomodoro</li>
          <li className={`'nav__item' ${activeMode === shortBreak ? 'isActiveTab' : ''}`} data-name = 'short break'>short break</li>
          <li className={`'nav__item' ${activeMode === longBreak ? 'isActiveTab' : ''}`} data-name = 'long break'>long break</li>
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
              <p>{tempTime[0].duration}</p>

              <div className='arrowContainer'>
                <IconArrowUp increaseTime={()=> increaseTime(pomodoro)}/>
                <IconArrowDown decreaseTime={()=> decreaseTime(pomodoro)}/>
              </div>
            </div>
          </div>

          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>short break</p>

            <div className='flex--center timeEdit'>
              <p>{tempTime[1].duration}</p>

              <div>
                <IconArrowUp increaseTime={()=> increaseTime(shortBreak)}/>
                <IconArrowDown decreaseTime={()=> decreaseTime(shortBreak)}/>
              </div>
            </div>
          </div>

          <div className='flex--between'>
            <p className='timeEditTitle'>long break</p>

            <div className='flex--center timeEdit'>
              <p>{tempTime[2].duration}</p>

              <div>
                <IconArrowUp increaseTime={()=> increaseTime(longBreak)}/>
                <IconArrowDown decreaseTime={()=> decreaseTime(longBreak)}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex fontContainer'>
        <h3>FONT</h3>

        <div className='fontButtonContainer' onClick={changeMode}>
          <button className={`fontButton attr ${activeFont === 'monospace' ? 'isActiveFont' : ''}`} data-name='monospace'>Aa</button>
          <button className={`fontButton attr ${activeFont === 'sans-serif' ? 'isActiveFont' : ''}`} data-name='sans-serif'>Aa</button>
          <button className={`fontButton attr ${activeFont === 'serif' ? 'isActiveFont' : ''}`} data-name='serif'>Aa</button>
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

      <button className='apply' onClick={()=> {setTime(tempTime); modal.current.close();}}>Apply</button>
    </dialog>
    </div>
  )
}

export default App
