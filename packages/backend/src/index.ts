import "./lib/env"

import app from "./app"

const PORT = process.env.PORT || 8000;



app.listen(process.env.PORT, () => {
        console.log(`Server running at ${PORT} port`);
})