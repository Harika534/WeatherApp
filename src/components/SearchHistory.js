import React from "react"
import { Box, Chip, Typography } from "@mui/material"

const SearchHistory = ({ history, onSelect }) => {
  if (history.length === 0) return null

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Recent searches:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {history.map((city, index) => (
          <Chip
            key={index}
            label={city}
            onClick={() => onSelect(city)}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Box>
  )
}

export default SearchHistory
