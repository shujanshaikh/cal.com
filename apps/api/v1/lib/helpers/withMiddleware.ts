import { label } from "next-api-middleware";

import { addRequestId } from "./addRequestid";
import { captureErrors } from "./captureErrors";
import { captureUserId } from "./captureUserId";
import { checkIsInMaintenanceMode } from "./checkIsInMaintenanceMode";
import { extendRequest } from "./extendRequest";
import {
  HTTP_DELETE,
  HTTP_GET,
  HTTP_GET_DELETE_PATCH,
  HTTP_GET_OR_POST,
  HTTP_PATCH,
  HTTP_POST,
} from "./httpMethods";
import { rateLimitApiKey } from "./rateLimitApiKey";
import { verifyApiKey } from "./verifyApiKey";
import { verifyCredentialSyncEnabled } from "./verifyCredentialSyncEnabled";
import { withPagination } from "./withPagination";

const middleware = {
  HTTP_GET_OR_POST,
  HTTP_GET_DELETE_PATCH,
  HTTP_GET,
  HTTP_PATCH,
  HTTP_POST,
  HTTP_DELETE,
  addRequestId,
  checkIsInMaintenanceMode,
  verifyApiKey,
  rateLimitApiKey,
  extendRequest,
  pagination: withPagination,
  captureErrors,
  captureUserId,
  verifyCredentialSyncEnabled,
};

type Middleware = keyof typeof middleware;

const middlewareOrder = [
  // The order here, determines the order of execution
  "checkIsInMaintenanceMode",
  "extendRequest",
  "captureErrors",
  "verifyApiKey",
  "rateLimitApiKey",
  "addRequestId",
  "captureUserId",
] as Middleware[]; // <-- Provide a list of middleware to call automatically

const withMiddleware = label(middleware, middlewareOrder);

export { middleware, middlewareOrder, withMiddleware };
