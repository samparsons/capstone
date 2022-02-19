pipeline {
    agent any 

    triggers {
        pollSCM('* * * * *')
    }
    stages {
        stage('Docker compose build') {
            steps {
                echo '----------------- This is a docker-compose phase ----------'
                sh 'docker-compose up -d --force-recreate --remove-orphans --build foodbox-app'
            }
        }
    }
}