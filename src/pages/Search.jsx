import { JobSearchForm } from '../components/JobSearchForm.jsx'
import { SearchResults } from '../components/SearchResults.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { useFilters } from '../hooks/useFilters.jsx'

export function SearchPage() {

  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    isFiltered,
    handleClearFilters,
    filters,
    setFilters,
    textToFilter
  } = useFilters()

  const title = document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main className="find-job">
      <title>{title}</title>

        <section className="jobs-header">

            <h1>Encuentra tu próximo trabajo</h1>

            <p>Explora miles de oportunidades en el sector técnologico.</p>
            
            <JobSearchForm
              onSearch={handleSearch}
              onTextFilter={handleTextFilter}
              isFiltered={isFiltered}
              handleClearFilters={handleClearFilters}
              filters={filters}
              setFilters={setFilters}
              textToFilter={textToFilter}
            />
        </section>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
        <SearchResults 
          jobs={jobs}
        />

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
    </main>
  )
}
