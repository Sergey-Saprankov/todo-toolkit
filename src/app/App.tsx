import React, { useEffect } from "react";
import "../styles/index.scss";
import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";
import { meTC } from "../BLL/reducers/AuthReducerSlice";
import Loader from "../common/components/Loader/Loader";
import { Header } from "./pages/Header/Header";
import { Pages } from "./pages/Pages";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.appData.isInitialized);
  const status = useAppSelector((state) => state.appData.status);

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
      {status === "loading" && <Loader />}
    </div>
  );
}

export default App;
