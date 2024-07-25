import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: "Tell me a sweet bed time story?"
        },
        {
            id: 2,
            title: "Where is the biggest country by land size"
        },
        {
            id: 3,
            title: "How was chatGpt created?"
        },
        {
            id: 4,
            title: "Please can you write an article for me?"
        },
    ])
    return (
        <div className="page-content space-top p-b65">
            <div className="container pt-0" style={{ background: '#eee', display: 'flex', height: '80vh', flexDirection: 'column' }}>
                <div className="row g-2 my-auto">
                    {cards?.map((item, i) => (
                        <div className="col-6" key={i}>
                            <div className="card card-body" style={{ height: 70 }}>
                                <p className='text-center my-auto'>{item.title}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="bg-white input-group input-group-icon input-mini">
                    <div className="input-group-text">
                        <div className="input-icon">
                            {/* <i className="icon text-primary opacity-100 feather icon-pin" /> */}
                            <img src="https://cdn-icons-png.flaticon.com/512/385/385487.png" alt="" style={{ height: 20 }} />
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Please Search here..." />
                    <div className="input-group-text">
                        <div className="input-icon">
                            {/* <i className="icon text-primary opacity-100 feather icon-pin" /> */}
                            <img src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png" alt="" style={{ height: 20 }} />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard