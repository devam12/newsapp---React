import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export default class News extends Component {

    static defaultProps = {
        coutry : "in",
        pageSize : 10,
        category : "science"
    }

    static propTypes= {
        coutry : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }


    constructor() {
        super();
        this.state = {
            artical: [],
            loading: true,
            page: 1
        }
    }

    async componentDidMount() {
        await this.updateNews()
    }

    prevButtonclick = async () => {
        let change = async () => {
            this.setState({
                page: this.state.page - 1,
            })
        };
        await change();
        await this.updateNews();
    }

    async updateNews(){
        this.setState({
            loading: true,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bd23193e90147e79dbe8100a61a386a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({
            artical: jsonData.articles,
            totalResults : jsonData.totalResults,
            loading: false,
        })
    } 

    nextButtonclick = async () => {

        let change = async () => {
            this.setState({
                page: this.state.page + 1,
            })
        };
        await change();
        await this.updateNews();
    }

    render() {
        return (
            <div className='container'>
                <h1 className='my-3 text-center'>News Live Portal</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.artical.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 30) : ""} des={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} url={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.prevButtonclick}>Prev</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextButtonclick}>Next</button>
                </div>
            </div>
        )
    }
}
