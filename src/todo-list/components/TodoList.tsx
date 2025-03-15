import { BiCheckDouble } from "react-icons/bi";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid2, Tooltip, useTheme } from "@mui/material";
import { useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TodoList.css"; // Import the CSS file for animations

interface Todo {
  task: string;
  completed: boolean;
}

interface Props {
  todolist: Todo[];
  onDelete: (data: string) => void;
  onComplete: (data: string) => void;
}

const TodoList = ({ todolist, onDelete, onComplete }: Props) => {
  const [completed, setCompleted] = useState(false);
  const [deletingTask, setDeletingTask] = useState<string | null>(null);
  const theme = useTheme();
  const nodeRef = useRef(null);

  const handleCompleted = (task: string) => {
    setCompleted(!completed);
    onComplete(task);
    console.log(completed);
  };

  if (todolist.length === 0)
    return <p className="mt-5 h4 text-center">Empty Tasks</p>;

  return (
    <>
      <Box
        sx={{ flexGrow: 1, maxWidth: 752, padding: { xs: 2, sm: 3, md: 4 } }}
      >
        <Grid2 direction={"row"} spacing={2} minHeight={160} component={`div`}>
          <Typography
            className="text-start"
            sx={{ mt: 2, mb: 1 }}
            variant="h5"
            component="h5"
          >
            Tasks
          </Typography>
          <List sx={{ maxHeight: 400, overflowY: "auto" }}>
            <TransitionGroup>
              {todolist
                .slice()
                .reverse()
                .map((todo) => (
                  <CSSTransition
                    key={todolist.indexOf(todo)}
                    timeout={500}
                    classNames={deletingTask === todo.task ? "delete" : "fade"}
                    nodeRef={nodeRef}
                    onExited={() => setDeletingTask(null)}
                  >
                    <ListItem
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "grey.800"
                            : "grey.300",
                        borderRadius: 2,
                        mb: 1,
                      }}
                      secondaryAction={
                        <>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon
                              onClick={() => {
                                setDeletingTask(todo.task);
                                onDelete(todo.task);
                              }}
                            />
                          </IconButton>
                          <Tooltip title="Complete">
                            <IconButton className="ms-3">
                              <BiCheckDouble
                                size={20}
                                onClick={() => handleCompleted(todo.task)}
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      }
                    >
                      <ListItemText>{todo.task}</ListItemText>
                    </ListItem>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </List>
        </Grid2>
      </Box>
    </>
  );
};

export default TodoList;
