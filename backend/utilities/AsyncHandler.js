import { error } from "console";

const async_handler = (requesthandler) =>{
    return  (req, res, next) =>{
        Promise.resolve(requesthandler(req, res, next)).catch((error) => next(error));
    }
}

export {async_handler};