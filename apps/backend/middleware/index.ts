import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application


export const adminAuth = (req: Request, res: Response, next: NextFunction)=>{
    var authHeader = req.headers.authorization;
    if(authHeader){
      var t = authHeader.split(' ')[1];
      jwt.verify(t, SECRET, function(err, decodedPayload){
        if(err){
          return res.status(403).json({message:'Cannot verify token'});
        }
        if(!decodedPayload){
          return res.sendStatus(403);
        }
        if(typeof decodedPayload == 'string'){
          return res.sendStatus(403);
        }
        if(decodedPayload.role == 'admin'){
          req.headers['username'] = decodedPayload.username;
          next();
        }
        else{
          return res.status(403).json({message:'Forbidden'});
        }
      });
    }
    else{
      res.status(403).json({message:'Unauthorized'});
    }
  }

export const userAuth = (req: Request, res: Response, next: NextFunction)=>{
    
    if(req.headers.authorization){
      var token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, SECRET, function(err, decodedPayload){
        if(err){
          return res.status(403).json({message:'Cannot verify token'});
        }
        if(!decodedPayload){
          return res.sendStatus(403);
        }
        if(typeof decodedPayload == 'string'){
          return res.sendStatus(403);
        }
        if(decodedPayload.role == 'user'){
          req.headers['username'] = decodedPayload.username;
          next();
        }
        else{
          return res.status(403).json({message:'Forbidden'});
        }
      });
    }
    else{
      res.status(403).json({message:'Unauthorized'});
    }
  
  }