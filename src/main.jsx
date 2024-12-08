import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import RecipeDetail from "./Components/Recipe/recipeDetails.jsx";
import GoogleLogin from "./pages/GoogleLogin/GoogleLogin.jsx";
import AllRecipes from "./Components/Recipe/AllRecipes.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import PurchaseCoin from "./pages/PurchaseCoin/PurchaseCoin.jsx";
import DashboardLayout from "./Components/Dashboard/DashboardLayout.jsx";
import DashboardPage from "./../src/pages/DashboardPage/DashboardPage.jsx";
import Recipe from "./../src/pages/DashboardPage/Recipe.jsx";

import CreateRecipe from "./../src/pages/DashboardPage/CreateRecipe.jsx";
import User from "./../src/pages/DashboardPage/user.jsx";
import UpdateRecipe from "./pages/DashboardPage/UpdateRecipe.jsx";
import Profile from "./pages/DashboardPage/Profile.jsx";

// import AddRecipe from "./Components/Dashboard/AddRecipe.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
 
  {
    path: "/dashboard/profile",
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
     
    ),
  },
  {
    path: "/dashboard/user",
    element: (
      <DashboardLayout>
        <User />
      </DashboardLayout>
     
    ),
  },
  {
    path: "/dashboard",
    element: (
    
      <DashboardLayout>
        <DashboardPage/>
        </DashboardLayout>
      
    ),
  },
  {
    path: "/dashboard/recipe",
    element: (
    
      <DashboardLayout>
        <Recipe/>
        </DashboardLayout>
      
    ),
  },
  {
    path: "/dashboard/create-recipe",
    element: (
      <DashboardLayout>
        <CreateRecipe />
      </DashboardLayout>
     
    ),
  },
  {
    path: "/dashboard/recipe/:id",
    element: (
      <DashboardLayout>
        <UpdateRecipe />
      </DashboardLayout>
     
    ),
  },
  {
    path: "/purchase-coin",
    element: <PurchaseCoin />,
  },

  {
    path: "/recipes",
    element: <AllRecipes />,
  },
  {
    path: "/login",
    element: <GoogleLogin />,
  },
 
  {
    path: "/recipe/:id",
    element: (
      <PrivateRoute>
        <RecipeDetail />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
