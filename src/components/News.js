import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';




export default class News extends Component {

    static defaultProps = {
        coutry: "in",
        pageSize: 10,
        category: "science"
    }

    static propTypes = {
        coutry: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super();
        this.state = {
            artical: [],
            loading: true,
            page: 1,
            totalResults: 0,
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

    async updateNews() {
        this.props.setProgress(0);
        this.setState({
            loading: true,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(url);
        let data = await fetch(url);
        this.props.setProgress(40);
        let jsonData = await data.json();
        this.props.setProgress(70);
        this.setState({
            artical: jsonData.articles,
            totalResults: jsonData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
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

    fetchMoreData = async () => {
        let change = async () => {
            this.setState({
                page: this.state.page + 1,
                loading: true,
            })
        };
        await change();
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bd23193e90147e79dbe8100a61a386a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({
            artical: this.state.artical.concat(jsonData.articles),
            totalResults: jsonData.totalResults,
            loading: false,
        })
    }

    render() {
        return (
            <>
                <h1 className='my-3 text-center'>News Live Portal</h1>
                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={this.state.artical.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.artical.length !== this.totalResults}
                    loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
>
                    <div className="container">
                        <div className="row">
                            {this.state.artical.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 30) : ""} des={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} url={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
