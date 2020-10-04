FROM gitpod/workspace-full
                    
USER gitpod
RUN curl https://cli-assets.heroku.com/install.sh | sh
RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sudo sh