import { useEffect, useState } from 'react'

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const [showSearchRes, setShowSearchRes] = useState(false)
    const [isSearchLoaded, setIsSearchLoaded] = useState(false)
    const [searchRes, setSearchRes] = useState([])
    // let searchTimer = null

    const searchInput = e => {
        // if(searchTimer) {
        //   clearTimeout(searchTimer)
        //   searchTimer = null
        // }

        setKeyword(e.target.value)
    }

    const clearSearch = () => {
        setShowSearchRes(false)
    }

    useEffect(() => {
        setIsSearchLoaded(false)
        if(keyword.length){
            const url = '/api/search/' + keyword
            fetch(url)
                .then(res => res.json())
                .then(res => {
                setSearchRes(res)
                setShowSearchRes(true)
                setIsSearchLoaded(true)
            })
        //   searchTimer = setTimeout(() => {
        //     const url = '/api/search/' + keyword
        //     fetch(url)
        //       .then(res => res.json())
        //       .then(res => {
        //         setSearchRes(res)
        //         setShowSearchRes(true)
        //       })
        //   }, 200)
        }else setShowSearchRes(false)

        // return () => {if(searchTimer) clearTimeout(searchTimer)}
    }, [keyword])

    return (
        <div className='search-container'>
        <input
          type='text'
          onChange={searchInput}
          onBlur={clearSearch}
          onFocus={() => {if(searchRes.length) setShowSearchRes(true)}}
          value={keyword}
          style={{width: '300px'}}
        />
        {
          showSearchRes &&
          <ul className='search-result'>
            {
            !!searchRes.length ?
              searchRes.map(res => <li className='result-item' key={res.symbol}>{`${res.symbol} - ${res.name}`}</li>) :
              <li>no search result</li>
            }
            { !isSearchLoaded && <li>Loading...</li> }
          </ul>
        }
      </div>
    )

}

export default Search
