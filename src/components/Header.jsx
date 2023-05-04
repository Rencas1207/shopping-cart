import { Filters } from "./Filters";

export function Header({ setFilters }) {
   return (
      <header>
         <div className="container">
            <h1>React shop 🛒</h1>
            <Filters setFilters={setFilters} />
         </div>
      </header>
   )
}
