import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articals, setArticals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);



    const updateNews = async () => {
        props.setProgress(0);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(40);
        let jsonData = await data.json();
        props.setProgress(70);
        setArticals(jsonData.articles);
        setTotalResults(jsonData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let jsonData = await data.json();
        setArticals(articals.concat(jsonData.articles));
        setPage(page + 1);
        setTotalResults(jsonData.totalResults);
        setLoading(false);
    }

    return (
        <>
            <h1 className='text-center' style={{marginTop: "65px", marginBottom:"10px"}}>News LivePortal</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articals.length}
                next={fetchMoreData}
                hasMore={articals.length !== totalResults}
                loader={loading && <Spinner />}>
                <div className="container">
                    <div className="row">
                        {articals.map((element,index) => {
                            return <div className="col-md-3" key={index}>
                                <Newsitem title={element.title ? element.title.slice(0, 30) : ""} des={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} url={element.url} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News;


News.defaultProps = {
    coutry: "in",
    pageSize: 10,
    category: "science"
}

News.propTypes = {
    coutry: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

// let change = async () => {
//     setPage(page + 1);
// setLoading(true);
// };
// await change();

  // async componentDidMount() {
    //     await this.updateNews()
    // }

      // constructor() {
    //     super();
    //     // this.state = {
    //     //     artical: [],
    //     //     loading: true,
    //     //     page: 1,
    //     //     totalResults: 0,
    //     // }
    // }

     // const prevButtonclick = async () => {
    //     let change = async () => {
    //        setPage(page-1);
    //     };
    //     await change();
    //     updateNews();
    // }

     // const nextButtonclick = async () => {
    //     let change = async () => {
    //         setPage(page + 1);
    //     };
    //     await change();
    //     updateNews();
    // }