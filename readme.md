#########################
# SERVER SET UP 
#########################
# set up ec2 instance, use t2.medium
# expose port 8080, 8081, 4200, HTTP

# install jenkins
 > sudo apt-get update
 > sudo apt install default-jdk -y
 > sudo apt install maven -y
 > curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
 > echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
 > sudo apt-get update
 > sudo apt-get install jenkins -y
 
 
# install docker 
 > sudo apt-get update
 > sudo apt-get install ca-certificates curl gnupg lsb-release
 > curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
 > echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 > sudo apt-get update
 > sudo apt-get install docker-ce docker-ce-cli containerd.io -y

# install docker-compose 
> sudo apt-get update
> sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
> sudo chmod +x /usr/local/bin/docker-compose
> sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# verify docker install 
 > sudo docker -v

# verify docker-compose 
> docker-compose --version

# give jenkins user permissions and restart the jenkins server. 
 > sudo usermod -a -G docker jenkins
 > sudo service jenkins restart

# verify jenkins install
 > sudo service jenkins status

# if status is active get password...
# go to website with port : 8080 -> example: http://54.147.239.252:8080/
# get password for jenkins
 > sudo cat /var/lib/jenkins/secrets/initialAdminPassword
# set up jenkins. create pipeline and push code to jenkins
# for backend pipeline, use git repo: https://github.com/samparsons/pg6-backend.git

# UPDATE AngularJS with correct IP address from ec2 box.
# CHECK rest service spring.datasource.url is PROD datasource and not DEV.

# create pipeline
# Go to Build Triggers > Poll SCM, enter '* * * * *'
# Go to Pipeline, choose 'Pipeline script from SCM'
# In SCM dropdown choose 'Git'
# In Repositories > Repository URL put the github url:  https://github.com/samparsons/capstone.git
# In Branches to build > Branch Specifier (blank for 'any') change */master to */main
# hit apply, and save.





 NOTES:
# run the command to run ubuntu on the docker image so you can start doing commands to check and see how things are working. 
> docker run -it <image name> bash 

#run an image name 
> docker run <image name> 

# show the ip address of the container 
> docker exec <image name> cat /etc/hosts 

# get logs from a docker container 
> docker logs [OPTIONS] CONTAINER