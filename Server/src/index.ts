import express, { Application, Request, Response, NextFunction } from 'express';
import { GetRandomOutcome, GetWinType } from './generators/generators-controller';
import path from 'path';
import cors from 'cors';


// Boot express
const app: Application = express();
const port = 5000;
app.use(cors());
// Application routing
app.use('/', (req: Request, res: Response, next: NextFunction ) => {
    console.log(" objects ");
    console.log(req.method);
    console.log(req.path);
    console.log(req.params);

    if(req.method == "GET") {
        console.log("AQUIII");
        if(req.path == "/outcome/random") {
            console.log("AQUIII1");
            const Response = GetRandomOutcome();
            console.log("Response", Response);
            res.status(200).json(Response);
            return;
        }

        if(req.path == "/outcome/wintype") {
            const Response = GetWinType(<string>req.query["coincidences"]);
            console.log(Response);
            res.status(200).json({winType: Response});
            return;
        }

        if(req.path == "/") {
            console.log("Path is ", __dirname);
            res.sendFile(path.join(__dirname, '/views/index.html'));

            return;
        }
    }
});


app.get("/outcome/random", (req, res) => {
    const Response = GetRandomOutcome();
    res.json({a: 1});
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));



