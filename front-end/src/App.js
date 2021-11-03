import Product from './components/Product';
import data from './data'

function App() {
  return (
    <>
      <div className="grid-container">
    <header className="row">
      <div>
        <a className="brand" href="/">Amazona</a>
      </div>
      <div>
        <a href="/cart" alt="">Cart</a>
        <a href="/signin" alt="">Sign In</a>
      </div>
    </header>
    <main>
      <div className="row center">
        {
          data.products.map(item => (
            <Product  key={item._id} item={item}/>
          ))
        }
      </div>
    </main>
    <footer className="row center">
        All rights reserved
    </footer>
  </div>
    </>
  );
}

export default App;
