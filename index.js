import "dotenv/config";
import api from "./api.js";

const PORT = process.env.PORT || 3000;

api.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
