import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import NewPrompt from '../components/NewPrompt';

const ChatPage = () => {
    // const endRef = useRef(null);
    // useEffect(() => {
    //     endRef.current.scrollIntoView({ behavior: "smooth" })
    // }, [])

    return (
        <>
            <div className="page-content p-b50">
                <div className="container">
                    <div className="title-bar">
                        <h6 className="title"></h6>
                    </div>
                    {/* <ul className="message-list">
                        <li>
                            <div className="media-content">
                                <div className="right-content card card-body bg-secondary">
                                    <h6 className="name text-white">User</h6>
                                    <p className="text-white">e iusto temporibus!</p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="media-content">
                                <div className='card card-body bg-outline-secondary'>
                                    <h6 className="name">AI</h6>
                                    <p className="last-msg" style={{ textAlign: 'justify', lineHeight: 1.7 }}>Lorem ipsum</p>
                                </div>
                            </div>
                        </li>

                    </ul> */}
                </div>
                {/* <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, width: '80%', margin: '0 auto', height: 'auto' }}> */}

            </div>
            <NewPrompt />
        </>
    )
}

export default ChatPage