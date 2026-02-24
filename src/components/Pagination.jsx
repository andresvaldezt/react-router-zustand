import styles from './Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }){

  //generar un array de paginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage ? {pointerEvents: 'none', opacity: 0.5} : {};
  const styleNextButton = isLastPage ? {pointerEvents: 'none', opacity: 0.5} : {};

  const handlePrevClick = (e) => {
    e.preventDefault();
    if(currentPage > 1){
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = (e) => {
    e.preventDefault();
    if(currentPage < totalPages){
      onPageChange(currentPage + 1)
    }
  }

  const handlePageChange = (e, page) => {
    e.preventDefault();
    if (page !== currentPage){
      onPageChange(page);
    }
  }

  const buildPageUrl = (page) =>{
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

    return(
        <section>
            <nav className={styles.pagination}>
                <a href={buildPageUrl(currentPage - 1)} style={stylePrevButton} onClick={handlePrevClick}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                </a>
                  {pages.map(page =>(
                    <a
                      key={page}
                      href={buildPageUrl(page)}
                      className={currentPage === page ? styles.isActive:''}
                      onClick={(e) => handlePageChange(e, page)}
                    >
                      {page}
                    </a>
                  ))}
                <a href={buildPageUrl(currentPage + 1)} style={styleNextButton} onClick={handleNextClick}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </a>
            </nav>
        </section>
    )
}