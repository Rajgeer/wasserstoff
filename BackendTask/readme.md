# NodeJs Server

  Running microservice on nodejs please flow the steps one by one
  (1) npm install in root directory and also npm install in services
  (2) npm start for both root project and services
  (3) nginx start

# 1 What is NGINX ? Why is it use in nodejs ?
  -- Nginx is a web server and reverse proxy server that is known for its high performance, stability, and low resource usage. It is often used to serve static files, load balance traffic, and reverse proxy Node.js applications.
  nginx.config  file
# There are several reasons why Nginx is often used with Node.js:
  # Performance:
    Nginx is designed to handle a large number of concurrent connections, making it ideal for high-traffic Node.js applications.
  # Stability:
    Nginx is known for its stability and reliability, making it a good choice for production environments.
  # Low resource usage:
    Nginx has a low memory footprint and CPU usage, making it ideal for resource-constrained environments.
  # Reverse proxy:
    Nginx can be used as a reverse proxy to forward requests to Node.js applications. 
    This can be useful for load balancing, SSL termination, and caching.
# Here are some specific benefits of using Nginx as a reverse proxy for a Node.js server:
  # ~ Improved performance:
    Nginx can handle a large number of concurrent connections, which can improve the performance of Node.js applications.
  # SSL termination:
    Nginx can terminate SSL connections, which can offload this task from Node.js and improve performance.
  # Load balancing:
    Nginx can be used to load balance traffic across multiple Node.js servers, which can improve scalability and reliability.
  # Caching:
    Nginx can cache static files, which can improve the performance of Node.js applications.
# Overall, Nginx is a powerful and versatile web server that can be used to improve the performance, stability, and scalability of Node.js applications.

worker_processes auto;
pid /var/run/nginx.pid;
events {
    worker_connections  1024;  # or any number appropriate for your setup
}
http {
      upstream backend_task {
          server localhost:4000;
          server 127.0.0.1:4000;
      }
      upstream user_service {
          server localhost:4001;
          server 127.0.0.1:4001;
      }

      upstream post_service {
          server localhost:4002;
          server 127.0.0.1:4002;
      }

      # upstream comment_service {
      #     server comment-service-instance-1:3000;
      #     server comment-service-instance-2:3000;
      # }

      server {
          listen 80;

          location /apis {
              proxy_pass http://backend_task;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
          }

          location /users {
              proxy_pass http://user_service;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
          }

          location /posts {
              proxy_pass http://post_service;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
          }

          

          # location /comments {
          #     proxy_pass http://comment_service;
          # }
      }
}
