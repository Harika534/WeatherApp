import React, { useState, useEffect } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import WeatherCard from "./components/WeatherCard"
import SearchHistory from "./components/SearchHistory"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#0a1929",
      paper: "rgba(255, 255, 255, 0.05)",
    },
  },
})

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchHistory, setSearchHistory] = useState([])

  const API_KEY = "Your API Key"
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  const fetchWeather = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError("")
    setWeather(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )

      if (!response.ok) {
        throw new Error("City not found")
      }

      const data = await response.json()
      setWeather(data)
      updateSearchHistory(city)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const updateSearchHistory = (searchedCity) => {
    const updatedHistory = [searchedCity, ...searchHistory.filter((c) => c !== searchedCity)].slice(0, 5)
    setSearchHistory(updatedHistory)
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, backgroundColor: "background.paper" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Weather App
          </Typography>

          <form onSubmit={fetchWeather}>
            <Stack spacing={2} alignItems="center" direction={isMobile ? "column" : "row"}>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  fullWidth={isMobile}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                >
                  {loading ? "Searching" : "Search"}
                </Button>
              </Box>
            </Stack>
          </form>

          <Box mt={2}>
            <SearchHistory history={searchHistory} onSelect={setCity} />
          </Box>

          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {weather && <WeatherCard weather={weather} />}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App

