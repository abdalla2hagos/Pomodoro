import { useState } from 'react'
import Logo from './assets/logo'
import IconSettings from './assets/IconSettings'
import IconClose from './assets/IconClose'
import IconArrowUp from './assets/IconArrowUp'
import IconArrowDown from './assets/IconArrowDown'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header className='header'>
      <h1><Logo /></h1>

      <nav>
        <ul className='nav__menu'>
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

    <footer className='footer'>
      <IconSettings />
    </footer>

    <dialog>
      <div className='flex--space'>
        <h2 className='settings__title'>Settings</h2>
        <IconClose />
      </div>

      <div>
        <h3 className='time__title'>TIME (MINUTES)</h3>

        <div>
          <div className='flex--space'>
            <p>pomodoro</p>

            <div>
              <p>25</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>

          <div>
            <p>short break</p>

            <div>
              <p>5</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>

          <div>
            <p>long break</p>

            <div>
              <p>15</p>

              <div>
                <IconArrowUp />
                <IconArrowDown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex--space'>
        <h3>FONT</h3>

        <div>
          <button>Aa</button>
          <button>Aa</button>
          <button>Aa</button>
        </div>
      </div>

      <div className='flex--space'>
        <h3>COLOR</h3>

        <div>
          <button>orange</button>
          <button>blue</button>
          <button>purple</button>
        </div>
      </div>

      <button>Apply</button>
    </dialog>
    </>
  )
}

export default App
