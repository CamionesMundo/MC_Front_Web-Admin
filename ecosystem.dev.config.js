module.exports = {
apps: [
    {
      name: 'server-front-dev',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      args: 'start',
      env_development: {
        NAME : "server-front-dev",
        NODE_ENV: "development"
      }
    }
  ]
}