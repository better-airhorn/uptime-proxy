# Uptime Proxy

This is a simple webserver that connects to tcp ports and responds with either "200" or "503", depending if the connection was successful or not.

I use this for uptime monitoring, so I can expose this service instead of Postgres and Redis.