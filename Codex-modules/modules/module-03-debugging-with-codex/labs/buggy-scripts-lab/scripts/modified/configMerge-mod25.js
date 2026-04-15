const defaults = {
  host: "api.example.com",
  retries: 3,
  timeout: 5000
};

const overrides = process.env.CONFIG_OVERRIDES ? JSON.parse(process.env.CONFIG_OVERRIDES) : {};

const consolidated = { ...defaults, ...overrides };
console.log("Merged configuration:", consolidated);
