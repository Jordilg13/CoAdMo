import sys
import ldap
import pprint
DN = "CN=Administrador,CN=Users,DC=projectejordi,DC=es"
secret = "xxxxxxx"
username = "bind"

server = "ldap://192.168.1.150"
port = 389

base = "dc=projectejordi,dc=es"
scope = ldap.SCOPE_SUBTREE

filterr = "(&(objectClass=computer))"
# filterr = "(&(objectClass=user)(UserAccountControl=514))"
attrs = ["cn"]

l = ldap.initialize(server)
l.protocol_version = 3
l.set_option(ldap.OPT_REFERRALS, 0)

l.simple_bind_s(DN, secret)

r = l.search(base, scope, filterr, attrs)
typee, user = l.result(r, 60)
pprint.pprint(user)
# for i in user:
#     try:
#         print(i[1]['displayName'])
#     except:
#         pass
# name, attrs = user[0]
# pprint.pprint(attrs)
# if hasattr(attrs, 'has_key') and attrs.has_key('displayName'):
#     print (attrs)

sys.exit()
