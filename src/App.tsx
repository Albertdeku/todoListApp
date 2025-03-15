import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./todo-list/components/TodoForm";
import TodoList from "./todo-list/components/TodoList";
import SectionButtons from "./SectionButtons";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface Todo {
  task: string;
  completed: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [completedTasks, setCompletedTasks] = useState<Todo[]>(() => {
    const savedCompletedTodos = localStorage.getItem("completedTasks");
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      return JSON.parse(savedDarkMode);
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  const [tabValue, setTabValue] = useState(0);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = (data: { todo: string }) => {
    setTodoList([...todoList, { task: data.todo, completed: false }]);
  };

  const completeTodo = (task: string) => {
    const updatedTodoList = todoList.filter((todo) => todo.task !== task);
    const completedTask = todoList.find((todo) => todo.task === task);
    if (completedTask) {
      setCompletedTasks([
        ...completedTasks,
        { ...completedTask, completed: true },
      ]);
    }
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (task: string) => {
    setTodoList(todoList.filter((todo) => todo.task !== task));
    setCompletedTasks(completedTasks.filter((todo) => todo.task !== task));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" className={darkMode ? "dark-mode" : ""}>
        <AppBar
          position="static"
          sx={{
            borderRadius: "10px",
            marginBottom: "1rem",
            boxShadow: "none", // Remove box shadow
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h3>
                <strong>Todo List</strong>
              </h3>
            </Typography>
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            borderRadius: "10px",
          }}
          className={darkMode ? "boxShadowDark" : "boxShadowLight"}
        >
          <TodoForm addTodo={addTodo} />
          <SectionButtons value={tabValue} onChange={setTabValue} />
          <TodoList
            todolist={tabValue === 0 ? todoList : completedTasks}
            onDelete={deleteTodo}
            onComplete={completeTodo}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
