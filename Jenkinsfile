pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "farmflo-ci-${BUILD_NUMBER}"
        JWT_SECRET = 'jenkins-ci-secret'
    }

    stages {
        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    for attempt in $(seq 1 30); do
                        if curl --fail --silent http://localhost:8000/api/health > /tmp/farmflo-health.json; then
                            cat /tmp/farmflo-health.json
                            break
                        fi

                        if [ "$attempt" -eq 30 ]; then
                            docker compose logs
                            exit 1
                        fi

                        sleep 2
                    done

                    curl --fail --silent http://localhost:5173 > /dev/null
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose down -v --remove-orphans || true'
        }
    }
}