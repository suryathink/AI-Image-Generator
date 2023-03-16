import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import config from '../config'
import Dialog from '../Components/Dialog'
import { Card, Loader } from '../components';
import { logout } from '../redux/auth/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenderCards = ({ data, title, handler}) => {
    if(data?.length > 0) {
        return data.map((post)=> {
            return <Card key={post._id} {...post} normalCard={true} handler={ handler } />
        }) 
    }
 
    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}

const Profile = () => {
    let { name } = useSelector(data=> data);
    const [posts, setPosts] = useState([]);
    const [size, setSize] = useState(0);
    const [dialog, setDialog] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const post_id = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchPost();
    }, [reload]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token') || '';
            // console.log(token);
            let response = await axios.get(`${config.API_URL}/api/v1/post/profile-posts`,{
                headers: {
                    'authorization' : `Bearer ${token}`
                }
            })
            if(response.data.success){
                setPosts(response.data.data);
                setSize(response.data.data.length);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            alert(err);
            setLoading(false);
        }
    }

    const handleDelete = (id) => {
        setDialog(true);
        post_id.current = id;
    }

    const deleteImage = async () => {
        setDialog(false);
        if(post_id.current){
            try {
                const token = localStorage.getItem('token') || '';
                  let response = await axios.delete(`${config.API_URL}/api/v1/post/${post_id.current}`, {
                      headers: {
                          'authorization': `Bearer ${token}`
                      }
                  })
                  post_id.current = null;
                  setReload(!reload);
                  console.log(response);
              } catch (err) {
                    dispatch(logout());
                    
                    const notify = () => toast.error(err.response.data.message, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    notify();
              }
        }
    }

  return (
    <section className="max-w-7xl mx-auto mt-20">
        { 
            dialog && 
            <Dialog message="Do you want to delete?" handlerNo={ ()=> setDialog(false)} handlerYes={deleteImage} /> 
        }
        
        <div className="flex items-center max-sm:flex-col">
            <div className="w-40 h-40">
                <img className="w-full h-full rounded-full" src={posts[0]?.photo || "https://p.kindpng.com/picc/s/21-211456_user-icon-hd-png-download.png"} alt="profile pic"/>
            </div>
            <div className="mx-10">
                <h1 className="text-2xl max-sm:text-center mt-2">{ name[0]?.toUpperCase() + name.substring(1) }</h1>
                <p className="text-md mt-2 max-sm:text-center">{size} Posts</p>
            </div>
        </div>

        <div className="mt-14">
            <p className="flex items-center max-w-[100px] justify-center">
                <span className="material-symbols-outlined text-gray-500 mx-2"> grid_on </span>  Posts
            </p>
        </div>
        { loading && 
            <div className="flex justify-center align-center mt-10">
                <Loader />
            </div>}
        <div className="grid sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 mt-6">
            { <RenderCards data={ posts } title="No posts" handler={ handleDelete }/>}
        </div>
        
    </section>
  )
}

export default Profile
