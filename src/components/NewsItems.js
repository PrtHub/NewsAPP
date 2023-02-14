import React from 'react'

const NewsItems = (props) => {
  let { title, description, imgUrl, newsUrl, date, source } = props;
        return (
            <div className='container' style={{ marginTop: '35px'}} >
                <div className="card" style={{ width: '20rem' }}>
                    <div>
                        <span className="d-flex justify-content-flex-end position-absolute right-0 badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imgUrl ? "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : imgUrl} className="card-img-top" alt="..." />
                    <div className={`card-body`} >
                        <h5 className={`card-title `}>{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Last updated {new Date(date).getHours()} ago</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }


export default NewsItems
