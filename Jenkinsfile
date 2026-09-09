pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "farmflo-ci-${BUILD_NUMBER}"
        JWT_SECRET = 'jenkins-ci-secret'
        BACKEND_PORT = '18000'
        FRONTEND_PORT = '15173'
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose build'
                    } else {
                        bat 'docker compose build'
                    }
                }
            }
        }

        stage('Start Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose up -d'
                    } else {
                        bat 'docker compose up -d'
                    }
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            for attempt in $(seq 1 30); do
                                if curl --fail --silent http://localhost:18000/api/health > /tmp/farmflo-health.json; then
                                    cat /tmp/farmflo-health.json
                                    break
                                fi

                                if [ "$attempt" -eq 30 ]; then
                                    docker compose logs
                                    exit 1
                                fi

                                sleep 2
                            done

                            curl --fail --silent http://localhost:15173 > /dev/null
                        '''
                    } else {
                        bat '''
                            @echo off
                            docker compose exec -T backend node -e "fetch('http://localhost:8000/api/health').then(async r => { console.log(await r.text()); process.exit(r.ok ? 0 : 1) }).catch(() => process.exit(1))"
                            if errorlevel 1 (
                                docker compose logs
                                exit /b 1
                            )
                            docker compose exec -T frontend node -e "fetch('http://localhost:5173').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'docker compose down -v --remove-orphans || true'
                } else {
                    bat 'docker compose down -v --remove-orphans'
                }
            }
        }
    }
}