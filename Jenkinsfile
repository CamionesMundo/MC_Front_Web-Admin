pipeline {
    agent any 
    stages {

        stage('Compilando') {
            steps {
                   checkout scm
            }
        }
        stage('Environment') {
            steps {
                sh 'git --version'
                sh 'docker -v'
                sh 'printenv'
            }
        }
        stage('Build Docker'){
            steps {
                sh 'docker build -t mc-front-web-admin .'
            }
        }
        stage('Deploy Docker'){
            steps {
                sh 'echo $(cat env-development.txt) > .env'
                sh 'docker rm -f mc-front-web-admin'
                sh 'docker run -d --restart always --name mc-front-web-admin -p 4000:4000 mc-front-web-admin'
            }
        }
    }
}
