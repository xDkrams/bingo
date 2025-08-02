"use client";

import { Paper, Typography, Box, Grid } from "@mui/material";

const headers = ["B", "I", "N", "G", "O"];

export default function bingoCard({ card, id }) {
  return (
    <Paper
      id={id}
      elevation={3}
      sx={{
        width: 250,
        p: 1,
        border: "2px solid #000",
        backgroundColor: "#fff",
      }}
    >
      <Typography align="center" variant="h5" fontWeight="bold" gutterBottom>
        BINGO
      </Typography>
      <Grid container spacing={0} columns={5}>
        {headers.map((col, i) => (
          <Grid item xs={1} key={col}>
            <Box
              sx={{
                border: "1px solid #000",
                p: 1,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {col}
            </Box>
          </Grid>
        ))}

        {Array.from({ length: 5 }).map((_, rowIdx) =>
          headers.map((col, colIdx) => (
            <Grid item xs={1} key={`${col}-${rowIdx}`}>
              <Box
                sx={{
                  border: "1px solid #000",
                  p: 1,
                  textAlign: "center",
                  height: 30,
                  backgroundColor:
                    card[col][rowIdx] === "FREE" ? "#f0f0f0" : "#fff",
                }}
              >
                {card[col][rowIdx]}
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
}
