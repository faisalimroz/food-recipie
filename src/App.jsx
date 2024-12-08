
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import AllRecipes from "./Components/Recipe/AllRecipes";
import SuccessStories from "./Components/SuccessStories/SuccessStories";
import PurchaseCoin from "./pages/PurchaseCoin/PurchaseCoin";



function App() {
  return (
    <div className="main">
     <Header/>
     <SuccessStories/>
     <AllRecipes/>
     <PurchaseCoin/>
     <Footer/>
    </div>
  );
}

export default App;
