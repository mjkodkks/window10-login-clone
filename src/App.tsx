import { useEffect, useState } from 'react'
import wallpaper from './assets/img/wallpaper.jpg'
import arrowRight from './assets/icons/arrow-right.svg'

function App() {

  const [time, setTime] = useState<string>(``)
  const [date, setDate] = useState<string>(``)


  function initTime() {
    const initDate = new Date()
    const minutes = initDate.getMinutes()
    const hour = initDate.getHours()
    const day = initDate.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(initDate)
    const dayFull = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(initDate)

    setTime(`${hour < 10 ? '0' + hour: hour}:${minutes < 10 ? '0' + minutes: minutes}`)
    setDate(`${dayFull}, ${month} ${day}`)
  }

  let interval = 0
  function updateTime() {
    clearInterval(interval)
    interval = setInterval(() => {
      initTime()
    }, 500)
  }

  useEffect(() => {
    initTime()
    updateTime()
    return () => {
      clearInterval(interval)
    };
  }, [])


  function handleKeyDown(evt: KeyboardEvent) {
    evt = evt || window.event;
    if (evt.code === 'Escape') {
      console.log('test keydown');
      setGetForm(false)
    }
  }


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [getForm, setGetForm] = useState<boolean>(false)




  const bg = {
    backgroundImage: `url(${wallpaper})`
  }

  const isBlur = () => {
    return  getForm ? 'blurry-bg transition-all duration-500' : ''
  }

  return (<>
    <div className="h-full w-full relative">
      <div className={`h-full w-full z-0 absolute bg-center bg-no-repeat bg-fixed bg-cover ${isBlur()}`}  style={bg}></div>
      <div className="h-full w-full relative flex justify-center items-center">
        {
          getForm ?
            <div className='form flex justify-center flex-col items-center gap-8 w-[300px] h-auto fadeIn'>
              <div className='w-[200px] h-[200px] bg-white rounded-full bg-center bg-no-repeat bg-cover' style={{ backgroundImage: 'url(https://avatars.githubusercontent.com/u/21122708?v=4)' }}></div>
              <div className='text-4xl text-white font-light'>Thanonphat Supho</div>
              <div className="block relative w-full">
                <input type="password" className='p-2 w-full pr-[48px] backdrop-blur-sm bg-white/30 text-white border-0' />
                <button className='absolute right-[2px] top-[2px] text-white grid place-content-center backdrop-blur-sm bg-white/20 w-[36px] h-[36px]'>
                  <img src={arrowRight} alt="next" />
                </button>
              </div>
            </div>
            : <></>
        }

        {
          !getForm &&
          <div className='absolute left-[2%] bottom-[4%] text-white'>
            <div className='text-8xl font-thin'>{time}</div>
            <div className='text-6xl font-thin mt-2'>{date}</div>
          </div>
        }
      </div>
      {
        !getForm && <div className='fixed top-0 left-0 right-0 bottom-0 bg-transparent z-10 cursor-pointer' onClick={() => setGetForm(true)}></div>
      }
    </div>
  </>
  )
}

export default App
