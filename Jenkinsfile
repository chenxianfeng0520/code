pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "npm install;npm run build"
                sh "rm -rf target;mkdir target;cd target;tar -czf cxf_code.tar.gz ../dist/*"
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}