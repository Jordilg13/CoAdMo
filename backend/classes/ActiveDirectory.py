from classes.BaseHost import BaseHost
import ldap
import sys
import os
import datetime

# GET computers from AD
# Get-ADComputer -Filter * -SearchBase "DC=projectejordi,DC=es" -Credential $credential -Properties *


class ActiveDirectory(BaseHost):
    def __init__(self):
        super().__init__(self,os.getenv("LDAP_IP"))
        self.conn = self.setup()
        self.base = os.getenv("DOMAIN")
        self.scope = ldap.SCOPE_SUBTREE
        self.PASSWORD_EXPIRATION_DATE = datetime.timedelta(days=45)

    def setup(self):
        # GETTING VARIABLES
        server = os.getenv("LDAP_HOST")
        DN = os.getenv("LDAP_BIND_DN")
        password = os.getenv("LDAP_PASSWORD")

        # SETTING UP THE CONNECTION
        l = ldap.initialize(server)
        l.protocol_version = 3
        l.set_option(ldap.OPT_REFERRALS, 0)
        l.simple_bind_s(DN, password)

        return l

    ##### MONITORING #####
    # def get_users_by_filter(self, parameter):
    #     command = "Search-ADAccount -{0} -Credential $credential | select samaccountname | ft -HideTableHeaders".format(parameter)

    #     return self.ps.execute(command)

    def execute_query(self, ldap_filter, attrs):
        """
        Executes a query against the ldap server with the input parameters.
        INPUT:
        - ldap_filter: the query string -> "(&(objectClass=user))"
        - attrs: the attributes that will return the query -> ["sammaccountname"]
        """
        l_filter = ldap_filter
        attrs = attrs
        r = self.conn.search(self.base, self.scope, l_filter, attrs)
        typee, users = self.conn.result(r, 60)
        return users

    

    ##### INTERACTION #####
