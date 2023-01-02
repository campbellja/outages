import { createServer, Model } from "miragejs";
import { OutageTypes } from "./model/Outage";

const initDate = new Date(2022, 11, 1);
const buildOutage = i => {
  const id = crypto.randomUUID();
  const startDate = new Date(initDate);
  startDate.setHours(startDate.getHours() + i);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);
  return {
    //id: i,
    type: OutageTypes.Incident,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};
const buildMockOutages = () => Array.from(Array(50).keys()).map(i => {
  return buildOutage(i);
});

class IntegerIDManager {
  constructor() {
    this.ids = new Set();
    // const id = crypto.randomUUID();
    // this.nextId = id;
  }

  // Returns a new unused unique identifier.
  fetch() {
    let id = crypto.randomUUID();
    this.ids.add(id);

    return id;
  }

  // Registers an identifier as used. Must throw if identifier is already used.
  set(id) {
    if (this.ids.has(id)) {
      throw new Error('ID ' + id + 'has already been used.');
    }

    this.ids.add(id);
  }

  // Resets all used identifiers to unused.
  reset() {
    this.ids.clear();
  }
}


const createMockServer = function () {
  let server = createServer({
    identityManagers: {
      application: IntegerIDManager,
    },

    models: {
      outages: Model,
    },
    seeds(server) {
      buildMockOutages().forEach(o => {
        server.create("outage", o);
      });
    },

    routes() {
      this.namespace = "api/outages";

      this.get("/", (schema, request) => {
        return schema.outages.all();
      });

      //  this.post("/new", (schema, request) => {
      //    let attrs = JSON.parse(request.requestBody);
      //    attrs.completed = false;

      //    return schema.todos.create(attrs);
      //  });

      this.patch("/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let outage = schema.outages.find(id);
        if (outage) {
          console.info('mock server is updating outage', outage);
          return outage.update(newAttrs);
        }
        console.error(`mock server can\'t find outage id ${id}`);
        return {  };
      });

      //  this.delete("/:id", (schema, request) => {
      //    let id = request.params.id;
      //    return schema.todos.find(id).destroy();
      //  });
    },
  });

  return server;
};

export default createMockServer;