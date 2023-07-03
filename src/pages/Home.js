import { ProductList } from "../features/Product-list/components/ProductList";
import NavBar from "./Navbar";

function Home() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
    </div>
  );
}

export default Home;
