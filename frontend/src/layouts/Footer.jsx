import React from 'react'

const Footer = () => {
    return (
        <div className="menubar-area style-4 footer-fixed">
            <div className="toolbar-inner menubar-nav">
                <a href="/dashboard" className="nav-link active">
                    <i className="flaticon flaticon1-house" />
                    <span>Board</span>
                </a>
                <a href="/chat/history" className="nav-link active">
                    <i className="flaticon flaticon1-history" />
                    <span>History</span>
                </a>
                <a href="#" className="nav-link active">
                    <i className="flaticon flaticon1-more" />
                    <span>More</span>
                </a>
                <a href="#" className="nav-link active">
                    <i className="flaticon flaticon1-avatar" />
                    <span>About</span>
                </a>
            </div>
        </div>
    )
}

export default Footer