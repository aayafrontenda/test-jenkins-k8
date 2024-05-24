const api = window.location.host.includes("10.1.28.11")
  ? "http://localhost/api"
  : "http://manul-api.com/api";

const controllers = {
  datapoints: api + "/datapoints",
  users: api + "/users",
  devices: api + "/devices",
  flowmeters: api + "/devices/flowmeters",
};

export const Actions = {
  GetFlowmetersLatestDataPoints: controllers.flowmeters + "/latest-data-points",
  GetDataPoints: controllers.datapoints,
  Logout: controllers.users + "/logout",
  Login: controllers.users + "/login",
  GetFlowmeterHierarchy: controllers.flowmeters + "/hierarchy",
};
