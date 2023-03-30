import React, {useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticals] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalized = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticals(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    };

    useEffect(() => {
        // document.title =`NewsFantasy - ${capitalized(props.catagory)}`;
        updateNews(); 
    }, [])

    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticals(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setPage(page + 1)
    };

    return (
        <>
            <h1 className='text-center' style={{ marginTop: '40px' }}> Top {capitalized(props.category)} HeadLines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row ">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
