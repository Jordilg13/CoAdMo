import sys, ldap, pprint

DN="CN=Administrador,CN=Users,DC=projectejordi,DC=es"
secret="xxxxx"
username="django"

server = "ldap://projectejordi.es"
port = 389

base = "dc=projectejordi,dc=es"
scope = ldap.SCOPE_SUBTREE
filterr = "(&(objectClass=user)(sAMAccountName="+username+"))"
attrs = ["*"]

l = ldap.initialize(server)
l.protocol_version = 3
l.set_option(ldap.OPT_REFERRALS, 0)

l.simple_bind_s(DN, secret)

r = l.search(base, scope, filterr, attrs)
type, user = l.result(r, 60)

name, attrs = user[0]
print(name)
pprint.pprint(attrs)
if hasattr(attrs, 'has_key') and attrs.has_key('displayName'):
    print (attrs)

sys.exit()