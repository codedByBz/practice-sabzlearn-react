import React, { useEffect } from 'react';

import './Pagination.css';
import { Link, useParams } from 'react-router-dom';

function Pagination({ array, setSlicedArray, count, pathname }) {

    const { page } = useParams();
    const totalPages = Math.ceil(array.length / count);

    useEffect(() => {
        const endIndex = count * +page;
        const startIndex = endIndex - count
        setSlicedArray(array.slice(startIndex, endIndex));
    }, [page, array])


    return (
        <div className="courses-pagination">
            <ul className="courses__pagination-list">
                {/* <li className="courses__pagination-item">
                    <a href="#" className="courses__pagination-link">
                        <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                    </a>
                </li> */}
                {
                    [...Array(totalPages)].map((count, index) => {
                        const pageNumber = index + 1;
                        return (
                            <li className="courses__pagination-item">
                                <Link to={`${pathname}/${pageNumber}`} className={`courses__pagination-link ${page == pageNumber ? "courses__pagination-link--active" : ""}`}>
                                    {pageNumber}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Pagination;