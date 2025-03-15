import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, Box, InputAdornment, TextField, Button } from "@mui/material";
import { useState } from "react";

interface Props {
  addTodo: (newData: TodoData) => void;
}

const schema = z.object({
  todo: z.string({ message: "Input required" }).min(3, {
    message: "characters must be at least 3",
  }),
});

type TodoData = z.infer<typeof schema>;

const TodoForm = ({ addTodo }: Props) => {
  const [alert, setAlert] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addTodo(data), reset();
        setAlert({ show: true, message: "Todo added successfully!" });
        setTimeout(() => setAlert({ show: false, message: "" }), 3000);
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          id="todo"
          label="Enter todo"
          variant="outlined"
          fullWidth
          {...register("todo")}
          error={!!errors.todo}
          helperText={errors.todo?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
              </InputAdornment>
            ),
          }}
        />
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Add
          </Button>
        </motion.div>
      </Box>
      {alert.show && <Alert severity="success">Todo added successfully!</Alert>}
    </form>
  );
};

export default TodoForm;
