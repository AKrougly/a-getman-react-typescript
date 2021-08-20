import React from 'react';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { loadState } from './api/apiLocalStorage';

export type IVisibilityFilter = "SHOW_ALL"|"SHOW_COMPLETED"|"SHOW_ACTIVE";
export type IHttpMethod = "GET"|"POST"|"JSON";
export type TSendStatus = "SEND_STARTED"|"SEND_SUCCESS"|"SEND_FAILURE"|"NOT_SENDED";

export interface IItem {
  uid: string,
  name: string,
  url: string,
  httpMethod: IHttpMethod,
  time: string,
  response: string,
  error:  string,
  sended: TSendStatus,
  completed: boolean,
  deleted: boolean,
}

export interface IPalette {
  primary: string,
  secondary: string,
  type: string,
}

export const initPalette: IPalette = {
  primary: "teal",
  secondary: "teal",
  type: "light",
};

export interface IAppState {
  items: IItem[],
  palette: IPalette,
  visibilityFilter: IVisibilityFilter,
  showProgressBar: boolean,
  showDeleted: boolean,
  filter: boolean,
  children?: React.ReactNode,
}

export const initialItem: IItem = {
  uid: "",
  name: "",
  url: "",
  httpMethod: "GET",
  time: Date(),
  response: "",
  error:  "",
  sended: "NOT_SENDED",
  completed: false,
  deleted: false,
};

export const initialAppState: IAppState = {
  items: [],
  palette: initPalette,
  visibilityFilter: "SHOW_ALL",
  showProgressBar: true,
  showDeleted: true,
  filter: false,
};

export enum enumActions {
  INIT_STATE = "INIT_STATE",
  LOAD_STATE = "LOAD_STATE",
  LOAD_STATE_FAILURE = "LOAD_STATE_FAILURE",
  IMPORT_ITEMS_STARTED = "IMPORT_ITEMS_STARTED",
  IMPORT_ITEMS_SUCCESS = "IMPORT_ITEMS_SUCCESS",
  IMPORT_ITEMS_FAILURE = "IMPORT_ITEMS_FAILURE",
  EXPORT_ITEMS_SUCCESS = "EXPORT_ITEMS_SUCCESS",
  ADD_ITEM = "ADD_ITEM",
  CHANGE_ITEM = "CHANGE_ITEM",
  CHANGE_PALETTE = "CHANGE_PALETTE",
  SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER",
  TOGGLE_SHOW_PROGRESS_BAR = "TOGGLE_SHOW_PROGRESS_BAR",
  TOGGLE_SHOW_DELETED = "TOGGLE_SHOW_DELETED",
  TOGGLE_FILTER = "TOGGLE_FILTER",
}

export const SendStatus = {
  SEND_STARTED: "SEND_STARTED",
  SEND_SUCCESS: "SEND_SUCCESS",
  SEND_FAILURE: "SEND_FAILURE",
  NOT_SENDED: "NOT_SENDED",
}

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  JSON: "JSON",
}

export type AppActions = ActionType<typeof actions>|ActionType<typeof loadState>;
