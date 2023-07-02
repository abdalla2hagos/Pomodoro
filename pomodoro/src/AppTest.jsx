// if(time.seconds === 0){
    //   setTime(prev => prev.map(item=>{
    //     if(item.isActive){
    //       return {
    //         ...item, duration: item.duration - 1
    //       }
    //     }
    //     return item
    //   }))
    // }
    // if(isTimeRunning && time.find(item=>item.isActive).duration > 1){
    //   setTimeout(()=>{
    //     setTime(prev => prev.map(item=>{
    //       if(item.isActive){
    //         return {
    //           ...item, duration: item.duration - 1
    //         }
    //       }
    //       return item
    //     }))
    //   },1000)
    // } else if(time.find(item=>item.isActive).duration === 0){
    //   setIsTimeRunning(false)
    // }

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
        seconds: 3,
        isActive: true
      },{
        type: shortBreak,
        duration: 1,
        seconds:3,
        isActive: false
      },{
        type: longBreak,
        duration: 15,
        seconds: 3,
        isActive: false
      }])
      // const [displayedTime, setDisplayedTime] = useState()
      const [activeTap, setActiveTap] = useState(pomodoro)
      const [activeFont, setActiveFont] = useState('monospace')
      const [activeColor, setActiveColor] = useState('orange')
      const [tempTime, setTempTime] = useState(time)
      const [isTimeRunning, setIsTimeRunning] = useState(false)
      // const activeTime = tempTime.find(item => item.isActive)
    
      useEffect(()=>{
        if(isTimeRunning && time.find(item=>item.isActive).duration > 0){
        setTimeout(() => {
          setTime(prev => prev.map(item=>{
            if(item.isActive){
              return {  
                ...item, seconds: item.seconds === 0 ? 60 : item.seconds - 1, duration: item.seconds === 0 ? item.duration - 1 : item.duration
              }
            }
            return item
          }))
        }, 1000);
      }else if(time.find(item=>item.isActive).duration === 0 ){
        setIsTimeRunning(false)
        setTime(tempTime)
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
        // if(!e.target.closest('.nav__item')) return
        const selectedType = e.target.dataset.name
        setActiveTap(selectedType)
        setTime(prev => prev.map(item =>{
          if(item.type === selectedType){
            return{
              ...item, isActive: item.isActive = true,
               seconds: 3
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
      }
    
      function changeFont(e){
        
      }
    
      function changeColor(e){
        if(!e.target.closest('.clrButton')) return
        setActiveColor(e.target.dataset.color)
      }
     
      function applyChanges(){
        modal.current.close()
        setIsTimeRunning(false)
        setTime(tempTime) 
        // setTime(prev => prev.map(item =>{
        //   return{
        //     ...item, duration: item.duration = tempTime.filter(item=>item.isActive).map(item=>item.duration)
        //   }
        // }))
      }
    
      console.log(isTimeRunning)
      return (
        <div className='wrapper'>
        <header className='header'>
          <h1 className='logo'><Logo /></h1>
    
          <nav>
            <ul className='nav__menu' onClick={selectTap}>
              <li className={`nav__item' ${activeTap === pomodoro ? 'isActiveTab' : ''}`} data-name = 'pomodoro'>pomodoro</li>
              <li className={`'nav__item' ${activeTap === shortBreak ? 'isActiveTab' : ''}`} data-name = 'short break'>short break</li>
              <li className={`'nav__item' ${activeTap === longBreak ? 'isActiveTab' : ''}`} data-name = 'long break'>long break</li>
            </ul>
          </nav>
        </header>
    
        <main className='main' onClick={startPause}>
          <time className='main__time'>{time.filter(item=>item.isActive).map(item=>item.duration)}:{time.filter(item=>item.isActive).map(item=>item.seconds < 10 ? `0${item.seconds}` : item.seconds)}</time>
          <p className='main__timeStatus'>{isTimeRunning ? 'PAUSE' : 'RESTART'}</p>
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
    


    if(isTimeRunning && time.find(item=>item.isActive).duration > 0){
      setTimeout(() => {
        setTime(prev => prev.map(item=>{
          if(item.isActive){
            return {  
              ...item, 
              seconds: item.seconds === 0 ? 59 : item.seconds - 1, 
              duration: item.seconds === 0 ? item.duration - 1 : item.duration
            }
          }
          return item
        }))
      }, 1000);
    }else if(time.find(item => item.isActive).seconds === 0 && time.find(item=>item.isActive).duration === 0){
      setIsTimeRunning(false)
    }