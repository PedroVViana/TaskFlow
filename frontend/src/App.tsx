import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';
import { TaskForm } from './views/TaskForm';
import { TaskList } from './views/TaskList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            TaskFlow
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas tarefas de forma simples e eficiente
          </Typography>
        </Box>
        <Box mb={4}>
          <TaskForm />
        </Box>
        <TaskList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
