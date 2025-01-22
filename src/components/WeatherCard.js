import React from "react"
import { Card, CardContent, Typography, Grid, Box, useTheme, useMediaQuery } from "@mui/material"
import { WbSunny, Cloud, Opacity, Air } from "@mui/icons-material"
import { Stack } from "@mui/material"


const WeatherCard = ({ weather }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return <WbSunny fontSize="large" />
      default:
        return <Cloud fontSize="large" />
    }
  }

  return (
    <Card sx={{ mt: 4, backgroundColor: "background.paper" }}>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">
              {weather.name}, {weather.sys.country}
            </Typography>
            {getWeatherIcon(weather.weather[0].icon)}
          </Stack>

          <Typography variant="body2">{weather.weather[0].description}</Typography>

          <Typography variant="h3" sx={{ my: 2 }}>
            {Math.round(weather.main.temp)}°C
          </Typography>

          <Stack spacing={2} direction={isMobile ? "column" : "row"}>
            <Box display="flex" alignItems="center">
              <Opacity sx={{ mr: 1 }} />
              <div>
                <Typography variant="body2">Humidity</Typography>
                <Typography variant="body1">{weather.main.humidity}%</Typography>
              </div>
            </Box>
            <Box display="flex" alignItems="center">
              <Air sx={{ mr: 1 }} />
              <div>
                <Typography variant="body2">Wind Speed</Typography>
                <Typography variant="body1">{weather.wind.speed} m/s</Typography>
              </div>
            </Box>
            <Box display="flex" alignItems="center">
              <WbSunny sx={{ mr: 1 }} />
              <div>
                <Typography variant="body2">Feels Like</Typography>
                <Typography variant="body1">{Math.round(weather.main.feels_like)}°C</Typography>
              </div>
            </Box>
            <Box display="flex" alignItems="center">
              <Cloud sx={{ mr: 1 }} />
              <div>
                <Typography variant="body2">Cloudiness</Typography>
                <Typography variant="body1">{weather.clouds.all}%</Typography>
              </div>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}


export default WeatherCard