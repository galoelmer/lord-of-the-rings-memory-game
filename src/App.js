import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import background from "./assets/images/background.jpg";
const useStyles = makeStyles({
  root: {
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover",
    height: "100%",
    transition: "all 0.5s",
  },
});

function App() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const loaderElement = document.querySelector(".loader");
    const img = new Image();
    img.src = background;
    img.onload = function () {
      setLoaded(true);
      loaderElement.remove();
    };
  }, []);
  const classes = useStyles();
  return loaded && <div className={classes.root}></div>;
}

export default App;
