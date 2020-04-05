FROM gitpod/workspace-full:latest


USER root

# Install MySQL
RUN apt-get update \
    && apt-get install -y mysql-server \
    && apt-get clean && rm -rf /var/cache/apt/* /var/lib/apt/lists/* /tmp/* \
    && mkdir /var/run/mysqld \
    && chown -R gitpod:gitpod /etc/mysql /var/run/mysqld /var/log/mysql /var/lib/mysql /var/lib/mysql-files /var/lib/mysql-keyring /var/lib/mysql-upgrade

# Install our own MySQL config
COPY mysql/mysql.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# Install default-login for MySQL clients
COPY mysql/client.cnf /etc/mysql/mysql.conf.d/client.cnf

COPY mysql/mysql-bashrc-launch.sh /etc/mysql/mysql-bashrc-launch.sh

USER gitpod

RUN echo "/etc/mysql/mysql-bashrc-launch.sh" >> ~/.bashrc

USER root

# Install Redis.
RUN \
    cd /tmp && \
    wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    make install && \
    cp -f src/redis-sentinel /usr/local/bin && \
    mkdir -p /etc/redis && \
    mkdir -p /home/gitpod/redis-data && \
    cp -f *.conf /etc/redis && \
    rm -rf /tmp/redis-stable* && \
    sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
    sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
    sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
    sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf

# Define mountable directories.
VOLUME ["/home/gitpod/redis-data"]

# Define working directory.
WORKDIR $HOME/redis-data

# Define default command.
CMD ["redis-server", "/etc/redis/redis.conf"]

# Expose ports.
EXPOSE 6379
# Expose ports.
EXPOSE 3306
# Expose ports.
EXPOSE 9229
# Expose ports.
EXPOSE 3000

USER gitpod

WORKDIR $HOME

