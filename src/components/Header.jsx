import { Filters } from "./Filters";

export function Header() {

   return (
      <header>
         <div className="container">
            <h1>React shop 🛒</h1>
            <Filters />
         </div>
      </header>
   )
}
