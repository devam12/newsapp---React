import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let { title, des,imageUrl,url } = this.props;
        return (
            <div>
                <div className="card my-2" >
                    <img className="card-img-top" src={imageUrl} alt="News photos"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{des}...</p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}
