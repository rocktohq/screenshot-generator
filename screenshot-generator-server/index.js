const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//* Default route
app.get("/", (req, res) => {
  res.send("Screenshot Generator Server");
});

//* Screenshot route
app.get("/screenshot", async (req, res) => {
  const url = req.query.url;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1248,
    height: 1024,
  });

  await page.goto(url);
  //   await setTimeout(() => {}, 1000);
  const buffer = await page.screenshot();
  const b64 = Buffer.from(buffer).toString("base64");
  const mimeType = "image/png";

  res.send(`"data:${mimeType};base64,${b64}"`);
  await browser.close();
});

//* Server configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
