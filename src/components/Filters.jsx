import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';
import './Filter.css';

export function Filters() {
   const { setFilters, filters } = useFilters();

   const minPriceFilterId = useId();
   const categoryFilterId = useId();

   const handleChangeMinPrice = (e) => {
      setFilters(prevState => ({
         ...prevState,
         minPrice: e.target.value
      }))
   }

   const handleChangeCategory = (e) => {
      setFilters(prevState => ({
         ...prevState,
         category: e.target.value
      }))
   }

   return (
      <section className="filters">
         <div>
            <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
            <input
               type="range"
               id={minPriceFilterId}
               min={0}
               max={1000}
               onChange={handleChangeMinPrice}
               value={filters.minPrice}
            />
            <span>${filters.minPrice}</span>
         </div>
         <div>
            <label htmlFor={categoryFilterId}>Categoría</label>
            <select name="category" id={categoryFilterId} onChange={handleChangeCategory}>
               <option value="all">Todos</option>
               <option value="smartphones">Smartphones</option>
               <option value="fragrances">Fragrances</option>
               <option value="skincare">Skincare</option>
               <option value="home-decoration">Home decoration</option>
            </select>
         </div>
      </section>
   )
}
