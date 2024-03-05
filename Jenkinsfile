pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }

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
    // agent {
    //     docker {
    //         image 'node:10.20.1-alpine3.11'
    //         args '-v $HOME/.m2:/root/.m2'
    //     }
    // }

    // stage('checkout') {
    //     steps {
    //         git 'https://github.com/chenxianfeng0520/code'
    //     }
    // }

}