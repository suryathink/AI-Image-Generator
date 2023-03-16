import React,{useState} from 'react'
import {BrowserRouter , Link, Route,Routes} from 'react-router-dom'
import {logo} from './assets'

import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../redux/auth/authAction';
// import { Dialog } from '../components';

import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Dialog from './Components/Dialog'

import {logout} from './redux/auth/authAction'

import { Home,CreatePost } from './pages'
const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [dialog, setDialog] = useState(false);
  let { isAuth, name } = useSelector(data=> data); 

  const dispatch = useDispatch();

  
  
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  
  const logoutUser = () => {
    setDialog(false);
    dispatch(logout());
}

 
const handleProfile = () => {
  setIsOpen(false);
}

  return (
       <BrowserRouter>
          <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
          { 
            dialog && <Dialog message="Logout from openAi?" handlerNo={ ()=> setDialog(false) }
              handlerYes={ logoutUser }
            /> 
          }
           
           <Link to="/">
           <img src={logo} alt="logo" className='w-28 object-contain ' />
           </Link>
           <div className="flex justify-center  align-center gap-4  px-4 py-2 ">

           <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Create
           </Link>
            
          
            
            {(isAuth)? (
              <div>
                <button className="inline-flex justify-center w-full rounded-full border-gray-300
                  shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={ handleIsOpen }
                > 
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIvfnFlzfqYihZRcEq_MhJefvOXKJA4xWpBM_Dysx&s" alt="User profile"
                    className="w-10 rounded-full cursor-pointer"
                  />
                </button>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-3 w-[120px] rounded-md shadow-lg
                    bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  >
                    <div className="py-1">
                      <Link to="/profile"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 duration-300
                        hover:bg-indigo-500 hover:text-white"
                        onClick={ handleProfile }
                      >
                        <span className="material-symbols-outlined mr-1"> person </span>
                        Profile</Link>

                      <Link to="/"
                        className="group flex items-center px-4 py-2 text-sm text-gray-700 duration-300
                        hover:bg-indigo-500 hover:text-white"
                        onClick={ () => setDialog(true) }
                      >
                        <span className="material-symbols-outlined mr-1"> logout </span>
                        Logout</Link>
                    </div>
                  </div>
                )}
              </div>
            ): (
              <Link to='/login' className="font-inter font-medium bg-green-700 text-white
                px-4 py-2 rounded-md"
              >
                  Login
              </Link>
            )}

            </div>

          </header>
          <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
           <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/create-post' element={<CreatePost/>} />
             <Route path='/login' element={ <Login /> } />
             <Route path='/signup' element={ <Signup />} />
             <Route path='/profile' element={ <Profile />  } />
       
           </Routes>
          </main>
       </BrowserRouter>
  )
}

export default App