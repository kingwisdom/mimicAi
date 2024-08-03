import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ChatList = () => {
    // const ChatList = ({ data }) => {

    const isPending = false;
    const error = false;
    const data = [];
    // const { isPending, error, data } = useQuerty({
    //     queryKey: ["userChats"],
    //     queryFn: () =>
    //         fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
    //             credentials: "include",
    //         }).then((res) => res.json()),
    // });

    return (
        <div className="">
            <span className="title">DASHBOARD</span> <br />
            <Link to="/dashboard">Create a new Chat</Link> <br />
            <Link to="/">Explore Mimic AI</Link><br />
            <Link to="/">Contact</Link>
            <hr />
            <span className="title">RECENT CHATS</span>
            <div className="list">
                {/* {isPending
                ? "Loading..."
                : error
                    ? "Something went wrong!"
                    : data?.map((chat) => (
                        <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                            {chat.title}
                        </Link>
                    ))} */}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span>Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    )


};

export default ChatList;