import app from "./app";
import "dotenv/config";

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Application started at http://localhost:${process.env.PORT || 3000} `
  );
});
