import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState();
  const [editForm, setEditForm] = useState(false);
  const [editFormInput, setEditFormInput] = useState();

  useEffect(() => {
    var token = localStorage.getItem("token");
    axios
      .get("https://todo1998.herokuapp.com/dashboard", {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        setTodoList(result.data.todos);
        setIsLoaded(true);
      })
      .catch((err) => {
        history.push("/login");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const response = await axios.post(
      "https://todo1998.herokuapp.com/add-todo",
      {
        title: todoTitle,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    var newTodo = response.data.result;
    setTodoList((preTodoList) => [newTodo, ...preTodoList]);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    await axios.post(
      "https://todo1998.herokuapp.com/update-todo",
      editFormInput,
      {
        headers: {
          authorization: token,
        },
      }
    );
    var updatedList = todoList.map((item) => {
      if (item._id == editFormInput._id) {
        return { ...item, title: editFormInput.title };
      }
      return item;
    });
    setTodoList(updatedList);
    setEditForm(false);
  };

  const handleSubmitDelete = async (id) => {
    var token = localStorage.getItem("token");
    await axios.delete("https://todo1998.herokuapp.com/delete-todo/" + id, {
      headers: {
        authorization: token,
      },
    });
    var newTodoList = todoList.filter((item) => item._id != id);
    setTodoList(newTodoList);
  };

  const handleEdit = async (todo) => {
    setEditForm(true);
    setEditFormInput(todo);
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>Add todo : </label>
        <input
          type="text"
          placeholder="Enter todo title"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <div>
          <button type="submit">Add todo</button>
        </div>
      </form>
      <br />
      {editForm ? (
        <form onSubmit={handleSubmitUpdate}>
          <label>Update todo : </label>
          <input
            type="text"
            placeholder="Enter todo title"
            onChange={(e) =>
              setEditFormInput({ ...editFormInput, title: e.target.value })
            }
            value={editFormInput.title}
          />
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      ) : null}

      <h3>Todos List :</h3>
      <ul>
        {todoList.map((item) => {
          return (
            <li key={item._id}>
              {item.title}{" "}
              <button onClick={(e) => handleEdit(item)}>Edit</button>{" "}
              <button onClick={(e) => handleSubmitDelete(item._id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
