# WIP: NJS LDAP AUTH (short: nla)

Motivation: Parts of NGiNX Servies require authentification. E-Mail Proxying for example. I couln't find any way of 
authentification against ldap whithout using another daemon, so I wrote it myselfe.

Requirements: There are four requrements. Two of them are obviouse: NGiNX and LDAP (Servers), the other two are the following NGiNX 
modules (both available in the freebsd NGiNX port ;) ):
* http_javascript
* auth_ldap_module: https://github.com/kvspb/nginx-auth-ldap

How to use it:
Apply the three location configs, as provided in the Webserver Sample-Config. Load the njs file.
You can now authentificate users through auth_http (http://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html) pointing to your 
/auth/ location.

TODOs:
* implement arrays for the servers and make them get responded round-robin, so this can serve as a load balancer. 
