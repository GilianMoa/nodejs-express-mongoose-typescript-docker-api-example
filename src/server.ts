import app from './app/app'


/**
 * Server listen
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(
        `  App is running at http://localhost:${port} in %s mode`,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});