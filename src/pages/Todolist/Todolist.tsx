import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Todolist = () => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
  }, []);
  return <div>Todolist</div>;
};

export default Todolist;
