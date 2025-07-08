pipeline{
    agent any
    environment {
        SONAR_HOME = tool 'Sonar'
    }

    stages {
        stage('Clone code from Github') {
            steps {
                git url: "https://github.com/Divyam2701/Job-Seeking-Website-.git",
                    branch: "master"
                
            }
        }
        stage('Sonarqube quality analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Jenkins') {
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar.projectKey=Job-Seeking-Website-"
                }   
            }
        }
        stage('OWASP dependency check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP' 
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('Sonar quality gate scan') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        stage('Trivy container scan') {
            steps {
                sh "trivy fs --format table -o trivy-fs-report.html ."

            }    
        }
        stage('Deploy with using the docker-compose file') {
            steps {
                sh "docker-compose up -d"
            }    
        }
    }
}