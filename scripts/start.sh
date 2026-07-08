#!/bin/bash

cd /home/ec2-user/testing

pm2 start server.js --name testing

pm2 save
