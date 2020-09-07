import React from 'react';
// import styles from '../../Styles/searchResults.module.css'
import SearchResults from './SearchComponent'

const SearchBar = (props) => {
    return props.products.map((e,index) => <SearchResults product={e} key={index} />)

}

export default SearchBar;

