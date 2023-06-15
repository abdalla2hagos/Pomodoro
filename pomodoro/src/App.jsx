import { useState } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <h1><Logo /></h1>

      <nav>
        <ul className="nav__menu">
          <li>pomodoro</li>
          <li>short break</li>
          <li>long break</li>
        </ul>
      </nav>
    </header>

    <main className='main'>
      <time>00:00</time>
      <p>RESTART</p>
    </main>

    <footer>
      <IconSettings />
    </footer>

    <dialog open>
        <h2>Settings <span><IconClose /></span></h2>
    </dialog>
    </>
  )
}

export default App
