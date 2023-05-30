import express from "express";

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export interface IUserRequest extends express.Request {
  user?: string;
}

export interface ICategory {
  name: String;
  icon: {
    id: String;
    name: String;
    code: String;
  };
  color: {
    id: String;
    name: String;
    code: String;
  };
  isEditable?: boolean;
}
