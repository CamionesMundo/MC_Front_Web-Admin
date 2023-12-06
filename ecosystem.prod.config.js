module.exports = {
apps: [
    {
      name: 'server-front-prod',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      args: 'run start:prod',
      env_production: {
        NAME : "server-front-prod",
        NODE_ENV: "production"
      }
    }
  ]
}