import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function popupChipsArray(props) {
  
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {props.recycling.map((recycling) => {
        return (
          <ListItem key={recycling}>
            {recycling === "Food waste" && (
              <Chip
                label={recycling}
                size="small"
                color="primary"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
            {recycling === "Residual waste" && (
              <Chip
                label={recycling}
                size="small"
                color="secondary"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
              
            )
            }
            {recycling === "Plastic packaging" && (
              <Chip
                label={recycling}
                size="small"
                color="error"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
            {(recycling === "Packaging carton" ||
              recycling === "Beverage carton") && (
              <Chip
                label={recycling}
                size="small"
                color="warning"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            )}
            {(recycling === "Glass packaging" ||
              recycling === "Metal packaging") && 
              <Chip
                label={recycling}
                size="small"
                color="success"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />
            }
            {(recycling !== "Food waste" &&
              recycling !== "Residual waste" &&
              recycling !== "Plastic packaging"&&
              recycling !== "Packaging carton" &&
              recycling !== "Beverage carton" &&
              recycling !== "Glass packaging" &&
              recycling !== "Metal packaging") && ( 
              <Chip
                label={recycling}
                size="small"
                color="info"
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
              />)
            }
          </ListItem>
        );
      })}
    </Card>
  );
}
