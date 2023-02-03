import React, { useEffect } from "react";
import "../styles/index.scss";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { meTC } from "../BLL/reducers/AuthReducerSlice";
import { Header } from "../pages/Header/Header";
import Pages from "../pages/Page/Pages";
import Loader from "../components/Loader/Loader";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.appData.isInitialized);

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div className={`app dark`}>
      <Header />
      <Pages />
    </div>
  );
}

export default App;
