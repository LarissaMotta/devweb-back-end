FROM gitpod/workspace-postgres
                    
USER gitpod
RUN curl https://cli-assets.heroku.com/install.sh | sh