import { useState, useRef, useEffect } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'
import IconArrowUp from './assets/IconArrowUp'
import IconArrowDown from './assets/IconArrowDown'
import sound from './assets/sound.wav'

function App() {
  const modal = useRef()
  const audioRef = useRef(new Audio(sound))
  const [time, setTime] = useState([{
    type: 'pomodoro',
    duration: 25,
    seconds: 0,
    isActive: true
  },{
    type: 'short break',
    duration: 5,
    seconds: 0,
    isActive: false
  },{
    type: 'long break',
    duration: 15,
    seconds: 0,
    isActive: false
  }])
  const [activeTap, setActiveTap] = useState('pomodoro')
  const [activeFont, setActiveFont] = useState('monospace')
  const [activeFontSelected, setActiveFontSelected] = useState('monospace')
  const [activeColor, setActiveColor] = useState('orange')
  const [activeColorSelected, setActiveColorSelected] = useState('orange')
  const [circleColor, setCircleColor] = useState('hsl(var(--clr-orange))')
  const [tempTime, setTempTime] = useState(time)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const activeItem = time.find(item => item.isActive)
  
  useEffect(()=>{
    const audio = audioRef.current
    if (isTimeRunning) {
      const timer = setInterval(() => {
        setTime(prev => prev.map(item => {
          if (item.isActive) {
            const seconds = item.seconds === 0 ? 59 : item.seconds - 1
            const duration = seconds === 59 ? item.duration - 1 : item.duration
            return { ...item, seconds, duration}
          }
          return item
        }))
  
        if (activeItem.duration === 0 && activeItem.seconds === 1) {
          setIsTimeRunning(false)
          audio.loop = true
          audio.play()
        }else{
          audio.pause() // Pause the audio when time is not running
          audio.currentTime = 0
        }
      }, 1000)
  
      return () => clearInterval(timer)
    }    
  },[isTimeRunning, time])

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

  function selectTap(e){
    if(!e.target.closest('.nav__item')) return
    const selectedType = e.target.dataset.name
    setActiveTap(selectedType)
    setTime(prev => prev.map(item =>{
      if(item.type === selectedType){
        return{
          ...item, 
          isActive: item.isActive = true,
          duration: tempTime.find(t => t.type === item.type).duration,
          seconds: 0
        }
      }else{
        return{
          ...item, isActive: item.isActive = false,
        }
      }
    }))
    // pauses timer 
    setIsTimeRunning(false)
  }

  function startPause(){
    setIsTimeRunning(prev => !prev)

    if (activeItem.duration === 0 && activeItem.seconds === 0){
      setTime(prevTime => {
        return prevTime.map(item => {
          return { ...item, duration: tempTime.find(t => t.type === item.type).duration}
        })
      })
    } 
  }
  
  function changeFont(e){
    if(!e.target.closest('.fontButton')) return
    setActiveFont(e.target.dataset.font)
  }

  function changeColor(e){
    if(!e.target.closest('.clrButton')) return
    setActiveColor(e.target.dataset.color)
  }
  
  function applyChanges(){
    modal.current.close()
    setIsTimeRunning(false)
    setTime(prevTime => prevTime.map(item => {
        return { ...item, duration: tempTime.find(t => t.type === item.type).duration, seconds: 0}
      })
    )
    let color
    let circle
    let font
    if(activeColor === 'orange'){
      color = 'orange'
      circle = 'hsl(var(--clr-orange))'
    }if(activeColor === 'blue'){
      color = 'blue'
      circle = 'hsl(var(--clr-blue))'
    }if(activeColor === 'purple'){
      color = 'purple'
      circle = 'hsl(var(--clr-purple))'
    }

    if(activeFont === 'monospace'){
      font = 'monospace'
    }if(activeFont === 'sans-serif'){
      font = 'sans-serif'
    }if(activeFont === 'serif'){
      font = 'serif'
    }
    setActiveColorSelected(color)
    setCircleColor(circle)
    setActiveFontSelected(font)
  }

  function calculateStrokeDashOffset(){
    if (activeItem.duration === 0 && activeItem.seconds === 0) {
      return 0
    }

    const totalSeconds = activeItem.duration * 60 + activeItem.seconds
    const percentElapsed = (totalSeconds / (tempTime.find(t => t.type === activeItem.type).duration * 60)) * 100
    return 100 - percentElapsed
  }

  return (
    <div className='wrapper'>
    <header className={`header ${activeFontSelected}`}>
      <h1 className='logo'><Logo /></h1>

      <nav>
        <ul className='nav__menu' onClick={selectTap}>
          <span className=''></span>
          <li className={`nav__item ${activeTap === 'pomodoro' ? `isActiveTab ${activeColorSelected} ` : ''}`} data-name = 'pomodoro'>pomodoro</li>
          <li className={`nav__item ${activeTap === 'short break' ? `isActiveTab ${activeColorSelected}` : ''}`} data-name = 'short break'>short break</li>
          <li className={`nav__item ${activeTap === 'long break' ? `isActiveTab ${activeColorSelected}` : ''}`} data-name = 'long break'>long break</li>
        </ul>
      </nav>
    </header>

    <main className={`main ${activeFontSelected}`} onClick={startPause}>
      <time className='main__time'>{activeItem.duration < 10 ? `0${activeItem.duration}` : activeItem.duration}:{time.filter(item=>item.isActive).map(item=>item.seconds < 10 ? `0${item.seconds}` : item.seconds)}</time>
      <p className='main__timeStatus'>{isTimeRunning ? 'PAUSE' : 'RESTART'}</p>
      <svg className='circleContainer' xmlns="http://www.w3.org/2000/svg">
        <circle pathLength="100" cx="160" cy="160" r="140" stroke={circleColor} class="circle" stroke-linecap="round" stroke-dashoffset= {calculateStrokeDashOffset()}/>
      </svg>
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
                <IconArrowUp increaseTime={()=> increaseTime('pomodoro')}/>
                <IconArrowDown decreaseTime={()=> decreaseTime('pomodoro')}/>
              </div>
            </div>
          </div>

          <div className='flex--between timeEditContainer'>
            <p className='timeEditTitle'>short break</p>

            <div className='flex--center timeEdit'>
              <p>{tempTime[1].duration}</p>

              <div>
                <IconArrowUp increaseTime={()=> increaseTime('short break')}/>
                <IconArrowDown decreaseTime={()=> decreaseTime('short break')}/>
              </div>
            </div>
          </div>

          <div className='flex--between'>
            <p className='timeEditTitle'>long break</p>

            <div className='flex--center timeEdit'>
              <p>{tempTime[2].duration}</p>

              <div>
                <IconArrowUp increaseTime={()=> increaseTime('long break')}/>
                <IconArrowDown decreaseTime={()=> decreaseTime('long break')}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex fontContainer'>
        <h3>FONT</h3>

        <div className='fontButtonContainer' onClick={changeFont}>
          <button className={`fontButton attr ${activeFont === 'monospace' ? 'isActiveFont' : ''}`} data-font='monospace'>Aa</button>
          <button className={`fontButton attr ${activeFont === 'sans-serif' ? 'isActiveFont' : ''}`} data-font='sans-serif'>Aa</button>
          <button className={`fontButton attr ${activeFont === 'serif' ? 'isActiveFont' : ''}`} data-font='serif'>Aa</button>
        </div>
      </div>

      <div className='flex clrContainer'>
        <h3>COLOR</h3>

        <div onClick={changeColor}> 
          <button className={`clrButton attr ${activeColor === 'orange' ? 'isActiveColor' : ''}`} data-color = 'orange'></button>
          <button className={`clrButton attr ${activeColor === 'purple' ? 'isActiveColor' : ''}`} data-color = 'purple'></button>
          <button className={`clrButton attr ${activeColor === 'blue' ? 'isActiveColor' : ''}`} data-color = 'blue'></button>
        </div>
      </div>

      <button className='apply' onClick={applyChanges}>Apply</button>
    </dialog>
    </div>
  )
}

export default App
