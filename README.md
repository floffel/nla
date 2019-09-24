# NJS LDAP AUTH (short: nla)

Motivation: Parts of NGiNX Servies require authentification. E-Mail Proxying for example.
I couln't find any way of authentification against ldap whithout using another daemon, so I wrote one myselfe.

What it is: This script provides an http_auth service to serve this: 
http://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html
It's a tiny loadbalancer, too.

Requirements: There are four requrements. Two of them are obviouse:
NGiNX and LDAP (Servers), the other two are the following NGiNX 
modules (both available in the freebsd NGiNX port ;) ):
* http_javascript
* auth_ldap_module: https://github.com/kvspb/nginx-auth-ldap

How to use it:
1. Configure your NGiNX to use the above modules and configure them, too.
2. Load the njs file and change to option according to your needs.
You can add as many servers with as many auth-methods as you wish (remember to allow them in the mail.conf, too),
they'll get chosen randomly (it's a poor mans load balancer).
3. Apply the three location config snippets, as provided in the Webserver Sample-Config.
4. You can now authentificate users through auth_http (http://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html), 
pointing to your /auth/ location.
